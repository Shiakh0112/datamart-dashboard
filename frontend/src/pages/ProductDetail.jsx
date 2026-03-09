import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productApi } from '../api/productApi';
import { formatPrice } from '../utils/formatPrice';
import { ArrowLeft, Star, Tag, Package } from 'lucide-react';
import Loader from '../components/Loader';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productApi.getProductById(id)
      .then(res => setProduct(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h2 className="text-2xl font-semibold text-gray-800">Product not found</h2>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 animate-scale-in">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                <Tag className="w-4 h-4" />
                {product.category}
              </span>
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-2 rounded-lg">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-lg font-semibold text-gray-700">{product.rating}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {formatPrice(product.price)}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 active:scale-95">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
