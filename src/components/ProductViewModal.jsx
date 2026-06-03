import { formatMoney } from '../utils/format';

const ProductViewModal = ({ product, isOpen, onClose, onAddToCart }) => {
    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-zoom-in">
                <div className="relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-80 object-cover"
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-3xl font-black text-gray-800">{product.name}</h2>
                        <span className="text-3xl font-black text-green-600">{formatMoney(product.price)}</span>
                    </div>

                    <p className="text-gray-500 text-lg leading-relaxed mb-8">
                        {product.description}
                    </p>

                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            className="flex-1 py-4 px-6 border-2 border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-all uppercase tracking-wider"
                        >
                            Cerrar
                        </button>
                        <button
                            onClick={() => {
                                onAddToCart(product);
                                onClose();
                            }}
                            className="flex-[2] py-4 px-6 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-200 flex items-center justify-center gap-3 uppercase tracking-wider"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Añadir al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductViewModal;
