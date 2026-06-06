import { useApp } from '../context/AppContext';

const WhatsAppButton = () => {
  const { config } = useApp();

  const handleClick = () => {
    const msg = `Hola ${config.nombre}! Quisiera consultar el menú y realizar un pedido. 🍔`;
    window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-24 right-5 z-40 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 active:scale-95 rounded-full shadow-xl shadow-green-500/40 transition-all duration-200 group"
    >
      <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.258.405 2.422 1.096 3.37l-1.127 4.12 4.221-1.107c.928.508 1.99.799 3.123.799 3.182 0 5.768-2.585 5.768-5.767 0-3.181-2.586-5.782-5.714-5.782zm3.393 8.24c-.15.422-.751.767-1.05.81-.255.03-.585.045-1.02-.09-.239-.074-.539-.18-.915-.345-1.396-.615-2.28-2.025-2.355-2.13-.074-.105-.623-.84-.623-1.605 0-.765.405-1.14.54-1.29.135-.15.3-.18.405-.18h.27c.09 0 .21.015.315.225.105.255.375.915.405.99.03.075.045.165.015.255-.03.09-.06.15-.12.225-.06.075-.12.165-.18.24-.06.06-.12.135-.045.24.075.105.345.57.735.915.51.45.945.585 1.08.66.135.075.21.06.285-.015.075-.075.33-.39.42-.525.09-.135.18-.105.3-.06.12.045.765.36.9.435.135.075.225.105.255.165.03.06.03.345-.12.765zM12 2C6.477 2 2 6.477 2 12c0 2.136.67 4.116 1.81 5.74L2 22l4.318-1.132C7.884 21.393 9.866 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
      </svg>
      {/* Tooltip */}
      <span className="absolute right-16 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
        Consultas al WhatsApp
      </span>
    </button>
  );
};

export default WhatsAppButton;
