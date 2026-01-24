export const BUSINESS_INFO = {
    nombre: 'DOÑA NELLA',
    logo: '/images/hamburguesa-logo.png',
    direccion: 'Av. Las Flores 123, Lima, Perú',
    slogan: '¡La mejores hamburguesas de Lima!',
    whatsapp: '51951655295',
    email: 'batmanponte@gmail.com',
    horario: 'Lunes a Domingo de 11:00 a 22:00',
};

export const CATEGORIES = [
    { id: 'hamburguesas', name: 'Hamburguesas', icon: '🍔' },
    { id: 'bebidas', name: 'Bebidas', icon: '🥤' },
    { id: 'postres', name: 'Postres', icon: '🍰' },
    { id: 'ofertas', name: 'Ofertas', icon: '🔥' },
];

export const PRODUCTS = [
    // Hamburguesas
    { id: 1, category: 'hamburguesas', name: 'Cheese Burger Duplo', price: 35.00, image: '/images/hamburguesa-1.avif', description: 'Pão de fermentação natural, 2x burger 160g, queijo prato e maionese da casa.' },
    { id: 2, category: 'hamburguesas', name: 'Smash Burger', price: 30.00, image: '/images/hamburguesa-2.avif', description: 'Pão brioche, burger 100g prensado, queijo cheddar e molho especial.' },
    { id: 3, category: 'hamburguesas', name: 'Cheese Bacon', price: 38.00, image: '/images/hamburguesa-3.avif', description: 'Pão levinho, burger 160g, queijo prato, bacon crocante e maionese da casa.' },
    { id: 4, category: 'hamburguesas', name: 'Chicken Burger', price: 32.00, image: '/images/hamburguesa-4.avif', description: 'Pão de brioche, frango empanado crocante, alface, tomate e maionese de alho.' },
    { id: 5, category: 'hamburguesas', name: 'Salad Burger', price: 28.00, image: '/images/hamburguesa-5.avif', description: 'Pão integral, burger 160g, alface, tomate, cebola roxa e queijo blanco.' },
    { id: 6, category: 'hamburguesas', name: 'Burger Vegano', price: 33.00, image: '/images/hamburguesa-6.avif', description: 'Pão vegano, burger à base de plantas, queijo vegano, alface e molho especial.' },

    // Bebidas
    { id: 101, category: 'bebidas', name: 'Inca Kola 500ml', price: 5.00, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=500&auto=format&fit=crop', description: 'La bebida de sabor nacional, heladita.' },
    { id: 102, category: 'bebidas', name: 'Coca Cola 500ml', price: 5.00, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=500&auto=format&fit=crop', description: 'Refrescante y clásica Coca Cola.' },
    { id: 103, category: 'bebidas', name: 'Chicha Morada Casera', price: 7.00, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=500&auto=format&fit=crop', description: 'Preparada con maiz morado, piña y un toque de limón.' },
    { id: 104, category: 'bebidas', name: 'Limonada Frozen', price: 8.00, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=500&auto=format&fit=crop', description: 'Refrescante limonada con hielo granizado.' },

    // Postres
    { id: 201, category: 'postres', name: 'Tres Leches', price: 12.00, image: 'https://images.unsplash.com/photo-1549440386-30238ee59819?q=80&w=500&auto=format&fit=crop', description: 'Bizcocho bañado en tres tipos de leche, super húmedo.' },
    { id: 202, category: 'postres', name: 'Brownie con Helado', price: 15.00, image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?q=80&w=500&auto=format&fit=crop', description: 'Brownie melcochudo de chocolate con una bola de helado de vainilla.' },
    { id: 203, category: 'postres', name: 'Cheesecake de Fresa', price: 14.00, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=500&auto=format&fit=crop', description: 'Cremoso cheesecake con mermelada artesanal de fresa.' },

    // Ofertas
    { id: 301, category: 'ofertas', name: 'Combo Duplo Familiar', price: 65.00, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=500&auto=format&fit=crop', description: '2 Cheese Burger Duplo + 2 Papas Fritas + 1 Gaseosa 1.5L.' },
    { id: 302, category: 'ofertas', name: 'Dúo Smash', price: 50.00, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=500&auto=format&fit=crop', description: '2 Smash Burger + Porción grande de Papas.' },
];
