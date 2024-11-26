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

// Obtenemos los elementos del DOM relacionados con los filtros
const petTypeFilters = document.querySelectorAll('input[name="pet-type"]');
const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');
const filterPriceBtn = document.getElementById('filter-price-btn');
const sortOptions = document.getElementById('sort-options');
const marketplaceGrid = document.querySelector('.marketplace-grid');

// Variable para almacenar la lista completa de mascotas (sin filtrar)
let allPets = [];

// Cargar todas las tarjetas de mascotas
function loadPets() {
    const petCards = document.querySelectorAll('.product-card');
    return Array.from(petCards).map(card => ({
        element: card,
        type: card.querySelector('.product-title').textContent.toLowerCase().includes('gato') ? 'cat' : 'dog',
        price: parseFloat(card.querySelector('.product-price').textContent.replace('$', '').replace(',', '')),
        inStock: card.getAttribute('data-stock') === 'true',
        name: card.querySelector('.product-title').textContent
    }));
}

// Renderiza las tarjetas de mascotas basadas en un conjunto de datos
function renderPets(filteredPets) {
    marketplaceGrid.innerHTML = ''; // Limpia el contenedor
    if (filteredPets.length === 0) {
        marketplaceGrid.innerHTML = '<p>No hay mascotas que coincidan con los filtros seleccionados.</p>';
        return;
    }
    filteredPets.forEach(pet => {
        marketplaceGrid.appendChild(pet.element);
    });
}

// Filtrar por tipo de mascota
function filterByPetType(pets, selectedType) {
    if (selectedType === 'all') return pets;
    return pets.filter(pet => pet.type === selectedType);
}

// Filtrar por rango de precios
function filterByPriceRange(pets, minPrice, maxPrice) {
    return pets.filter(pet => pet.price >= minPrice && pet.price <= maxPrice);
}

// Ordenar las tarjetas según el criterio seleccionado
function sortPets(pets, sortOption) {
    const sortedPets = [...pets];
    switch (sortOption) {
        case 'price-asc':
            sortedPets.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sortedPets.sort((a, b) => b.price - a.price);
            break;
        case 'alpha-asc':
            sortedPets.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'alpha-desc':
            sortedPets.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            break; // Sin cambios
    }
    return sortedPets;
}

// Función principal para aplicar filtros y ordenamiento
function applyFiltersAndSort() {
    let filteredPets = [...allPets]; // Siempre comenzamos con todas las mascotas

    // Obtener valores de los filtros
    const selectedPetType = document.querySelector('input[name="pet-type"]:checked').value;
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
    const selectedSortOption = sortOptions.value;

    // Aplicar filtros
    filteredPets = filterByPetType(filteredPets, selectedPetType);
    filteredPets = filterByPriceRange(filteredPets, minPrice, maxPrice);

    // Ordenar las mascotas filtradas
    const sortedPets = sortPets(filteredPets, selectedSortOption);

    // Renderizar las tarjetas filtradas y ordenadas
    renderPets(sortedPets);
}

// Configurar listeners para filtros y opciones de ordenamiento
petTypeFilters.forEach(filter => {
    filter.addEventListener('change', applyFiltersAndSort);
});

filterPriceBtn.addEventListener('click', applyFiltersAndSort);
sortOptions.addEventListener('change', applyFiltersAndSort);

// Inicializar la lista completa y renderizar la vista inicial
document.addEventListener('DOMContentLoaded', () => {
    allPets = loadPets(); // Carga todas las mascotas al inicio
    applyFiltersAndSort(); // Renderiza la vista inicial
});
