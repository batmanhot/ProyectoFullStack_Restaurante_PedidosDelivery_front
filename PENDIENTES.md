# Pendientes — Burger Delivery
**Fecha de corte:** Etapa 1 Frontend completada al 100%
**Próxima etapa:** Backend + Base de datos

---

## ETAPA 1 — FRONTEND COMPLETADO ✅

### Arquitectura
- [x] Capa de servicios abstraída (storageService, authService, productService, orderService, configService, cartService)
- [x] React Context API (AuthContext, CartContext, AppContext)
- [x] React Router DOM con rutas protegidas por rol
- [x] Separación de páginas por responsabilidad

### Autenticación (DEV simulado)
- [x] Login admin hardcodeado (admin@burguer.com / admin123)
- [x] Registro y login de clientes en localStorage
- [x] Sesión persistida en localStorage
- [x] Roles: admin / customer / guest
- [x] Rutas protegidas (ProtectedRoute con adminOnly)
- [x] Migración automática de carrito guest → usuario al loguearse

### Panel de Administración
- [x] Sidebar con navegación + botón "Ver Tienda"
- [x] Dashboard: estadísticas de pedidos, ingresos, productos, clientes
- [x] Pedidos: listado, filtros, flujo de estados, cancelación, asignar repartidor
- [x] Productos: CRUD completo, disponibilidad, badge, destacado (Más Pedidos)
- [x] Usuarios: listado de clientes registrados, eliminar
- [x] Configuración: nombre, logo, slogan, dirección, horario, WhatsApp, email
- [x] Configuración: rating, tiempo de entrega, total reseñas
- [x] Configuración: banner promocional (texto + on/off)
- [x] Configuración: pagos (Efectivo / Yape con QR / Tarjeta simulada)
- [x] Configuración: delivery (costo + mínimo de pedido)
- [x] Configuración: imagen de portada (header)

### Catálogo y Carrito
- [x] Sección "Los Más Pedidos" (carrusel horizontal, productos marcados como featured)
- [x] Filtro de categorías horizontal deslizable
- [x] Carrito persistido en localStorage por usuario/guest
- [x] Pago Yape con QR configurable + número configurable
- [x] Pago Efectivo contraentrega
- [x] Pago Tarjeta (simulado)
- [x] Costo de delivery dinámico
- [x] Bloqueo de checkout si no está logueado (prompt dentro del modal)
- [x] Orden guardada con número auto-incremental
- [x] WhatsApp al negocio con detalle completo del pedido

### Experiencia del Cliente
- [x] Página "Mis Pedidos" con timeline visual de 5 estados
- [x] Tabs: En Proceso / Historial
- [x] Alerta modal "en camino" (naranja, animada, real-time via storage event)
- [x] DeliveryBanner compacto en página principal (polling + storage event)
- [x] Nombre del repartidor visible en pedido y en alerta
- [x] WhatsApp al cliente al asignar repartidor (desde admin)
- [x] Página "Mi Perfil": editar nombre, email, teléfono, contraseña
- [x] Bloqueo de edición de perfil si hay pedido activo

### Diseño y UI/UX
- [x] Header rediseñado: banner promo, stats (rating, delivery time, estado)
- [x] CTA "Ver Menú" con scroll suave
- [x] Trust strip debajo del hero
- [x] ProductCard con badges (Popular, Nuevo, Oferta, Chef)
- [x] CartBar flotante rediseñado
- [x] Footer sticky con 4 columnas + CTA strip rojo + copyright
- [x] Fondo stone-50 (crema cálido)
- [x] Footer siempre al fondo (min-h-screen flex flex-col)

---

## ETAPA 2 — BACKEND ⏳

### 2.1 Preparación del proyecto

- [ ] Crear repositorio backend (Node.js + Express o NestJS)
- [ ] Configurar variable de entorno `VITE_API_URL` en el frontend
- [ ] Crear archivo `.env.example` con todas las variables necesarias
- [ ] Configurar CORS para permitir el dominio del frontend
- [ ] Separar configuración dev / staging / prod

### 2.2 Base de datos

- [ ] Elegir motor: **PostgreSQL** (recomendado) o MySQL
- [ ] Configurar ORM: **Prisma** (recomendado)
- [ ] Diseñar y crear esquema completo:

```
users          → id, name, email, password_hash, phone, role, created_at
products       → id, name, description, price, image_url, category_id, available, featured, badge, created_at
categories     → id, name, icon, sort_order
orders         → id, order_number, user_id, status, subtotal, delivery_cost, total, payment_method, created_at, updated_at, departure_time
order_items    → id, order_id, product_id, name, price, quantity
order_delivery → id, order_id, customer_name, phone, address, reference, delivery_person
config         → id (único), all business config fields as JSON or columns
```

