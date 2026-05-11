# Sistema de Gestión de Comercio Electrónico

Aplicación web completa para la gestión de productos, clientes y pedidos utilizando Node.js, Express y MongoDB en el backend, y HTML/CSS/JavaScript puro en el frontend.

## Funcionalidades

- **Gestión de Productos**: CRUD completo (Crear, Leer, Actualizar, Eliminar)
- **Gestión de Clientes**: CRUD completo con nombre y email
- **Gestión de Pedidos**: Crear pedidos asociando clientes con productos, cálculo automático de totales

## Instalación y Ejecución

### Prerrequisitos
- Node.js instalado
- MongoDB Atlas (o local) configurado

### Instalación
1. Clona el repositorio:
   ```
   git clone https://github.com/DereckFaridVera/BackEndVera.git
   cd BackEndVera
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Configura las variables de entorno en `.env`:
   ```
   MONGO_URI="#"
   PORT=3000
   ```

4. Ejecuta el servidor:
   ```
   npm start
   ```
   (Esto usa nodemon para reinicio automático en desarrollo)

5. Abre tu navegador en `http://localhost:3000`

## API Endpoints

### Productos
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener un producto específico
- `POST /api/products` - Crear un nuevo producto
- `PUT /api/products/:id` - Actualizar un producto
- `DELETE /api/products/:id` - Eliminar un producto

### Clientes
- `GET /api/clients` - Obtener todos los clientes
- `GET /api/clients/:id` - Obtener un cliente específico
- `POST /api/clients` - Crear un nuevo cliente
- `PUT /api/clients/:id` - Actualizar un cliente
- `DELETE /api/clients/:id` - Eliminar un cliente

### Pedidos
- `GET /api/orders` - Obtener todos los pedidos (con información del cliente)
- `GET /api/orders/:id` - Obtener un pedido específico
- `POST /api/orders` - Crear un nuevo pedido
- `PUT /api/orders/:id` - Actualizar un pedido
- `DELETE /api/orders/:id` - Eliminar un pedido

### Códigos de Estado
- 200 OK - Solicitud exitosa
- 201 Created - Recurso creado
- 400 Bad Request - Datos inválidos
- 404 Not Found - Recurso no encontrado
- 500 Internal Server Error - Error del servidor

## Tecnologías Utilizadas
- Backend: Node.js, Express, MongoDB con Mongoose
- Frontend: HTML, CSS, JavaScript (async/await)
- Base de Datos: MongoDB Atlas