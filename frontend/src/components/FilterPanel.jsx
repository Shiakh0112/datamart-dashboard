import { Tag, ChevronDown } from 'lucide-react';

const FilterPanel = ({ category, onChange }) => {
  const categories = ['Electronics', 'Clothing', 'Books', 'Home'];

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Tag className="w-5 h-5 text-gray-400" />
      </div>
      <select 
        value={category} 
        onChange={(e) => onChange(e.target.value)}
        className="input-field pl-12 appearance-none cursor-pointer shadow-sm"
      >
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
};

export default FilterPanel;
