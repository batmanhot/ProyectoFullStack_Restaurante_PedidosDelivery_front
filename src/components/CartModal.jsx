import { BUSINESS_INFO } from '../data/products';

const CartModal = ({ isOpen, onClose, cart, onRemove, onUpdateQuantity, onClearCart, onShowToast }) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        celular: '',
        pago: '',
        referencia: '',
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Su carrito está vacio!");
            return;
        }

        if (!formData.name || !formData.address) {
            alert("Por favor, indique su nombre y dirección para continuar.");
            return;
        }

        let message = `Hola! quiero hacer este pedido, favor de traerlo a la brevedad:\n\n`;
        message += `*Cliente:* ${formData.name}\n`;
        message += `*Dirección:* ${formData.address}\n`;
        message += `*Referencia:* ${formData.referencia}\n`;
        message += `*Celular:* ${formData.celular}\n`;
        message += `*Forma de Pago:* ${formData.pago}\n\n`;
        message += `*Items del Pedido:*\n`;

        cart.forEach(item => {
            message += `- ${item.quantity}x ${item.name} (S/. ${item.price.toFixed(2)})\n`;
        });

        message += `\n*Total:* S/. ${total.toFixed(2)}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');

        onShowToast('¡Pedido enviado a WhatsApp!');
        onClearCart();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-zoom-in">
                <div className="flex justify-between items-center p-6 border-b">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Su Carrito
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 flex-grow overflow-y-auto space-y-4">
                    {cart.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-400 text-lg">Su carrito está vacío.</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex justify-between items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl shadow-sm" />
                                    <div>
                                        <p className="font-bold text-gray-800">{item.name}</p>
                                        <p className="text-sm text-green-600 font-medium">S/. {item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center bg-white border rounded-xl overflow-hidden shadow-sm">
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                            className="px-3 py-1 hover:bg-gray-100 text-gray-600 transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="px-3 font-bold text-gray-700 min-w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                            className="px-3 py-1 hover:bg-gray-100 text-gray-600 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button onClick={() => onRemove(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-6 border-t bg-gray-50 space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold text-gray-600">Total:</span>
                        <span className="text-3xl font-black text-gray-900">S/. {total.toFixed(2)}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input type="text" name="name" placeholder="Su nombre" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                        <input type="text" name="celular" placeholder="Su celular/WhatsApp" value={formData.celular} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                        <input type="text" name="address" placeholder="Dirección de entrega" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 md:col-span-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                        <input type="text" name="pago" placeholder="Método de pago (Yape/Plin/Efectivo)" value={formData.pago} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                        <input type="text" name="referencia" placeholder="Referencia de ubicación" value={formData.referencia} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={cart.length === 0}
                        className="w-full bg-green-600 text-white font-bold py-4 px-4 rounded-2xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-green-100 uppercase tracking-wide"
                    >
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.258.405 2.422 1.096 3.37l-1.127 4.12 4.221-1.107c.928.508 1.99.799 3.123.799 3.182 0 5.768-2.585 5.768-5.767 0-3.181-2.586-5.782-5.714-5.782zm3.393 8.24c-.15.422-.751.767-1.05.81-.255.03-.585.045-1.02-.09-.239-.074-.539-.18-.915-.345-1.396-.615-2.28-2.025-2.355-2.13-.074-.105-.623-.84-.623-1.605 0-.765.405-1.14.54-1.29.135-.15.3-.18.405-.18h.27c.09 0 .21.015.315.225.105.255.375.915.405.99.03.075.045.165.015.255-.03.09-.06.15-.12.225-.06.075-.12.165-.18.24-.06.06-.12.135-.045.24.075.105.345.57.735.915.51.45.945.585 1.08.66.135.075.21.06.285-.015.075-.075.33-.39.42-.525.09-.135.18-.105.3-.06.12.045.765.36.9.435.135.075.225.105.255.165.03.06.03.345-.12.765zM12 2C6.477 2 2 6.477 2 12c0 2.136.67 4.116 1.81 5.74L2 22l4.318-1.132C7.884 21.393 9.866 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                        </svg>
                        Finalizar Compra vía WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
};

import { useState } from 'react';
export default CartModal;
