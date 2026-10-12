import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import CustomizeJersey from '../pages/CustomizeJersey.jsx';
import CategoryPage from '../pages/CategoryPage.jsx';
import SubcategoryPage from '../pages/SubcategoryPage.jsx';
import ProductDetailsPage from '../pages/ProductDetailsPage.jsx';
import CartPage from '../pages/CartPage.jsx';
import WishlistPage from '../pages/WishlistPage.jsx';
import CheckoutPage from '../pages/CheckoutPage.jsx';
import PaymentPage from '../pages/PaymentPage.jsx';
import OrderSuccessPage from '../pages/OrderSuccessPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';

import AdminLayout from '../components/admin/AdminLayout.jsx';
import AdminDashboard from '../pages/admin/AdminDashboard.jsx';
import AdminCategories from '../pages/admin/AdminCategories.jsx';
import AdminProducts from '../pages/admin/AdminProducts.jsx';
import AdminHomepage from '../pages/admin/AdminHomepage.jsx';
import AdminOrders from '../pages/admin/AdminOrders.jsx';
import AdminJerseyOrders from '../pages/admin/AdminJerseyOrders.jsx';
import AdminCustomers from '../pages/admin/AdminCustomers.jsx';
import AdminReviews from '../pages/admin/AdminReviews.jsx';
import AdminContact from '../pages/admin/AdminContact.jsx';
import AdminReports from '../pages/admin/AdminReports.jsx';
import AdminSettings from '../pages/admin/AdminSettings.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customize-jersey" element={<CustomizeJersey />} />
      <Route path="/category/:catSlug" element={<CategoryPage />} />
      <Route path="/category/:catSlug/:subSlug" element={<SubcategoryPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/order-success" element={<OrderSuccessPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="homepage" element={<AdminHomepage />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="jersey-orders" element={<AdminJerseyOrders />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="contact" element={<AdminContact />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}
