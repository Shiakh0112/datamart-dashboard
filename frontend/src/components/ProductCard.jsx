import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { Star } from 'lucide-react';

const ProductCard = React.memo(({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="card p-6 animate-scale-in hover:shadow-2xl group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
          </div>
        </div>
        
        <button 
          onClick={() => navigate(`/product/${product.id}`)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          View Details
        </button>
      </div>
    </div>
  );
});

export default ProductCard;
