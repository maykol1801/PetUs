// Función para renderizar los productos en el carrito
function renderCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('carrito')) || []; // Cargar datos actualizados del carrito
    const cartSummary = document.getElementById('cart-summary');
    cartSummary.innerHTML = ''; // Limpia el contenido anterior

    if (cartItems.length === 0) {
        cartSummary.innerHTML = '<p>Tu carrito está vacío.</p>';
        updateSummaryTotals(); // Asegurarse de mostrar totales en 0
        return;
    }

    // Iterar sobre los artículos del carrito
    cartItems.forEach((item) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';

        // Renderizar el producto
        const itemTotal = (item.precio * item.cantidad).toFixed(2); // Calcular total por producto
        itemElement.innerHTML = `
            <div>
                <strong>${item.titulo}</strong> x ${item.cantidad}<br>
                Precio unitario: $${item.precio.toFixed(2)}<br>
                Total: $${itemTotal}
            </div>
            <button class="remove-item-btn" data-titulo="${item.titulo}">Eliminar</button>
        `;

        cartSummary.appendChild(itemElement);
    });

    updateSummaryTotals(); // Actualizar los totales después de renderizar los productos
}

// Función para calcular y mostrar el subtotal, impuestos, envío y total
function updateSummaryTotals() {
    const cartItems = JSON.parse(localStorage.getItem('carrito')) || []; // Cargar datos actualizados del carrito
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
    );
    const shipping = subtotal > 0 ? 50 : 0; // Costo de envío fijo
    const taxes = subtotal * 0.15; // Impuestos del 15%
    const total = subtotal + shipping + taxes;

    // Actualizar los valores en el DOM
    document.querySelector('#subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('#shipping').textContent = `$${shipping.toFixed(2)}`;
    document.querySelector('#taxes').textContent = `$${taxes.toFixed(2)}`;
    document.querySelector('#total').textContent = `$${total.toFixed(2)}`;
}

// Función para eliminar un producto del carrito
function removeItemFromCart(productName) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.titulo !== productName);
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Renderizar nuevamente los productos y actualizar los totales
    renderCartItems();
}

// Listener para manejar la eliminación de productos
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item-btn')) {
        const productName = event.target.dataset.titulo;
        removeItemFromCart(productName);
    }
});

// Inicializar el botón de PayPal
function initializePayPalButton() {
    paypal.Buttons({
        // Configuración del botón
        createOrder: function (data, actions) {
            const totalAmount = document.querySelector('#total').textContent.replace('$', '').trim();

            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: totalAmount // Total dinámico basado en el resumen del carrito
                    }
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                alert('Pago completado con éxito por ' + details.payer.name.given_name);
                // Aquí puedes procesar la orden o redirigir al usuario
            });
        },
        onError: function (err) {
            console.error('Ocurrió un error con PayPal:', err);
            alert('Hubo un problema con el pago. Inténtalo de nuevo.');
        }
    }).render('#paypal-button-container'); // Renderizar dentro del contenedor
}

// Función para inicializar el checkout
function initCheckout() {
    renderCartItems(); // Renderiza los artículos en el carrito
    updateSummaryTotals(); // Actualiza los totales
    initializePayPalButton(); // Inicializa el botón de PayPal
}

// Asegúrate de que el DOM esté completamente cargado antes de ejecutar
document.addEventListener('DOMContentLoaded', initCheckout);
