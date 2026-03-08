import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import { ShoppingCart, Zap, BarChart3, Package } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState('');
  
  const debouncedSearch = useDebounce(searchInput, 500);
  
  const { products, pagination, loading, error } = useProducts({
    page,
    limit: 20,
    search: debouncedSearch,
    category
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-down">
          <div className="flex items-center justify-center gap-3 mb-3">
            <ShoppingCart className="w-12 h-12 text-blue-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DataMart Dashboard
            </h1>
          </div>
          <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
            Browse 10,000+ products with lightning-fast performance
            <Zap className="w-5 h-5 text-yellow-500" />
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Live Data
            </span>
            <span>•</span>
            <span>Real-time Search</span>
            <span>•</span>
            <span>Optimized Performance</span>
          </div>
        </div>
        
        {/* Filters */}
        <div className="mb-8 animate-slide-up">
          <div className="bg-white rounded-2xl shadow-lg p-6 backdrop-blur-sm bg-opacity-90">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <SearchBar value={searchInput} onChange={setSearchInput} />
              </div>
              <div className="md:w-64">
                <FilterPanel category={category} onChange={setCategory} />
              </div>
            </div>
            
            {/* Stats */}
            {pagination && (
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  Showing <span className="font-semibold text-blue-600">{products.length}</span> of <span className="font-semibold">{pagination.total}</span> products
                </span>
                <span className="hidden sm:block">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {loading && <Loader />}
          {error && <ErrorMessage message={error} />}
          
          {!loading && products.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-16 text-center animate-scale-in">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-400 animate-bounce" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
          
          {!loading && products.length > 0 && (
            <ProductList products={products} />
          )}
        </div>
        
        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-8 animate-slide-up">
            <Pagination pagination={pagination} onPageChange={setPage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
