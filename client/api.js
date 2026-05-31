// Frontend API utility - Centralized API calls
const API_BASE_URL = 'http://localhost:3000/api';

class ApiService {
  // Generic fetch method with authentication
  static async request(endpoint, method = 'GET', body = null, isFormData = false) {
    const headers = {};
    
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      method,
      headers,
      ...(body && { body: isFormData ? body : JSON.stringify(body) })
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const data = await response.json();

      return {
        success: response.ok,
        status: response.status,
        data
      };
    } catch (error) {
      return {
        success: false,
        status: 0,
        error: error.message
      };
    }
  }

  // Auth endpoints
  static async register(name, email, password) {
    return this.request('/auth/register', 'POST', { name, email, password });
  }

  static async login(email, password) {
    return this.request('/auth/login', 'POST', { email, password });
  }

  static async getCurrentUser() {
    return this.request('/auth/me', 'GET');
  }

  // Order endpoints
  static async createOrder(orderData, imageFile = null) {
    const formData = new FormData();
    formData.append('cake_name', orderData.cake_name);
    formData.append('weight', orderData.weight);
    formData.append('message', orderData.message);
    formData.append('pickup_time', orderData.pickup_time);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.request('/orders', 'POST', formData, true);
  }

  static async getUserOrders() {
    return this.request('/orders', 'GET');
  }

  static async getOrderById(id) {
    return this.request(`/orders/${id}`, 'GET');
  }

  static async getAllOrders() {
    return this.request('/orders/admin/all', 'GET');
  }

  static async updateOrderStatus(id, status) {
    return this.request(`/orders/${id}/status`, 'PUT', { status });
  }

  // Inventory endpoints
  static async getIngredients() {
    return this.request('/inventory', 'GET');
  }

  static async addIngredient(ingredientData) {
    return this.request('/inventory', 'POST', ingredientData);
  }

  static async updateIngredient(id, quantity) {
    return this.request(`/inventory/${id}`, 'PUT', { quantity });
  }

  static async getLowStockItems() {
    return this.request('/inventory/low-stock', 'GET');
  }

  // Dashboard endpoints
  static async getDashboardStats() {
    return this.request('/dashboard/stats', 'GET');
  }

  static async getSalesAnalytics(period = 'daily') {
    return this.request(`/dashboard/analytics?period=${period}`, 'GET');
  }

  // Reward endpoints
  static async getUserRewards() {
    return this.request('/rewards', 'GET');
  }

  static async getAllRewards() {
    return this.request('/rewards/admin/all', 'GET');
  }

  static async getTopUsers(limit = 10) {
    return this.request(`/rewards/admin/top-users?limit=${limit}`, 'GET');
  }

  static async redeemPoints(points) {
    return this.request('/rewards/redeem', 'POST', { points });
  }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ApiService;
}