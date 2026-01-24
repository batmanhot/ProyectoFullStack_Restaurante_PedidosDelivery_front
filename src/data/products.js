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
    { id: 'pizzas', name: 'Pizzas', icon: '🍕' },
    { id: 'menu_dia', name: 'Menú del Día', icon: '🍱' },
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

    // Pizzas
    { id: 401, category: 'pizzas', name: 'Pizza Pepperoni', price: 35.00, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=500&auto=format&fit=crop', description: 'Masa artesanal, salsa de tomate premium, abundante pepperoni y queso mozzarella.' },
    { id: 402, category: 'pizzas', name: 'Pizza Hawaiana', price: 32.00, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500&auto=format&fit=crop', description: 'La clásica combinación de piña, jamón seleccionado y extra queso.' },
    { id: 403, category: 'pizzas', name: 'Pizza Suprema', price: 40.00, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&auto=format&fit=crop', description: 'Cargada con carne de res, pimentón, cebolla, aceitunas y champiñones.' },
    { id: 404, category: 'pizzas', name: 'Pizza Margarita', price: 28.00, image: 'https://images.unsplash.com/photo-1574071318508-1cdbcd80ad51?q=80&w=500&auto=format&fit=crop', description: 'Sencillez elegante: albahaca fresca, rodajas de tomate y mozzarella premium.' },

    // Menú del Día
    { id: 501, category: 'menu_dia', name: 'Lomo Saltado', price: 25.00, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop', description: 'Trozo de lomo fino saltado al wok con cebolla, tomate, acompañado de arroz y papas fritas.' },
    { id: 502, category: 'menu_dia', name: 'Ají de Gallina', price: 22.00, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=500&auto=format&fit=crop', description: 'Clásico peruano: crema de ají amarillo con pollo deshilachado, huevo y aceituna.' },
    { id: 503, category: 'menu_dia', name: 'Arroz con Pollo', price: 20.00, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop', description: 'Sabroso arroz verde con culantro, presa de pollo y sarsa criolla.' },

    // Bebidas
    { id: 101, category: 'bebidas', name: 'Inca Kola 500ml', price: 5.00, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=500&auto=format&fit=crop', description: 'La bebida de sabor nacional, heladita.' },
    { id: 102, category: 'bebidas', name: 'Coca Cola 500ml', price: 5.00, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=500&auto=format&fit=crop', description: 'Refrescante y clásica Coca Cola.' },
    { id: 103, category: 'bebidas', name: 'Chicha Morada Casera', price: 7.00, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=500&auto=format&fit=crop', description: 'Preparada con maiz morado, piña y un toque de limón.' },

    // Postres
    { id: 201, category: 'postres', name: 'Tres Leches', price: 12.00, image: 'https://images.unsplash.com/photo-1549440386-30238ee59819?q=80&w=500&auto=format&fit=crop', description: 'Bizcocho bañado en tres tipos de leche, super húmedo.' },
    { id: 202, category: 'postres', name: 'Brownie con Helado', price: 15.00, image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?q=80&w=500&auto=format&fit=crop', description: 'Brownie melcochudo de chocolate con una bola de helado de vainilla.' },

    // Ofertas
    { id: 301, category: 'ofertas', name: 'Combo Duplo Familiar', price: 65.00, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=500&auto=format&fit=crop', description: '2 Cheese Burger Duplo + 2 Papas Fritas + 1 Gaseosa 1.5L.' },
];
