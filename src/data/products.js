export const BUSINESS_INFO = {
    nombre: 'DOÑA NELLA',
    logo: '/images/hamburguesa-logo.png',
    direccion: 'Av. Las Flores 123, Lima, Perú',
    slogan: 'Restaurante Delivery Multicategoría · Todo tu antojo en un solo lugar',
    tagline: 'Todo tu antojo en un solo lugar',
    whatsapp: '51951655295',
    email: 'batmanponte@gmail.com',
    horario: 'Lunes a Domingo de 11:00 a 22:00',
};

export const CATEGORIES = [
    { id: 'hamburguesas', name: 'Hamburguesas', icon: '🍔' },
    { id: 'salchipapas', name: 'Salchipapas', icon: '🍟' },
    { id: 'broasters', name: 'Broasters', icon: '🍗' },
    { id: 'pizzas', name: 'Pizzas', icon: '🍕' },
    { id: 'menu_dia', name: 'Menú del Día', icon: '🍱' },
    { id: 'platos_carta', name: 'Platos a la Carta', icon: '🍽️' },
    { id: 'recomendaciones', name: 'Recomendaciones', icon: '👨‍🍳' },
    { id: 'bebidas', name: 'Bebidas', icon: '🥤' },
    { id: 'postres', name: 'Postres', icon: '🍰' },
    { id: 'ensaladas', name: 'Ensaladas', icon: '🥗' },
    { id: 'complementos', name: 'Complementos', icon: '🧂' },
    { id: 'ofertas', name: 'Ofertas', icon: '🔥' },
    { id: 'combos', name: 'Combos', icon: '🎁' },
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

    // Platos a la Carta
    { id: 601, category: 'platos_carta', name: 'Fettuccine a la Huancaína', price: 35.00, image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=500&auto=format&fit=crop', description: 'Fettuccine en salsa huancaína cremosa acompañado de un jugoso lomo saltado.' },
    { id: 602, category: 'platos_carta', name: 'Ceviche de Pescado', price: 38.00, image: 'https://images.unsplash.com/photo-1534604973900-c41ab4c5e636?q=80&w=500&auto=format&fit=crop', description: 'Fresco ceviche de corvina marinado en limón de piura, camote y choclo.' },
    { id: 603, category: 'platos_carta', name: 'Tacu Tacu con Lomo', price: 34.00, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500&auto=format&fit=crop', description: 'Tradicional mezcla de arroz y frejoles fritos con lomo al jugo.' },
    { id: 604, category: 'platos_carta', name: 'Seco de Cordero', price: 42.00, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=500&auto=format&fit=crop', description: 'Tierno cordero guisado en salsa de culantro y chicha de jora, con frejoles y arroz.' },
    { id: 605, category: 'platos_carta', name: 'Pollo a la Brasa (1/4)', price: 24.00, image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=500&auto=format&fit=crop', description: 'Nuestro clásico pollo a la brasa con papas fritas crocantes y ensalada fresca.' },

    // Recomendaciones del Chef
    { id: 701, category: 'recomendaciones', name: 'Risotto de Champiñones', price: 45.00, image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=500&auto=format&fit=crop', description: 'Arroz arborio cremoso con variedad de setas silvestres y aceite de trufa.' },
    { id: 702, category: 'recomendaciones', name: 'Salmon Glaseado', price: 55.00, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=500&auto=format&fit=crop', description: 'Salmón fresco con glaseado cítrico, puré de arvejas y vegetales baby.' },
    { id: 703, category: 'recomendaciones', name: 'Costillas BBQ Premium', price: 48.00, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=500&auto=format&fit=crop', description: 'Costillas de cerdo cocidas a baja temperatura por 12 horas con salsa BBQ secreta.' },

    // Menú del Día
    { id: 501, category: 'menu_dia', name: 'Lomo Saltado', price: 25.00, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop', description: 'Trozo de lomo fino saltado al wok con cebolla, tomate, acompañado de arroz y papas fritas.' },
    { id: 502, category: 'menu_dia', name: 'Ají de Gallina', price: 22.00, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=500&auto=format&fit=crop', description: 'Clásico peruano: crema de ají amarillo con pollo deshilachado, huevo y aceituna.' },
    { id: 503, category: 'menu_dia', name: 'Arroz con Pollo', price: 20.00, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop', description: 'Sabroso arroz verde con culantro, presa de pollo y sarsa criolla.' },

    // Bebidas
    { id: 101, category: 'bebidas', name: 'Inca Kola 500ml', price: 5.00, upsell: true, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=500&auto=format&fit=crop', description: 'La bebida de sabor nacional, heladita.' },
    { id: 102, category: 'bebidas', name: 'Coca Cola 500ml', price: 5.00, upsell: true, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=500&auto=format&fit=crop', description: 'Refrescante y clásica Coca Cola.' },
    { id: 103, category: 'bebidas', name: 'Chicha Morada Casera', price: 7.00, upsell: true, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=500&auto=format&fit=crop', description: 'Preparada con maiz morado, piña y un toque de limón.' },

    // Postres
    { id: 201, category: 'postres', name: 'Tres Leches', price: 12.00, image: 'https://images.unsplash.com/photo-1549440386-30238ee59819?q=80&w=500&auto=format&fit=crop', description: 'Bizcocho bañado en tres tipos de leche, super húmedo.' },
    { id: 202, category: 'postres', name: 'Brownie con Helado', price: 15.00, image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?q=80&w=500&auto=format&fit=crop', description: 'Brownie melcochudo de chocolate con una bola de helado de vainilla.' },

    // Ensaladas
    { id: 801, category: 'ensaladas', name: 'Ensalada César', price: 25.00, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=500&auto=format&fit=crop', description: 'Pechuga de pollo a la brasa, lechuga romana, croutones, queso parmesano y salsa César.' },
    { id: 802, category: 'ensaladas', name: 'Ensalada Mediterránea', price: 22.00, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=500&auto=format&fit=crop', description: 'Mix de lechugas, tomate cherry, pepino, aceitunas negras, queso feta y vinagreta balsámica.' },
    { id: 803, category: 'ensaladas', name: 'Ensalada de Quinoa', price: 24.00, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop', description: 'Quinoa orgánica, palta, tomate cherry, choclo, perejil y aliño de limón.' },

    // Complementos
    { id: 901, category: 'complementos', name: 'Vaso de Chicha Morada', price: 4.00, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=500&auto=format&fit=crop', description: 'Refrescante vaso de chicha morada artesanal.' },
    { id: 902, category: 'complementos', name: 'Canchita Serrana', price: 3.00, upsell: true, image: 'https://images.unsplash.com/photo-1599487488170-d11ec93a730d?q=80&w=500&auto=format&fit=crop', description: 'Porción de canchita recién tostada y saladita.' },
    { id: 903, category: 'complementos', name: 'Crema de Ají de la Casa', price: 2.00, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=500&auto=format&fit=crop', description: 'Nuestro ají especial secreto, ideal para acompañar.' },
    { id: 904, category: 'complementos', name: 'Mayonesa Artesanal', price: 2.00, image: 'https://images.unsplash.com/photo-1588860322c02-422026e5fc3a?q=80&w=500&auto=format&fit=crop', description: 'Mayonesa cremosa hecha en casa.' },
    { id: 905, category: 'complementos', name: 'Salsa Huancaína', price: 3.00, image: 'https://images.unsplash.com/photo-1590137876181-2a5a7e34030d?q=80&w=500&auto=format&fit=crop', description: 'Clásica salsa peruana a base de ají amarillo y queso.' },
    { id: 906, category: 'complementos', name: 'Porción de Ají Parrillero', price: 2.50, image: 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?q=80&w=500&auto=format&fit=crop', description: 'Ají con hierbas finas, perfecto para carnes.' },

    // Ofertas / Combos
    { id: 301, category: 'ofertas', name: 'Combo Duplo Familiar', price: 65.00, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=500&auto=format&fit=crop', description: '2 Cheese Burger Duplo + 2 Papas Fritas + 1 Gaseosa 1.5L.', badge: 'oferta', featured: true },
    { id: 302, category: 'ofertas', name: 'Combo Personal', price: 38.00, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop', description: '1 Hamburguesa a tu elección + 1 Gaseosa 500ml. ¡Ahorra S/7!', badge: 'oferta' },
    { id: 303, category: 'ofertas', name: 'Combo Dúo', price: 72.00, image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=500&auto=format&fit=crop', description: '2 Hamburguesas + 2 Salchipapas Especiales + 2 Gaseosas. ¡Ahorra S/16!', badge: 'oferta' },
    { id: 304, category: 'ofertas', name: 'Combo Broaster Familiar', price: 58.00, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=500&auto=format&fit=crop', description: '1/2 Pollo Broaster + Papas Grandes + 2 Gaseosas + Cremas. ¡Ahorra S/12!', badge: 'oferta' },

    // Salchipapas
    { id: 1001, category: 'salchipapas', name: 'Salchipapa Simple', price: 12.00, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=500&auto=format&fit=crop', description: 'Papas fritas crocantes con rodajas de salchicha. Incluye crema de ají.', featured: true, badge: 'popular' },
    { id: 1002, category: 'salchipapas', name: 'Salchipapa Especial', price: 16.00, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=500&auto=format&fit=crop', description: 'Papas fritas + salchicha + huevo frito + mostaza + ketchup + mayonesa de la casa.' },
    { id: 1003, category: 'salchipapas', name: 'Salchipapa XXL', price: 22.00, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=500&auto=format&fit=crop', description: 'Porción XL de papas fritas con doble salchicha, huevo, queso fundido y cremas especiales.' },
    { id: 1004, category: 'salchipapas', name: 'Salchipapa con Pollo', price: 18.00, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=500&auto=format&fit=crop', description: 'Papas fritas + tiras de pollo crocante + salchicha + cremas de la casa.' },

    // Broasters
    { id: 1101, category: 'broasters', name: 'Cuarto de Pollo Broaster', price: 18.00, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=500&auto=format&fit=crop', description: '1/4 de pollo broaster dorado y crocante. Con papas y ensalada.', featured: true, badge: 'popular' },
    { id: 1102, category: 'broasters', name: 'Medio Pollo Broaster', price: 32.00, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=500&auto=format&fit=crop', description: '1/2 pollo broaster con papas fritas grandes, ensalada y cremas especiales.' },
    { id: 1103, category: 'broasters', name: 'Pollo Broaster Entero', price: 58.00, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=500&auto=format&fit=crop', description: 'Pollo entero broaster dorado a la perfección. Con 2 porciones de papas, ensalada y cremas.' },
    { id: 1104, category: 'broasters', name: 'Alitas Broaster x6', price: 22.00, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=500&auto=format&fit=crop', description: '6 alitas de pollo broaster extra crocantes. Con salsa BBQ o crema de ají.' },
];
