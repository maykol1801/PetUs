// Verifica si el carrito está almacenado en localStorage; si no, lo inicializa
if (!localStorage.getItem('carrito')) {
    localStorage.setItem('carrito', JSON.stringify([])); // Carrito vacío por defecto
}

// Configura el evento para redirigir al checkout
document.addEventListener('DOMContentLoaded', () => {
    const carritoIcono = document.querySelector('.cart-icon');

    // Verifica si el ícono del carrito existe en la página
    if (carritoIcono) {
        carritoIcono.addEventListener('click', () => {
            window.location.href = '/pages/checkout/checkout.html'; // Redirige al checkout
        });

        // Actualiza la burbuja del carrito
        const burbuja = document.createElement('span');
        burbuja.classList.add('cart-bubble');
        carritoIcono.appendChild(burbuja);
        actualizarBurbuja();
    }
});

// Función para actualizar la burbuja del carrito
function actualizarBurbuja() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalArticulos = carrito.reduce((total, item) => total + item.cantidad, 0);
    const burbuja = document.querySelector('.cart-bubble');

    if (burbuja) {
        burbuja.textContent = totalArticulos;
        burbuja.style.display = totalArticulos > 0 ? 'block' : 'none';
    }
}
