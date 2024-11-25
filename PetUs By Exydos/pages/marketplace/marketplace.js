// Estado global del carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Recupera el carrito almacenado

// Selecciona el ícono del carrito y crea la burbuja de artículos
const carritoIcono = document.querySelector('.cart-icon');
const burbuja = document.createElement('span');
burbuja.classList.add('cart-bubble');
carritoIcono.appendChild(burbuja);
actualizarBurbuja();

// Actualiza el número de artículos en la burbuja
function actualizarBurbuja() {
    const totalArticulos = carrito.reduce((total, item) => total + item.cantidad, 0); // Total de artículos
    burbuja.textContent = totalArticulos; // Actualiza el texto de la burbuja
    burbuja.style.display = totalArticulos > 0 ? 'block' : 'none'; // Muestra u oculta la burbuja
}

// Agrega la funcionalidad "Añadir al carrito" a cada botón
const botonesAgregar = document.querySelectorAll('.add-to-cart-btn');
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
        const tarjeta = boton.closest('.product-card'); // Encuentra la tarjeta correspondiente
        const titulo = tarjeta.querySelector('.product-title').textContent; // Obtiene el título del producto
        const precio = tarjeta.querySelector('.product-price').textContent; // Obtiene el precio del producto
        const inputCantidad = tarjeta.querySelector('.quantity-input'); // Obtiene la cantidad seleccionada
        const cantidad = parseInt(inputCantidad.value) || 1; // Convierte la cantidad a número o usa 1 por defecto

        // Verifica si el producto ya está en el carrito
        const productoExistente = carrito.find(item => item.titulo === titulo);
        if (productoExistente) {
            productoExistente.cantidad += cantidad; // Incrementa la cantidad si ya existe
        } else {
            carrito.push({ titulo, precio, cantidad }); // Agrega un nuevo producto
        }

        // Guarda el carrito actualizado en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Actualiza la burbuja
        actualizarBurbuja();

        // Reinicia el input de cantidad
        inputCantidad.value = 1;

        // Notifica al usuario
        alert(`${cantidad} x "${titulo}" añadido(s) al carrito.`);
    });
});

// Redirige al checkout al hacer clic en el ícono del carrito
carritoIcono.addEventListener('click', () => {
    window.location.href = '/pages/checkout/checkout.html'; // Redirige a la página de checkout
});
