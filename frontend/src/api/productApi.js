import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/v1';

const retryRequest = async (fn, retries = 2) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && error.code === 'ECONNABORTED') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return retryRequest(fn, retries - 1);
    }
    throw error;
  }
};

const getErrorMessage = (error) => {
  if (error.code === 'ECONNABORTED') {
    return '⏱️ Request timed out. Your internet might be slow. Please try again.';
  }
  if (error.code === 'ERR_NETWORK') {
    return '🌐 Unable to connect. Please check your internet connection.';
  }
  if (!error.response) {
    return '❌ Network error. Please check if the server is running.';
  }
  
  const status = error.response?.status;
  if (status === 404) return '🔍 Item not found. It may have been removed.';
  if (status === 500) return '⚠️ Server error. Please try again in a moment.';
  if (status === 503) return '🔧 Server temporarily unavailable.';
  
  return '❌ Something went wrong. Please try again later.';
};

export const productApi = {
  getProducts: async ({ page = 1, limit = 20, search = '', category = '' }) => {
    try {
      const { data } = await retryRequest(() => 
        axios.get(`${API_BASE}/products`, {
          params: { page, limit, search, category },
          timeout: 10000
        })
      );
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  getProductById: async (id) => {
    try {
      const { data } = await retryRequest(() =>
        axios.get(`${API_BASE}/products/${id}`, {
          timeout: 10000
        })
      );
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
};
