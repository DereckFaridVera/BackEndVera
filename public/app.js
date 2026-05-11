const API_BASE_PRODUCTS = 'http://localhost:3000/api/products';
const API_BASE_CLIENTS = 'http://localhost:3000/api/clients';
const API_BASE_ORDERS = 'http://localhost:3000/api/orders';

// Variables globales
let allProducts = [];
let allClients = [];
let orderProducts = [];

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadClients();
    loadOrders();
});

// Navegación entre secciones
function showSection(sectionName) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Mostrar la sección seleccionada
    document.getElementById(sectionName).classList.add('active');

    // Actualizar navegación activa
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Cerrar modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// ==================== PRODUCTOS ====================

// Cargar productos
async function loadProducts() {
    try {
        const response = await fetch(API_BASE_PRODUCTS);
        if (!response.ok) throw new Error('Error al cargar productos');
        allProducts = await response.json();
        displayProducts(allProducts);
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar productos');
    }
}

// Mostrar productos
function displayProducts(products) {
    const container = document.getElementById('productsList');
    container.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'item-card';
        productCard.innerHTML = `
            <h3>${product.nombre}</h3>
            <p><strong>Precio:</strong> $${product.precio}</p>
            <p><strong>Talla:</strong> ${product.talla}</p>
            <button class="btn btn-warning" onclick="editProduct('${product._id}')">Editar</button>
            <button class="btn btn-danger" onclick="deleteProduct('${product._id}')">Eliminar</button>
        `;
        container.appendChild(productCard);
    });
}

// Agregar producto
document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('productNombre').value;
    const precio = parseFloat(document.getElementById('productPrecio').value);
    const talla = document.getElementById('productTalla').value;

    try {
        const response = await fetch(API_BASE_PRODUCTS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, precio, talla })
        });
        if (!response.ok) throw new Error('Error al crear producto');
        loadProducts();
        document.getElementById('productForm').reset();
    } catch (error) {
        console.error('Error:', error);
        alert('Error al crear producto');
    }
});

// Editar producto
async function editProduct(id) {
    const product = allProducts.find(p => p._id === id);
    if (!product) return;

    document.getElementById('editProductId').value = product._id;
    document.getElementById('editProductNombre').value = product.nombre;
    document.getElementById('editProductPrecio').value = product.precio;
    document.getElementById('editProductTalla').value = product.talla;

    document.getElementById('productModal').style.display = 'flex';
}

// Actualizar producto
document.getElementById('editProductForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('editProductId').value;
    const nombre = document.getElementById('editProductNombre').value;
    const precio = parseFloat(document.getElementById('editProductPrecio').value);
    const talla = document.getElementById('editProductTalla').value;

    try {
        const response = await fetch(`${API_BASE_PRODUCTS}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, precio, talla })
        });
        if (!response.ok) throw new Error('Error al actualizar producto');
        loadProducts();
        closeModal('productModal');
    } catch (error) {
        console.error('Error:', error);
        alert('Error al actualizar producto');
    }
});

// Eliminar producto
async function deleteProduct(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) return;

    try {
        const response = await fetch(`${API_BASE_PRODUCTS}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Error al eliminar producto');
        loadProducts();
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar producto');
    }
}

// ==================== CLIENTES ====================

// Cargar clientes
async function loadClients() {
    try {
        const response = await fetch(API_BASE_CLIENTS);
        if (!response.ok) throw new Error('Error al cargar clientes');
        allClients = await response.json();
        displayClients(allClients);
        updateClientSelect();
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar clientes');
    }
}

// Mostrar clientes
function displayClients(clients) {
    const container = document.getElementById('clientsList');
    container.innerHTML = '';

    clients.forEach(client => {
        const clientCard = document.createElement('div');
        clientCard.className = 'item-card';
        clientCard.innerHTML = `
            <h3>${client.nombre}</h3>
            <p><strong>Email:</strong> ${client.email}</p>
            <button class="btn btn-warning" onclick="editClient('${client._id}')">Editar</button>
            <button class="btn btn-danger" onclick="deleteClient('${client._id}')">Eliminar</button>
        `;
        container.appendChild(clientCard);
    });
}

// Agregar cliente
document.getElementById('clientForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('clientNombre').value;
    const email = document.getElementById('clientEmail').value;

    try {
        const response = await fetch(API_BASE_CLIENTS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email })
        });
        if (!response.ok) throw new Error('Error al crear cliente');
        loadClients();
        document.getElementById('clientForm').reset();
    } catch (error) {
        console.error('Error:', error);
        alert('Error al crear cliente');
    }
});

// Editar cliente
async function editClient(id) {
    const client = allClients.find(c => c._id === id);
    if (!client) return;

    document.getElementById('editClientId').value = client._id;
    document.getElementById('editClientNombre').value = client.nombre;
    document.getElementById('editClientEmail').value = client.email;

    document.getElementById('clientModal').style.display = 'flex';
}

