import React from 'react';

interface CategoryFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3 py-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
            activeCategory === category
              ? 'bg-[#0A1128] text-white shadow-lg'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilters;
