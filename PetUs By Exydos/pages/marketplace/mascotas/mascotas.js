// Estado global del carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Ejecuta al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarBurbuja();
});

// Selecciona el ícono del carrito y crea un elemento para la burbuja
const carritoIcono = document.querySelector('.cart-icon');
if (carritoIcono) {
    const burbuja = document.createElement('span');
    burbuja.classList.add('cart-bubble');
    carritoIcono.appendChild(burbuja);
    actualizarBurbuja();
}

// Función para actualizar la burbuja del carrito
function actualizarBurbuja() {
    const totalArticulos = carrito.reduce((total, item) => total + item.cantidad, 0);

    // Verifica si la burbuja ya existe, si no, la crea
    let burbuja = document.querySelector('.cart-bubble');
    if (!burbuja) {
        burbuja = document.createElement('span');
        burbuja.classList.add('cart-bubble');
        carritoIcono.appendChild(burbuja);
    }

    // Actualiza el contenido y visibilidad de la burbuja
    burbuja.textContent = totalArticulos;
    burbuja.style.display = totalArticulos > 0 ? 'block' : 'none';
}

// Agrega la funcionalidad "Añadir al carrito" en cada botón
const botonesAgregar = document.querySelectorAll('.add-to-cart-btn');
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
        const tarjeta = boton.closest('.product-card');
        const titulo = tarjeta.querySelector('.product-title').textContent;
        const precio = parseFloat(
            tarjeta.querySelector('.product-price').textContent.replace('$', '')
        ); // Convierte el precio a número
        const inputCantidad = tarjeta.querySelector('.quantity-input');
        const cantidad = parseInt(inputCantidad.value) || 1;

        // Verifica si el producto ya está en el carrito
        const productoExistente = carrito.find(item => item.titulo === titulo);
        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            carrito.push({ titulo, precio, cantidad });
        }

        // Guarda en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Actualiza la burbuja
        actualizarBurbuja();

        // Reinicia el input de cantidad
        inputCantidad.value = 1;

        alert(`${cantidad} x "${titulo}" añadido(s) al carrito.`);
    });
});

// Redirige al checkout al hacer clic en el ícono del carrito
if (carritoIcono) {
    carritoIcono.addEventListener('click', () => {
        window.location.href = '/pages/checkout/checkout.html';
    });
}
