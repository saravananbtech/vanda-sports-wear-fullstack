import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  CATEGORY_LIST,
  PRODUCTS,
  OFFERS,
  INITIAL_ORDERS,
  INITIAL_JERSEY_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_REVIEWS,
  INITIAL_MESSAGES,
} from '../utils/data.js';
import { catalog } from '../services/api.js';

const AppContext = createContext(null);

// Adapts a backend Product record into the flatter shape components use
// (was, cat, sub, desc, imageUrl) so ProductCard/ProductDetailsPage don't
// need to know about the API's field names.
function normalizeProduct(p) {
  const primary = p.images?.find((im) => im.is_primary) || p.images?.[0];
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: Number(p.price),
    was: p.compare_at_price ? Number(p.compare_at_price) : null,
    tag: p.tag || null,
    sizes: p.sizes || [],
    rating: Number(p.rating) || 4.5,
    cat: p.category_name,
    sub: p.subcategory_name,
    desc: p.description,
    imageUrl: primary ? primary.image : null,
  };
}

export function AppProvider({ children }) {
  const [toast, setToast] = useState({ msg: '', show: false });
  const timerRef = useRef(null);

  const showToast = useCallback((msg) => {
    setToast({ msg, show: true });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2600);
  }, []);

  // --- Cart -----------------------------------------------------------
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback(
    (product, size) => {
      setCartItems((prev) => {
        const key = `${product.id}-${size || 'default'}`;
        const existing = prev.find((it) => it.key === key);
        if (existing) {
          return prev.map((it) => (it.key === key ? { ...it, qty: it.qty + 1 } : it));
        }
        return [...prev, { key, product, size: size || product.sizes?.[0] || 'M', qty: 1 }];
      });
      showToast('Added to cart');
    },
    [showToast]
  );

  const updateCartQty = useCallback((key, qty) => {
    setCartItems((prev) => prev.map((it) => (it.key === key ? { ...it, qty: Math.max(1, qty) } : it)));
  }, []);

  const removeFromCart = useCallback((key) => {
    setCartItems((prev) => prev.filter((it) => it.key !== key));
  }, []);

  // --- Wishlist ---------------------------------------------------------
  const [wishlistItems, setWishlistItems] = useState([]);

  const toggleWishlist = useCallback(
    (product) => {
      setWishlistItems((prev) => {
        const exists = prev.some((p) => p.id === product.id);
        if (exists) {
          showToast('Removed from wishlist');
          return prev.filter((p) => p.id !== product.id);
        }
        showToast('Added to wishlist');
        return [...prev, product];
      });
    },
    [showToast]
  );

  const removeFromWishlist = useCallback((id) => {
    setWishlistItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const buyNow = useCallback(
    (product, size) => {
      addToCart(product, size);
      showToast('Added to cart — proceed to checkout');
    },
    [addToCart, showToast]
  );

  // --- Categories & Products: live from the backend, mock data as a
  // fallback so the storefront still renders if the API isn't running. ---
  const [categories, setCategories] = useState(CATEGORY_LIST);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesLive, setCategoriesLive] = useState(false);

  const [products, setProducts] = useState(PRODUCTS);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsLive, setProductsLive] = useState(false);

  const refetchCategories = useCallback(async () => {
    setCategoriesLoading(true);
    try {
      const data = await catalog.categories();
      const list = data.results || data;
      // An empty response (backend running but database not seeded yet) must
      // NOT wipe the built-in categories, or the whole storefront loses them.
      if (Array.isArray(list) && list.length > 0) {
        setCategories(list.map((c) => ({ ...c, subcats: (c.subcategories || []).map((s) => s.name) })));
        setCategoriesLive(true);
      } else {
        setCategoriesLive(false);
      }
    } catch {
      setCategoriesLive(false);
      // keep whatever was already loaded (mock data on first failure)
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  const refetchProducts = useCallback(async () => {
    setProductsLoading(true);
    try {
      const data = await catalog.products({ page_size: 100 });
      const list = data.results || data;
      if (Array.isArray(list) && list.length > 0) {
        setProducts(list.map(normalizeProduct).sort((a, b) => a.id - b.id));
        setProductsLive(true);
      } else {
        setProductsLive(false);
      }
    } catch {
      setProductsLive(false);
    } finally {
      setProductsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetchCategories();
    refetchProducts();
  }, [refetchCategories, refetchProducts]);

  // --- Admin-editable content still on mock data (not yet wired) --------
  const [offers, setOffers] = useState(OFFERS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [jerseyOrders, setJerseyOrders] = useState(INITIAL_JERSEY_ORDERS);
  const [customers] = useState(INITIAL_CUSTOMERS);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  return (
    <AppContext.Provider
      value={{
        toast,
        showToast,
        cartItems,
        addToCart,
        updateCartQty,
        removeFromCart,
        wishlistItems,
        toggleWishlist,
        removeFromWishlist,
        buyNow,
        cartCount: cartItems.reduce((s, it) => s + it.qty, 0),
        wishlistCount: wishlistItems.length,
        categories,
        categoriesLoading,
        categoriesLive,
        refetchCategories,
        products,
        productsLoading,
        productsLive,
        refetchProducts,
        offers,
        setOffers,
        orders,
        setOrders,
        jerseyOrders,
        setJerseyOrders,
        customers,
        reviews,
        setReviews,
        messages,
        setMessages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
