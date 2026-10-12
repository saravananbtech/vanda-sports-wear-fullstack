const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

function getAccessToken() {
  return localStorage.getItem('vsw_access_token');
}

function setTokens({ access, refresh }) {
  if (access) localStorage.setItem('vsw_access_token', access);
  if (refresh) localStorage.setItem('vsw_refresh_token', refresh);
}

function clearTokens() {
  localStorage.removeItem('vsw_access_token');
  localStorage.removeItem('vsw_refresh_token');
}

async function request(path, { method = 'GET', body, auth = false, isForm = false } = {}) {
  const headers = {};
  if (!isForm) headers['Content-Type'] = 'application/json';
  if (auth) {
    const token = getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
  });

  if (!res.ok) {
    let detail;
    try {
      detail = await res.json();
    } catch {
      detail = { detail: res.statusText };
    }
    const err = new Error('API request failed');
    err.status = res.status;
    err.detail = detail;
    throw err;
  }

  if (res.status === 204) return null;
  return res.json();
}

// --- Auth --------------------------------------------------------------
export const auth = {
  async register(payload) {
    return request('/auth/register/', { method: 'POST', body: payload });
  },
  async login(username, password) {
    const data = await request('/auth/login/', { method: 'POST', body: { username, password } });
    setTokens(data);
    return data;
  },
  async me() {
    return request('/auth/me/', { auth: true });
  },
  logout() {
    clearTokens();
  },
  isLoggedIn() {
    return Boolean(getAccessToken());
  },
};

// --- Catalog -------------------------------------------------------------
export const catalog = {
  categories: () => request('/categories/'),
  category: (slug) => request(`/categories/${slug}/`),
  products: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/products/${qs ? `?${qs}` : ''}`);
  },
  product: (slug) => request(`/products/${slug}/`),
  packages: () => request('/packages/'),
  offers: () => request('/offers/'),
  banners: () => request('/banners/'),
};

// --- Orders / Team orders ------------------------------------------------
export const orders = {
  create: (payload) => request('/orders/', { method: 'POST', body: payload, auth: auth.isLoggedIn() }),
  mine: () => request('/orders/', { auth: true }),
};

export const teamOrders = {
  create: (payload) => request('/team-orders/', { method: 'POST', body: payload }),
};

// --- Reviews / Contact -----------------------------------------------------
export const reviews = {
  forProduct: (productId) => request(`/reviews/?product=${productId}`),
  create: (payload) => request('/reviews/', { method: 'POST', body: payload, auth: auth.isLoggedIn() }),
};

export const contact = {
  send: (payload) => request('/contact-messages/', { method: 'POST', body: payload }),
};

// --- Admin (requires staff JWT) --------------------------------------------
export const admin = {
  stats: () => request('/dashboard/stats/', { auth: true }),
  orders: () => request('/orders/', { auth: true }),
  teamOrders: () => request('/team-orders/', { auth: true }),
  contactMessages: () => request('/contact-messages/', { auth: true }),

  // Categories
  createCategory: (fields) => request('/categories/', { method: 'POST', body: toFormData(fields), auth: true, isForm: true }),
  updateCategory: (slug, fields) => request(`/categories/${slug}/`, { method: 'PATCH', body: toFormData(fields), auth: true, isForm: true }),
  deleteCategory: (slug) => request(`/categories/${slug}/`, { method: 'DELETE', auth: true }),

  // Subcategories
  createSubcategory: (fields) => request('/subcategories/', { method: 'POST', body: toFormData(fields), auth: true, isForm: true }),
  deleteSubcategory: (id) => request(`/subcategories/${id}/`, { method: 'DELETE', auth: true }),

  // Product images
  uploadProductImage: (productId, file) =>
    request('/product-images/', { method: 'POST', body: toFormData({ product: productId, image: file }), auth: true, isForm: true }),
  deleteProductImage: (id) => request(`/product-images/${id}/`, { method: 'DELETE', auth: true }),
};

function toFormData(fields) {
  const fd = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) fd.append(key, value);
  });
  return fd;
}

export default { auth, catalog, orders, teamOrders, reviews, contact, admin };