- [ ] Crear migraciones con Prisma
- [ ] Crear seeder con datos actuales de `products.js` (80 productos, 10 categorías)
- [ ] Crear seeder de configuración inicial (BUSINESS_INFO)

### 2.3 Autenticación y Seguridad

- [ ] Hash de contraseñas con **bcrypt** (salt rounds: 12)
- [ ] Autenticación con **JWT** (access token 15min + refresh token 7 días)
- [ ] Middleware `authenticate` para rutas protegidas
- [ ] Middleware `requireAdmin` para rutas de administración
- [ ] Reemplazar `authService.js` → llamadas a `/api/auth/login`, `/api/auth/register`, `/api/auth/refresh`
- [ ] Validación de email con formato correcto
- [ ] Rate limiting en `/api/auth/login` (máx 5 intentos / 15 min)
- [ ] Endpoint de recuperación de contraseña (envío por email)
- [ ] Verificación de email al registrarse (opcional fase inicial)

### 2.4 Endpoints API a implementar

#### Auth
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
PUT    /api/auth/profile          ← actualizar datos del cliente
PUT    /api/auth/change-password
```

#### Productos
```
GET    /api/products              ← con filtros: category, available, featured
GET    /api/products/:id
POST   /api/products              ← admin
PUT    /api/products/:id          ← admin
DELETE /api/products/:id          ← admin
PATCH  /api/products/:id/toggle   ← disponibilidad
PATCH  /api/products/:id/featured ← destacado
```

#### Categorías
```
GET    /api/categories
POST   /api/categories            ← admin
DELETE /api/categories/:id        ← admin
```

#### Pedidos
```
POST   /api/orders                ← crear pedido (cliente autenticado)
GET    /api/orders                ← todos (admin)
GET    /api/orders/my             ← del cliente logueado
GET    /api/orders/:id
PATCH  /api/orders/:id/status     ← admin: avanzar estado
PATCH  /api/orders/:id/delivery   ← admin: asignar repartidor
DELETE /api/orders/:id            ← admin
```

#### Configuración
```
GET    /api/config                ← público (nombre, logo, horario, pagos)
PUT    /api/config                ← admin
```

#### Usuarios (admin)
```
GET    /api/users
DELETE /api/users/:id
```

### 2.5 Migración de servicios frontend

Solo se reemplazan las implementaciones en `src/services/`. Los componentes no cambian.

| Servicio | Archivo | Tipo de cambio |
|---------|---------|----------------|
| Auth | `src/services/authService.js` | Reemplazar completamente con fetch |
| Productos | `src/services/productService.js` | Reemplazar completamente con fetch |
| Pedidos | `src/services/orderService.js` | Reemplazar completamente con fetch |
| Configuración | `src/services/configService.js` | Reemplazar completamente con fetch |
| Carrito | `src/services/cartService.js` | Mantener en localStorage (o migrar) |
| Storage | `src/services/storageService.js` | Mantener para carrito/sesión local |

**Patrón de migración:**
```js
// ANTES (localStorage):
getProducts: () => storage.get('products') || []

