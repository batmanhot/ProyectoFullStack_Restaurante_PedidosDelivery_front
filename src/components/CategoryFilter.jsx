const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="mb-8">
      <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide px-1">
        {/* Todas */}
        <button
          onClick={() => onCategoryChange('all')}
          className={`flex flex-col items-center gap-1.5 px-5 py-3 rounded-2xl font-bold transition-all duration-300 shrink-0 shadow-sm border ${
            activeCategory === 'all'
              ? 'bg-red-600 text-white border-red-600 shadow-red-200 shadow-md scale-105'
              : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-100 hover:border-gray-200'
          }`}
        >
          <span className="text-2xl leading-none">🍴</span>
          <span className="text-xs whitespace-nowrap">Todas</span>
        </button>

        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`flex flex-col items-center gap-1.5 px-5 py-3 rounded-2xl font-bold transition-all duration-300 shrink-0 shadow-sm border ${
              activeCategory === cat.id
                ? 'bg-red-600 text-white border-red-600 shadow-red-200 shadow-md scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-100 hover:border-gray-200'
            }`}
          >
            <span className="text-2xl leading-none">{cat.icon}</span>
            <span className="text-xs whitespace-nowrap">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
