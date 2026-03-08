import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productApi } from '../api/productApi';
import { formatPrice } from '../utils/formatPrice';
import Loader from '../components/Loader';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productApi.getProductById(id)
      .then(res => setProduct(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <div>Product not found</div>;

  return (
    <div style={styles.container}>
      <h1>{product.name}</h1>
      <p>Category: {product.category}</p>
      <p>Price: {formatPrice(product.price)}</p>
      <p>Rating: ⭐ {product.rating}</p>
      <p>{product.description}</p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '24px'
  }
};

export default ProductDetail;
