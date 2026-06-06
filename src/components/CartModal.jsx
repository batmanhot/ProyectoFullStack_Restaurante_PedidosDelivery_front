import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/orderService';
import { productService } from '../services/productService';
import { formatMoney } from '../utils/format';

const UpsellSuggestions = ({ cart, onAdd }) => {
  const cartIds = new Set(cart.map(i => i.id));
  const candidates = productService.getProducts()
    .filter(p => p.available !== false && p.upsell === true && !cartIds.has(p.id))
    .slice(0, 4);

  if (candidates.length === 0) return null;

  return (
    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-2xl">
      <p className="text-xs font-black text-amber-700 mb-2">🍟 Completa tu pedido:</p>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {candidates.map(p => (
          <button
            key={p.id}
            onClick={() => onAdd(p)}
            className="shrink-0 flex items-center gap-2 bg-white border border-amber-200 hover:border-amber-400 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-amber-50 transition-all active:scale-95"
          >
            <span className="font-black text-amber-600">+</span>
            <span className="max-w-20 truncate">{p.name}</span>
            <span className="text-green-600 font-bold shrink-0">{formatMoney(p.price)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const CartModal = ({ isOpen, onClose, cart, onRemove, onUpdateQuantity, onClearCart, onShowToast }) => {
  const { user } = useAuth();
  const { config } = useApp();
  const { addToCart } = useCart();

  const [step, setStep] = useState('cart');
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    address: '',
    celular: '',
    pago: '',
    referencia: '',
  });
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCost = config.deliveryCost || 0;
  const grandTotal = total + deliveryCost;

  if (!isOpen) return null;

  const enabledPayments = config.paymentMethods || { efectivo: true, yape: true };

  const handleNextStep = () => {
    if (step === 'cart') {
      if (cart.length === 0) { onShowToast && onShowToast('Su carrito está vacío'); return; }
      if (!user) { setStep('login'); return; }
      if (!formData.name || !formData.address || !formData.celular) {
        onShowToast && onShowToast('Complete los campos obligatorios');
        return;
      }
      setStep('payment');
    }
  };

  const handleBack = () => {
    if (step === 'login') setStep('cart');
    if (step === 'payment') setStep('cart');
    if (step === 'summary') {
      onClearCart();
      onClose();
      setStep('cart');
      setCreatedOrder(null);
    }
  };

  const handleConfirmPayment = () => {
    if (!formData.pago) { onShowToast && onShowToast('Seleccione método de pago'); return; }
    if (formData.pago === 'tarjeta' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) {
      onShowToast && onShowToast('Complete los datos de tarjeta');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      const order = orderService.createOrder({
        userId: user?.id || 'guest',
        customerName: formData.name,
        phone: formData.celular,
        address: formData.address,
        reference: formData.referencia,
        paymentMethod: formData.pago,
        items: cart,
        subtotal: total,
        deliveryCost,
        total: grandTotal,
      });
      setCreatedOrder(order);
      setIsProcessing(false);
      setStep('summary');
    }, 1500);
  };

  const handleSendWhatsApp = () => {
    const order = createdOrder;
    let msg = `*NUEVO PEDIDO #${order?.orderNumber}*\n\n`;
    msg += `*Cliente:* ${formData.name}\n`;
    msg += `*Dirección:* ${formData.address}\n`;
    msg += `*Referencia:* ${formData.referencia || 'N/A'}\n`;
    msg += `*Celular:* ${formData.celular}\n`;
    msg += `*Pago:* ${formData.pago === 'efectivo' ? 'Efectivo contraentrega' : formData.pago === 'yape' ? 'Yape' : 'Tarjeta'}\n\n`;
    msg += `*Detalle:*\n`;
    cart.forEach(item => { msg += `- ${item.quantity}x ${item.name} (${formatMoney(item.price * item.quantity)})\n`; });
    msg += `\n*Subtotal:* ${formatMoney(total)}\n`;
    if (deliveryCost > 0) msg += `*Delivery:* ${formatMoney(deliveryCost)}\n`;
    msg += `*TOTAL: ${formatMoney(grandTotal)}*\n\n_¡Gracias por su preferencia!_`;

    window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    onShowToast && onShowToast('¡Pedido enviado a WhatsApp!');
    onClearCart();
    onClose();
    setStep('cart');
    setCreatedOrder(null);
  };

  const paymentLabel = { efectivo: 'Efectivo contraentrega', yape: 'Yape', tarjeta: 'Tarjeta de Crédito' };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className={`bg-white rounded-3xl shadow-2xl w-full ${step === 'summary' ? 'max-w-md' : 'max-w-xl'} max-h-[90vh] flex flex-col overflow-hidden animate-zoom-in`}>

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            {step === 'cart' && <><span>🛒</span> Su Carrito</>}
            {step === 'login' && <><button onClick={() => setStep('cart')} className="mr-1 hover:bg-gray-100 p-1 rounded-full">←</button> Identificación</>}
            {step === 'payment' && (
              <><button onClick={() => setStep('cart')} className="mr-1 hover:bg-gray-100 p-1 rounded-full">←</button> Pago</>
            )}
            {step === 'summary' && <><span className="text-green-600">✓</span> Pedido Realizado</>}
          </h3>
          <button onClick={() => { onClose(); setStep('cart'); }} className="text-gray-400 hover:text-red-500 transition-colors p-2 text-2xl">✕</button>
        </div>

        {/* Content */}
        <div className="p-6 grow overflow-y-auto">

          {/* STEP LOGIN GATE */}
          {step === 'login' && (
            <div className="flex flex-col items-center justify-center py-6 space-y-6 text-center">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-4xl">🔒</div>
              <div>
                <h4 className="text-xl font-black text-gray-800">Inicia sesión para continuar</h4>
                <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">
                  Necesitas una cuenta para realizar tu pedido. Tu carrito se guardará.
                </p>
              </div>

              <div className="w-full space-y-3 max-w-xs">
                <Link
                  to="/login"
                  onClick={onClose}
                  className="block w-full bg-red-600 text-white font-bold py-3.5 rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-100 text-center"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  onClick={onClose}
                  className="block w-full bg-white text-red-600 font-bold py-3.5 rounded-2xl border-2 border-red-200 hover:bg-red-50 transition-all text-center"
                >
                  Crear Cuenta Nueva
                </Link>
              </div>

              <p className="text-xs text-gray-400">
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" onClick={onClose} className="text-red-600 font-semibold hover:underline">
                  Ingresar aquí
                </Link>
              </p>
            </div>
          )}

          {/* STEP CART */}
          {step === 'cart' && (
            <div className="space-y-4">
              {/* Info delivery + cremas */}
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold px-3 py-2 rounded-xl">
                  <span>🛵</span>
                  <span>
                    Costo de delivery:{' '}
                    {deliveryCost > 0
                      ? <span className="text-orange-800">S/{deliveryCost.toFixed(2)}</span>
                      : <span className="text-green-700 font-black">¡Gratis!</span>}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-2 rounded-xl">
                  <span>🎁</span>
                  <span>Cremas de cortesía incluidas</span>
                </div>
              </div>

              {cart.length === 0 ? (
                <p className="text-center text-gray-400 py-10">Su carrito está vacío.</p>
              ) : (
                <>
                  <div className="space-y-3">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="flex items-center gap-4">
                          <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl shadow-sm" />
                          <div>
                            <p className="font-bold text-gray-800 text-sm">{item.name}</p>
                            <p className="text-xs text-green-600 font-medium">{formatMoney(item.price)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-white border rounded-lg overflow-hidden">
                            <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-gray-100 text-gray-600">−</button>
                            <span className="px-2 font-bold text-gray-700 text-sm">{item.quantity}</span>
                            <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 hover:bg-gray-100 text-gray-600">+</button>
                          </div>
                          <button onClick={() => onRemove(item.id)} className="text-red-400 hover:bg-red-50 p-1.5 rounded-lg">🗑️</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <UpsellSuggestions
                    cart={cart}
                    onAdd={(p) => {
                      const result = addToCart(p);
                      if (result?.ok === false) onShowToast && onShowToast(result.error, 'error');
                      else onShowToast && onShowToast(`¡${p.name} añadido!`);
                    }}
                  />

                  <div className="pt-4 space-y-3">
                    <p className="text-sm font-bold text-gray-700">Datos de Entrega:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="Su nombre *" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="px-4 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
                      <input type="text" placeholder="Celular *" value={formData.celular} onChange={e => setFormData({ ...formData, celular: e.target.value })} className="px-4 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
                      <input type="text" placeholder="Dirección *" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="px-4 py-2 text-sm col-span-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
                      <input type="text" placeholder="Referencia" value={formData.referencia} onChange={e => setFormData({ ...formData, referencia: e.target.value })} className="px-4 py-2 text-sm col-span-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* STEP PAYMENT */}
          {step === 'payment' && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-500">Total a pagar:</p>
                <p className="text-4xl font-black text-gray-900">{formatMoney(grandTotal)}</p>
                {deliveryCost > 0 && <p className="text-xs text-gray-400 mt-1">Incluye delivery {formatMoney(deliveryCost)}</p>}
              </div>

              <div className={`grid gap-4 ${Object.values(enabledPayments).filter(Boolean).length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                {enabledPayments.efectivo && (
                  <button onClick={() => setFormData({ ...formData, pago: 'efectivo' })} className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${formData.pago === 'efectivo' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-100 hover:border-gray-200'}`}>
                    <span className="text-3xl">💵</span>
                    <span className="font-bold text-sm">Efectivo</span>
                    <span className="text-xs">Contraentrega</span>
                  </button>
                )}
                {enabledPayments.yape && (
                  <button onClick={() => setFormData({ ...formData, pago: 'yape' })} className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${formData.pago === 'yape' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-100 hover:border-gray-200'}`}>
                    <span className="text-3xl">📱</span>
                    <span className="font-bold text-sm">Yape</span>
                    <span className="text-xs">{config.yapeNumber || ''}</span>
                  </button>
                )}
                {enabledPayments.tarjeta && (
                  <button onClick={() => setFormData({ ...formData, pago: 'tarjeta' })} className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${formData.pago === 'tarjeta' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-100 hover:border-gray-200'}`}>
                    <span className="text-3xl">💳</span>
                    <span className="font-bold text-sm">Tarjeta</span>
                    <span className="text-xs">Crédito/Débito</span>
                  </button>
                )}
              </div>

              {formData.pago === 'yape' && (
                <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 text-center space-y-3 animate-slide-up">
                  {config.yapeQr ? (
                    <img src={config.yapeQr} alt="QR Yape" className="w-40 h-40 object-contain mx-auto rounded-xl border bg-white" />
                  ) : (
                    <div className="w-40 h-40 mx-auto bg-purple-100 rounded-xl flex items-center justify-center text-purple-400">
                      <span className="text-5xl">📱</span>
                    </div>
                  )}
                  <p className="text-sm text-purple-700 font-semibold">Yapea al número: <strong>{config.yapeNumber}</strong></p>
                  <p className="text-xs text-purple-500">Monto: {formatMoney(grandTotal)} — Confirma el pago y envía tu pedido por WhatsApp</p>
                </div>
              )}

              {formData.pago === 'tarjeta' && (
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3 animate-slide-up">
                  <input type="text" placeholder="Número de Tarjeta" value={cardDetails.number} onChange={e => setCardDetails({ ...cardDetails, number: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm" maxLength="16" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="MM/YY" value={cardDetails.expiry} onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value })} className="px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm" maxLength="5" />
                    <input type="password" placeholder="CVV" value={cardDetails.cvv} onChange={e => setCardDetails({ ...cardDetails, cvv: e.target.value })} className="px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm" maxLength="3" />
                  </div>
                  <p className="text-[10px] text-gray-400 text-center italic">Simulador — integración real pendiente.</p>
                </div>
              )}

              {isProcessing && (
                <div className="flex flex-col items-center py-4 gap-3">
                  <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-blue-600 font-bold animate-pulse">Procesando pedido...</p>
                </div>
              )}
            </div>
          )}

          {/* STEP SUMMARY */}
          {step === 'summary' && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl">✓</div>
              <div>
                <h4 className="text-xl font-black text-gray-800">¡Pedido Registrado!</h4>
                <p className="text-gray-500 text-sm">Tu pedido ha sido confirmado correctamente.</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 text-left border-dashed border-2 border-gray-200 space-y-3">
                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest border-b pb-2">
                  <span>Resumen</span>
                  <span>Pedido #{createdOrder?.orderNumber}</span>
                </div>
                <div className="space-y-1">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 font-medium">{item.quantity}x {item.name}</span>
                      <span className="font-bold text-gray-800">{formatMoney(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-2 space-y-1">
                  {deliveryCost > 0 && (
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Delivery</span><span>{formatMoney(deliveryCost)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-800">Total</span>
                    <span className="text-xl font-black text-green-600">{formatMoney(grandTotal)}</span>
                  </div>
                </div>
                <div className="pt-2 text-xs text-gray-500 space-y-1">
                  <p><strong>Entrega:</strong> {formData.address}</p>
                  <p><strong>Pago:</strong> {paymentLabel[formData.pago]}</p>
                  <p className="flex items-center gap-1 text-green-600 font-semibold mt-1">
                    <span>🎁</span> Cremas de cortesía incluidas
                  </p>
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
                <span className="text-sm text-gray-500">
                  Subtotal{deliveryCost > 0 ? ` + delivery ${formatMoney(deliveryCost)}` : ''}:
                </span>
                <span className="text-2xl font-black text-gray-900">{formatMoney(grandTotal)}</span>
              </div>
              <button onClick={handleNextStep} disabled={cart.length === 0} className="w-full bg-red-600 text-white font-bold py-4 rounded-2xl hover:bg-red-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-100">
                Continuar al Pago →
              </button>
            </div>
          )}

          {step === 'payment' && (
            <button onClick={handleConfirmPayment} disabled={!formData.pago || isProcessing} className={`w-full font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 ${formData.pago === 'tarjeta' ? 'bg-blue-600 hover:bg-blue-700 text-white' : formData.pago === 'yape' ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
              {formData.pago === 'tarjeta' ? 'Pagar Ahora' : 'Confirmar Pedido'}
            </button>
          )}

          {step === 'summary' && (
            <div className="flex flex-col gap-3">
              <button onClick={handleSendWhatsApp} className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl hover:bg-green-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-green-100">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.258.405 2.422 1.096 3.37l-1.127 4.12 4.221-1.107c.928.508 1.99.799 3.123.799 3.182 0 5.768-2.585 5.768-5.767 0-3.181-2.586-5.782-5.714-5.782zm3.393 8.24c-.15.422-.751.767-1.05.81-.255.03-.585.045-1.02-.09-.239-.074-.539-.18-.915-.345-1.396-.615-2.28-2.025-2.355-2.13-.074-.105-.623-.84-.623-1.605 0-.765.405-1.14.54-1.29.135-.15.3-.18.405-.18h.27c.09 0 .21.015.315.225.105.255.375.915.405.99.03.075.045.165.015.255-.03.09-.06.15-.12.225-.06.075-.12.165-.18.24-.06.06-.12.135-.045.24.075.105.345.57.735.915.51.45.945.585 1.08.66.135.075.21.06.285-.015.075-.075.33-.39.42-.525.09-.135.18-.105.3-.06.12.045.765.36.9.435.135.075.225.105.255.165.03.06.03.345-.12.765zM12 2C6.477 2 2 6.477 2 12c0 2.136.67 4.116 1.81 5.74L2 22l4.318-1.132C7.884 21.393 9.866 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" /></svg>
                Finalizar vía WhatsApp
              </button>
              <button onClick={handleBack} className="w-full text-gray-500 font-bold py-2 hover:text-red-600 transition-colors text-sm">
                Volver al Inicio
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
