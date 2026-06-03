import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatMoney } from '../utils/format';

const Footer = () => {
  const { config } = useApp();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">

      {/* CTA strip */}
      <div className="bg-red-600">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-black text-lg leading-tight">¿Listo para ordenar?</p>
            <p className="text-red-100 text-sm">Recibe tu pedido en {config.deliveryTime || '30-45 min'} 🛵</p>
          </div>
          <a
            href={`https://wa.me/${config.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-white text-red-600 font-black px-5 py-2.5 rounded-2xl hover:bg-red-50 transition-all shadow-lg shrink-0 text-sm"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.258.405 2.422 1.096 3.37l-1.127 4.12 4.221-1.107c.928.508 1.99.799 3.123.799 3.182 0 5.768-2.585 5.768-5.767 0-3.181-2.586-5.782-5.714-5.782zm3.393 8.24c-.15.422-.751.767-1.05.81-.255.03-.585.045-1.02-.09-.239-.074-.539-.18-.915-.345-1.396-.615-2.28-2.025-2.355-2.13-.074-.105-.623-.84-.623-1.605 0-.765.405-1.14.54-1.29.135-.15.3-.18.405-.18h.27c.09 0 .21.015.315.225.105.255.375.915.405.99.03.075.045.165.015.255-.03.09-.06.15-.12.225-.06.075-.12.165-.18.24-.06.06-.12.135-.045.24.075.105.345.57.735.915.51.45.945.585 1.08.66.135.075.21.06.285-.015.075-.075.33-.39.42-.525.09-.135.18-.105.3-.06.12.045.765.36.9.435.135.075.225.105.255.165.03.06.03.345-.12.765zM12 2C6.477 2 2 6.477 2 12c0 2.136.67 4.116 1.81 5.74L2 22l4.318-1.132C7.884 21.393 9.866 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
            </svg>
            Pedir por WhatsApp
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={config.logo}
                alt={config.nombre}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-red-500"
              />
              <div>
                <p className="font-black text-lg leading-tight">{config.nombre}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 fill-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-yellow-400 text-xs font-bold ml-1">{config.rating || '4.8'}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{config.slogan}</p>
          </div>

          {/* Información */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-4">Información</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0">📍</span>
                <span>{config.direccion}</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href={`mailto:${config.email}`} className="hover:text-white transition-colors">{config.email}</a>
              </li>
              <li className="flex items-center gap-2 mt-4">
                <span className="text-xs px-2 py-1 bg-green-600/20 text-green-400 rounded-full font-semibold border border-green-600/30">
                  ✅ Pago 100% seguro
                </span>
              </li>
            </ul>
          </div>

          {/* Horario */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-4">Horario</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p className="flex items-center gap-2">
                <span>🕐</span> {config.horario}
              </p>
              <p className="flex items-center gap-2 text-orange-400 font-semibold">
                <span>🛵</span> Delivery: {config.deliveryTime || '30-45 min'}
              </p>
              <p className="flex items-center gap-2 text-gray-400 text-xs mt-3">
                <span>💰</span> Delivery desde {formatMoney(config.deliveryCost ?? 5)}
              </p>
            </div>

            {/* Payment badges */}
            <div className="mt-5">
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Formas de pago</p>
              <div className="flex gap-2 flex-wrap">
                {config.paymentMethods?.efectivo && (
                  <span className="text-xs bg-gray-800 border border-gray-700 px-2.5 py-1 rounded-lg text-gray-300">💵 Efectivo</span>
                )}
                {config.paymentMethods?.yape && (
                  <span className="text-xs bg-purple-900/40 border border-purple-700/40 px-2.5 py-1 rounded-lg text-purple-300">📱 Yape</span>
                )}
                {config.paymentMethods?.tarjeta && (
                  <span className="text-xs bg-blue-900/40 border border-blue-700/40 px-2.5 py-1 rounded-lg text-blue-300">💳 Tarjeta</span>
                )}
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-4">Contacto</h4>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${config.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 bg-green-600/10 border border-green-600/30 hover:bg-green-600/20 text-green-400 px-4 py-3 rounded-2xl transition-all text-sm font-semibold"
              >
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.258.405 2.422 1.096 3.37l-1.127 4.12 4.221-1.107c.928.508 1.99.799 3.123.799 3.182 0 5.768-2.585 5.768-5.767 0-3.181-2.586-5.782-5.714-5.782zm3.393 8.24c-.15.422-.751.767-1.05.81-.255.03-.585.045-1.02-.09-.239-.074-.539-.18-.915-.345-1.396-.615-2.28-2.025-2.355-2.13-.074-.105-.623-.84-.623-1.605 0-.765.405-1.14.54-1.29.135-.15.3-.18.405-.18h.27c.09 0 .21.015.315.225.105.255.375.915.405.99.03.075.045.165.015.255-.03.09-.06.15-.12.225-.06.075-.12.165-.18.24-.06.06-.12.135-.045.24.075.105.345.57.735.915.51.45.945.585 1.08.66.135.075.21.06.285-.015.075-.075.33-.39.42-.525.09-.135.18-.105.3-.06.12.045.765.36.9.435.135.075.225.105.255.165.03.06.03.345-.12.765zM12 2C6.477 2 2 6.477 2 12c0 2.136.67 4.116 1.81 5.74L2 22l4.318-1.132C7.884 21.393 9.866 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
                WhatsApp
                <span className="text-green-600 text-xs ml-auto">+{config.whatsapp}</span>
              </a>

              <Link
                to="/login"
                className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-4 py-3 rounded-2xl transition-all text-sm font-semibold"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Iniciar sesión / Registro
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {year} <span className="text-gray-400 font-semibold">{config.nombre}</span>. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Hecho con <span className="text-red-500">♥</span> para nuestros clientes
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
