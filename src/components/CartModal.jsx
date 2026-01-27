import { useState } from 'react';
import { BUSINESS_INFO } from '../data/products';

const CartModal = ({ isOpen, onClose, cart, onRemove, onUpdateQuantity, onClearCart, onShowToast }) => {
    const [step, setStep] = useState('cart'); // 'cart', 'payment', 'summary'
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        celular: '',
        pago: '', // 'efectivo' or 'tarjeta'
        referencia: '',
    });
    const [cardDetails, setCardDetails] = useState({
        number: '',
        expiry: '',
        cvv: ''
    });


    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (!isOpen) return null;

    const handleNextStep = () => {
        if (step === 'cart') {
            if (cart.length === 0) {
                alert("Su carrito está vacío!");
                return;
            }
            if (!formData.name || !formData.address || !formData.celular) {
                alert("Por favor, llene los campos obligatorios (Nombre, Celular y Dirección).");
                return;
            }
            setStep('payment');
        }
    };

    const handleBack = () => {
        if (step === 'payment') setStep('cart');
        if (step === 'summary') {
            onClearCart();
            onClose();
            setStep('cart');
        }
    };

    const handleConfirmPayment = () => {
        if (!formData.pago) {
            alert("Por favor, seleccione un método de pago.");
            return;
        }

        if (formData.pago === 'tarjeta') {
            if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
                alert("Por favor, complete los datos de su tarjeta.");
                return;
            }
        }

        setIsProcessing(true);

        // Simulating payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setStep('summary');
        }, 1500);
    };

    const handleSendWhatsApp = () => {
        let message = `*NUEVO PEDIDO CONFIRMADO*\n\n`;
        message += `*Cliente:* ${formData.name}\n`;
        message += `*Dirección:* ${formData.address}\n`;
        message += `*Referencia:* ${formData.referencia || 'N/A'}\n`;
        message += `*Celular:* ${formData.celular}\n`;
        message += `*Forma de Pago:* ${formData.pago === 'efectivo' ? 'Efectivo contraentrega' : 'Tarjeta de Crédito'}\n\n`;
        message += `*Detalle del Pedido:*\n`;

        cart.forEach(item => {
            message += `- ${item.quantity}x ${item.name} (S/. ${(item.price * item.quantity).toFixed(2)})\n`;
        });

        message += `\n*TOTAL A PAGAR: S/. ${total.toFixed(2)}*\n\n`;
        message += `_Gracias por su preferencia!_`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        onShowToast('¡Pedido enviado a WhatsApp!');
        onClearCart();
        onClose();
        setStep('cart');
    };


    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className={`bg-white rounded-3xl shadow-2xl w-full ${step === 'summary' ? 'max-w-md' : 'max-w-xl'} max-h-[90vh] flex flex-col overflow-hidden animate-zoom-in transition-all duration-300`}>
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        {step === 'cart' && (
                            <><svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>Su Carrito</>
                        )}
                        {step === 'payment' && (
                            <><button onClick={handleBack} className="mr-2 hover:bg-gray-100 p-1 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>Pago</>
                        )}
                        {step === 'summary' && (
                            <><svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Pedido Realizado</>
                        )}
                    </h3>
                    <button onClick={() => { onClose(); setStep('cart'); }} className="text-gray-400 hover:text-red-500 transition-colors p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow overflow-y-auto">
                    {step === 'cart' && (
                        <div className="space-y-4">
                            {cart.length === 0 ? (
                                <div className="text-center py-10">
                                    <p className="text-gray-400 text-lg">Su carrito está vacío.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-3">
                                        {cart.map(item => (
                                            <div key={item.id} className="flex justify-between items-center gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                                <div className="flex items-center gap-4">
                                                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl shadow-sm" />
                                                    <div>
                                                        <p className="font-bold text-gray-800 text-sm">{item.name}</p>
                                                        <p className="text-xs text-green-600 font-medium">S/. {item.price.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center bg-white border rounded-lg overflow-hidden">
                                                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-gray-100 text-gray-600">-</button>
                                                        <span className="px-2 font-bold text-gray-700 text-sm">{item.quantity}</span>
                                                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 hover:bg-gray-100 text-gray-600">+</button>
                                                    </div>
                                                    <button onClick={() => onRemove(item.id)} className="text-red-400 hover:bg-red-50 p-1.5 rounded-lg">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-4 space-y-3">
                                        <p className="text-sm font-bold text-gray-700">Datos de Entrega:</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            <input type="text" placeholder="Su nombre" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
                                            <input type="text" placeholder="WhatsApp" value={formData.celular} onChange={(e) => setFormData({ ...formData, celular: e.target.value })} className="w-full px-4 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
                                            <input type="text" placeholder="Dirección" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-2 text-sm col-span-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
                                            <input type="text" placeholder="Referencia" value={formData.referencia} onChange={(e) => setFormData({ ...formData, referencia: e.target.value })} className="w-full px-4 py-2 text-sm col-span-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {step === 'payment' && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <p className="text-gray-500">Total a pagar:</p>
                                <p className="text-4xl font-black text-gray-900">S/. {total.toFixed(2)}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setFormData({ ...formData, pago: 'efectivo' })}
                                    className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${formData.pago === 'efectivo' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-100 hover:border-gray-200'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <span className="font-bold">Efectivo</span>
                                    <span className="text-xs">Contraentrega</span>
                                </button>
                                <button
                                    onClick={() => setFormData({ ...formData, pago: 'tarjeta' })}
                                    className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${formData.pago === 'tarjeta' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-100 hover:border-gray-200'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                    <span className="font-bold">Tarjeta</span>
                                    <span className="text-xs">Crédito/Débito</span>
                                </button>
                            </div>

                            {formData.pago === 'tarjeta' && (
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3 animate-slide-up">
                                    <input type="text" placeholder="Número de Tarjeta" value={cardDetails.number} onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm" maxLength="16" />
                                    <div className="grid grid-cols-2 gap-3">
                                        <input type="text" placeholder="MM/YY" value={cardDetails.expiry} onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm" maxLength="5" />
                                        <input type="password" placeholder="CVV" value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm" maxLength="3" />
                                    </div>
                                    <p className="text-[10px] text-gray-400 text-center italic">Pagos procesados de forma segura vía Stripe Simulator.</p>
                                </div>
                            )}

                            {isProcessing && (
                                <div className="flex flex-col items-center py-4 gap-3">
                                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-blue-600 font-bold animate-pulse">Procesando pago...</p>
                                </div>
                            )}
                        </div>
                    )}

                    {step === 'summary' && (
                        <div className="space-y-6 text-center">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 scale-125 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                            </div>

                            <div>
                                <h4 className="text-xl font-black text-gray-800">¡Pedido Exitoso!</h4>
                                <p className="text-gray-500 text-sm">Tu pedido ha sido registrado correctamente.</p>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-4 text-left border-dashed border-2 border-gray-200 space-y-3">
                                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest border-b pb-2">
                                    <span>Resumen</span>
                                    <span>Ticket #2941</span>
                                </div>
                                <div className="space-y-1">
                                    {cart.map(item => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span className="text-gray-600 font-medium">{item.quantity}x {item.name}</span>
                                            <span className="font-bold text-gray-800">S/. {(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t pt-2 flex justify-between items-center">
                                    <span className="font-bold text-gray-800">Total</span>
                                    <span className="text-xl font-black text-green-600">S/. {total.toFixed(2)}</span>
                                </div>
                                <div className="pt-2 text-xs text-gray-500">
                                    <p><strong>Entrega:</strong> {formData.address}</p>
                                    <p><strong>Pago:</strong> {formData.pago === 'efectivo' ? 'Efectivo contraentrega' : 'Tarjeta de Crédito'}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t bg-gray-50">
                    {step === 'cart' && (
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold text-gray-600">Subtotal:</span>
                                <span className="text-2xl font-black text-gray-900">S/. {total.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={handleNextStep}
                                disabled={cart.length === 0}
                                className="w-full bg-red-600 text-white font-bold py-4 rounded-2xl hover:bg-red-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-100"
                            >
                                Continuar al Pago
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            </button>
                        </div>
                    )}

                    {step === 'payment' && (
                        <button
                            onClick={handleConfirmPayment}
                            disabled={!formData.pago || isProcessing}
                            className={`w-full font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 ${formData.pago === 'tarjeta' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'} disabled:opacity-50`}
                        >
                            {formData.pago === 'tarjeta' ? 'Pagar Ahora' : 'Confirmar Pedido'}
                        </button>
                    )}

                    {step === 'summary' && (
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleSendWhatsApp}
                                className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl hover:bg-green-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-green-100"
                            >
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.258.405 2.422 1.096 3.37l-1.127 4.12 4.221-1.107c.928.508 1.99.799 3.123.799 3.182 0 5.768-2.585 5.768-5.767 0-3.181-2.586-5.782-5.714-5.782zm3.393 8.24c-.15.422-.751.767-1.05.81-.255.03-.585.045-1.02-.09-.239-.074-.539-.18-.915-.345-1.396-.615-2.28-2.025-2.355-2.13-.074-.105-.623-.84-.623-1.605 0-.765.405-1.14.54-1.29.135-.15.3-.18.405-.18h.27c.09 0 .21.015.315.225.105.255.375.915.405.99.03.075.045.165.015.255-.03.09-.06.15-.12.225-.06.075-.12.165-.18.24-.06.06-.12.135-.045.24.075.105.345.57.735.915.51.45.945.585 1.08.66.135.075.21.06.285-.015.075-.075.33-.39.42-.525.09-.135.18-.105.3-.06.12.045.765.36.9.435.135.075.225.105.255.165.03.06.03.345-.12.765zM12 2C6.477 2 2 6.477 2 12c0 2.136.67 4.116 1.81 5.74L2 22l4.318-1.132C7.884 21.393 9.866 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" /></svg>
                                Finalizar vía WhatsApp
                            </button>
                            <button
                                onClick={handleBack}
                                className="w-full text-gray-500 font-bold py-2 hover:text-red-600 transition-colors text-sm"
                            >
                                Volver al Inicio
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
//             </div >
//         </div >
//     );
// };

export default CartModal;
