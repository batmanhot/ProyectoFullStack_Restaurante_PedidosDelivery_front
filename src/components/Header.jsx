import { BUSINESS_INFO } from '../data/products';

const Header = () => {
    return (
        <header
            className="relative h-96 md:h-[500px] bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2865&auto=format&fit=crop')" }}
        >
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                <img
                    src={BUSINESS_INFO.logo}
                    alt={`Logo ${BUSINESS_INFO.nombre}`}
                    className="w-32 h-32 md:w-40 md:h-40 object-cover mb-4 rounded-full shadow-lg ring-2 ring-white shadow-green-50"
                />
                <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider">{BUSINESS_INFO.nombre}</h1>
                <p className="mt-2 text-lg opacity-90">{BUSINESS_INFO.direccion}</p>
                <div className="mt-4 bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-md">
                    <p>{BUSINESS_INFO.horario}</p>
                </div>
            </div>
        </header>
    );
};

export default Header;
