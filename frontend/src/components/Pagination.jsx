const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination) return null;

  const { page, totalPages } = pagination;

  return (
    <div className="flex items-center justify-center gap-4 bg-white rounded-2xl shadow-lg p-6">
      <button 
        onClick={() => onPageChange(page - 1)} 
        disabled={page === 1}
        className="px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:hover:bg-gray-100"
      >
        ← Previous
      </button>
      
      <div className="flex items-center gap-2">
        <span className="text-gray-600">Page</span>
        <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold">
          {page}
        </span>
        <span className="text-gray-600">of</span>
        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold">
          {totalPages}
        </span>
      </div>
      
      <button 
        onClick={() => onPageChange(page + 1)} 
        disabled={page === totalPages}
        className="px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