// DESPUÉS (backend):
getProducts: async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if (!res.ok) throw new Error('Error al cargar productos');
  return res.json();
}
```

### 2.6 Notificaciones en tiempo real

- [ ] Implementar **WebSockets** con Socket.io (o Server-Sent Events)
- [ ] Evento: nuevo pedido recibido → notificar al admin (sonido + badge)
- [ ] Evento: cambio de estado → notificar al cliente en tiempo real
- [ ] Reemplazar el polling de 5 segundos del DeliveryAlert y DeliveryBanner
- [ ] Reemplazar el `storage` event (workaround local) con WebSocket real
- [ ] Panel admin: indicador de pedidos nuevos sin revisar

### 2.7 Gestión de imágenes

- [ ] Integrar **Cloudinary** (cuenta gratuita: 25 GB)
- [ ] Endpoint `POST /api/upload` para subir imágenes desde admin
- [ ] Actualizar ProductsPage: campo imagen con botón "Subir foto" + preview
- [ ] Actualizar SettingsPage: logo y header image subibles directamente
- [ ] Actualizar SettingsPage: QR de Yape subible directamente
- [ ] Eliminar dependencia de URLs de Unsplash en los productos

### 2.8 Pagos reales

- [ ] Integrar pasarela peruana: **Culqi** o **Niubiz** (aceptan Yape + tarjeta)
- [ ] Endpoint `POST /api/payments/create-session`
- [ ] Webhook `POST /api/payments/webhook` para confirmación
- [ ] Registrar transacciones en tabla `payments`
- [ ] Mostrar estado de pago en panel admin
- [ ] Eliminar el simulador de tarjeta actual
- [ ] (Fase avanzada) Factura/boleta electrónica SUNAT

### 2.9 Validaciones frontend (antes del backend)

- [ ] Teléfono celular peruano: 9 dígitos, inicia con 9
- [ ] Email con formato válido
- [ ] Contraseña mínimo 8 caracteres, mayúscula, número
- [ ] Dirección mínimo 10 caracteres
- [ ] Precio de producto mayor a 0
- [ ] Mostrar errores campo por campo (no alert())

---

## ETAPA 3 — ESCALA Y COMERCIAL 🔮

### PWA (Progressive Web App)
- [ ] Configurar Vite PWA plugin
- [ ] Service Worker para modo offline (catálogo sin conexión)
- [ ] Instalable en Android/iOS desde el navegador
- [ ] Push notifications nativas al cambiar estado del pedido

### Funcionalidades comerciales
- [ ] Sistema de cupones y descuentos (código + % o monto fijo)
- [ ] Pedido mínimo por zona de delivery
- [ ] Múltiples zonas de cobertura con costos diferentes
- [ ] Horarios de atención con días festivos y excepciones
- [ ] Historial completo de pedidos con búsqueda y filtros
- [ ] Sistema de reseñas y calificaciones por producto (1-5 estrellas)
- [ ] Productos relacionados / "También te puede gustar"
- [ ] Búsqueda de productos con texto libre

### Analytics y reportes
- [ ] Dashboard admin mejorado: gráfica de ventas por día/semana/mes
- [ ] Productos más vendidos (ranking)
- [ ] Horas pico de pedidos
- [ ] Ticket promedio
- [ ] Tasa de conversión (visitas → pedidos)
- [ ] Exportar reportes a Excel/PDF

### Infraestructura producción
- [ ] Deploy backend: **Railway** o **Render** (gratis para empezar)
- [ ] Deploy frontend: **Vercel** (gratis)
- [ ] Base de datos: **Supabase** o **Railway PostgreSQL**
- [ ] Imágenes: **Cloudinary** (tier gratuito)
- [ ] Variables de entorno por ambiente (dev / staging / prod)
- [ ] CI/CD con GitHub Actions (build + deploy automático)
- [ ] Backups automáticos de base de datos (cron diario)
- [ ] Monitoreo de errores: **Sentry** (tier gratuito)
- [ ] Uptime monitoring: **UptimeRobot**

---

## DEUDA TÉCNICA PENDIENTE

| Item | Riesgo | Cuándo resolver |
|------|--------|-----------------|
| Contraseñas en texto plano en localStorage | 🔴 Alto | Inicio de Etapa 2 |
| Sin validación de formato en formularios | 🟡 Medio | Antes del backend |
| Sin manejo de errores de red | 🟡 Medio | Al migrar a API |
| Polling de 5s para alertas de delivery | 🟡 Medio | Con WebSockets en Etapa 2 |
| Imágenes de productos desde Unsplash | 🟢 Bajo | Con Cloudinary en Etapa 2 |
| Número de pedido hardcodeado en seed | 🟢 Bajo | Con backend auto-incremental |
| Sin tests unitarios ni e2e | 🟡 Medio | Etapa 2 (Vitest + Playwright) |
| Tarjeta simulada sin pasarela real | 🟢 Bajo | Etapa 3 (Culqi/Niubiz) |

---

## RESUMEN EJECUTIVO PARA ARRANCAR EL BACKEND

**Stack recomendado:**
- Backend: **Node.js + Express** (sencillo) o **NestJS** (escalable)
- Base de datos: **PostgreSQL** en Supabase (gratuito, rápido de configurar)
- ORM: **Prisma**
- Auth: **JWT + bcrypt**
- Imágenes: **Cloudinary**
- Realtime: **Socket.io**
- Deploy: **Railway** (backend) + **Vercel** (frontend)

**Orden recomendado de implementación:**
1. Auth (login/register/JWT) — desbloquea todo lo demás
2. Productos y Categorías — el catálogo es lo más visible
3. Pedidos — flujo central del negocio
4. Configuración — el admin puede operar
5. Realtime con Socket.io — experiencia premium
6. Cloudinary — imágenes propias
7. Pasarela de pagos — monetización real
