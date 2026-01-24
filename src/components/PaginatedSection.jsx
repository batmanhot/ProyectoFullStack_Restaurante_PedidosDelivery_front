import { useState } from 'react';
import ProductCard from './ProductCard';

const ITEMS_PER_PAGE = 4; // Ajustamos a 4 para que la paginación sea más evidente

const PaginatedSection = ({ category, products, onAddToCart, onViewProduct }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    if (products.length === 0) return null;

    return (
        <section className="mb-16 last:mb-0 animate-zoom-in">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                <h3 className="text-3xl font-black text-gray-800 flex items-center gap-2">
                    <span className="text-4xl">{category.icon}</span> {category.name}
                </h3>
                <div className="flex-grow h-1 bg-gradient-to-r from-gray-200 to-transparent rounded-full hidden md:block"></div>

                {totalPages > 1 && (
                    <div className="flex items-center gap-2 self-end">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="p-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md disabled:opacity-30 transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <span className="text-sm font-bold text-gray-400 bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-sm">
                            {currentPage} / {totalPages}
                        </span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="p-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md disabled:opacity-30 transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {currentProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                        onViewProduct={onViewProduct}
                    />
                ))}
            </div>
        </section>
    );
};

export default PaginatedSection;