// Actualizar cliente
document.getElementById('editClientForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('editClientId').value;
    const nombre = document.getElementById('editClientNombre').value;
    const email = document.getElementById('editClientEmail').value;

    try {
        const response = await fetch(`${API_BASE_CLIENTS}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email })
        });
        if (!response.ok) throw new Error('Error al actualizar cliente');
        loadClients();
        closeModal('clientModal');
    } catch (error) {
        console.error('Error:', error);
        alert('Error al actualizar cliente');
    }
});

// Eliminar cliente
async function deleteClient(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar este cliente?')) return;

    try {
        const response = await fetch(`${API_BASE_CLIENTS}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Error al eliminar cliente');
        loadClients();
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar cliente');
    }
}

// ==================== PEDIDOS ====================

// Cargar pedidos
async function loadOrders() {
    try {
        const response = await fetch(API_BASE_ORDERS);
        if (!response.ok) throw new Error('Error al cargar pedidos');
        const orders = await response.json();
        displayOrders(orders);
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar pedidos');
    }
}

// Mostrar pedidos
function displayOrders(orders) {
    const container = document.getElementById('ordersList');
    container.innerHTML = '';

    orders.forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'item-card';
        orderCard.innerHTML = `
            <h3>Pedido de ${order.cliente.nombre}</h3>
            <p><strong>Productos:</strong></p>
            <ul>
                ${order.productos.map(p => `<li>${p.nombre} - $${p.precio} (${p.talla})</li>`).join('')}
            </ul>
            <p><strong>Total:</strong> $${order.total}</p>
            <button class="btn btn-danger" onclick="deleteOrder('${order._id}')">Eliminar</button>
        `;
        container.appendChild(orderCard);
    });
}

// Actualizar select de clientes
function updateClientSelect() {
    const select = document.getElementById('orderClient');
    select.innerHTML = '<option value="">Seleccionar cliente</option>';

    allClients.forEach(client => {
        const option = document.createElement('option');
        option.value = client._id;
        option.textContent = client.nombre;
        select.appendChild(option);
    });
}

// Agregar producto al pedido
function addProductToOrder() {
    const container = document.getElementById('orderProducts');

    const productDiv = document.createElement('div');
    productDiv.className = 'form-group';
    productDiv.innerHTML = `
        <label>Producto</label>
        <select class="product-select" required>
            <option value="">Seleccionar producto</option>
            ${allProducts.map(p => `<option value="${p._id}" data-price="${p.precio}" data-name="${p.nombre}" data-size="${p.talla}">${p.nombre} - $${p.precio}</option>`).join('')}
        </select>
        <button type="button" class="btn btn-danger" onclick="removeProductFromOrder(this)">Remover</button>
    `;

    container.appendChild(productDiv);

    // Agregar event listener para calcular total
    productDiv.querySelector('.product-select').addEventListener('change', calculateOrderTotal);
}

// Remover producto del pedido
function removeProductFromOrder(button) {
    button.parentElement.remove();
    calculateOrderTotal();
}

// Calcular total del pedido
function calculateOrderTotal() {
    let total = 0;
    document.querySelectorAll('#orderProducts .product-select').forEach(select => {
        if (select.value) {
            const option = select.querySelector(`option[value="${select.value}"]`);
            total += parseFloat(option.getAttribute('data-price'));
        }
    });
    document.getElementById('orderTotal').value = total.toFixed(2);
}

// Crear pedido
document.getElementById('orderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const cliente = document.getElementById('orderClient').value;
    const total = parseFloat(document.getElementById('orderTotal').value);

    const productos = [];
    document.querySelectorAll('#orderProducts .product-select').forEach(select => {
        if (select.value) {
            const option = select.querySelector(`option[value="${select.value}"]`);
            productos.push({
                nombre: option.getAttribute('data-name'),
                precio: parseFloat(option.getAttribute('data-price')),
                talla: option.getAttribute('data-size')
            });
        }
    });

    if (productos.length === 0) {
        alert('Debe agregar al menos un producto');
        return;
    }

    try {
        const response = await fetch(API_BASE_ORDERS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cliente, productos, total })
        });
        if (!response.ok) throw new Error('Error al crear pedido');
        loadOrders();
        document.getElementById('orderForm').reset();
        document.getElementById('orderProducts').innerHTML = '';
        document.getElementById('orderTotal').value = '';
    } catch (error) {
        console.error('Error:', error);
        alert('Error al crear pedido');
    }
});

// Eliminar pedido
async function deleteOrder(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar este pedido?')) return;

    try {
        const response = await fetch(`${API_BASE_ORDERS}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Error al eliminar pedido');
        loadOrders();
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar pedido');
    }
}