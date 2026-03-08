import { useState, useEffect } from 'react';
import { productApi } from '../api/productApi';

export const useProducts = ({ page, limit, search, category }) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await productApi.getProducts({ page, limit, search, category });
        setProducts(response.data);
        setPagination(response.pagination);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit, search, category]);

  return { products, pagination, loading, error };
};
