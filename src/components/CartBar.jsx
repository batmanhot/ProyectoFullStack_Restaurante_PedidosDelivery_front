const CartBar = ({ count, onClick }) => {
  if (count === 0) return null;

  return (
    <div
      onClick={onClick}
      className="fixed bottom-0 left-0 right-0 z-40 p-3 animate-slide-up"
    >
      <button className="w-full max-w-lg mx-auto bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-black py-4 px-6 rounded-2xl shadow-2xl shadow-red-900/40 transition-all flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-red-600 text-[10px] font-black rounded-full flex items-center justify-center shadow">
              {count}
            </span>
          </div>
          <span className="text-base">Ver mi pedido</span>
        </div>
        <div className="flex items-center gap-1 text-white/80 text-sm font-semibold">
          <span>Continuar</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default CartBar;
