const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
    return (
        <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
                onClick={() => onCategoryChange('all')}
                className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-sm
          ${activeCategory === 'all'
                        ? 'bg-red-600 text-white shadow-red-200'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'}
        `}
            >
                Todas 🍴
            </button>
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onCategoryChange(cat.id)}
                    className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-sm flex items-center gap-2
            ${activeCategory === cat.id
                            ? 'bg-red-600 text-white shadow-red-200'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'}
          `}
                >
                    {cat.name} {cat.icon}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
