
// ----------- CARRUSEL -----------
const slides = document.querySelectorAll('.carousel-slide'); // Selección de las diapositivas
const prevButton = document.querySelector('.prev'); // Botón anterior
const nextButton = document.querySelector('.next'); // Botón siguiente
let currentSlide = 0;
let autoSlideInterval; // Variable para manejar el carrusel automático

// Función para mostrar la diapositiva actual
function showSlide(index) {
    // Ocultar todas las diapositivas
    slides.forEach((slide) => {
        slide.classList.remove('active');
    });
    // Mostrar la diapositiva seleccionada
    slides[index].classList.add('active');
}

// Función para cambiar a la siguiente diapositiva
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length; // Avanzar al siguiente (cálculo circular)
    showSlide(currentSlide);
}

// Función para cambiar a la diapositiva previa
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Retroceder al anterior (cálculo circular)
    showSlide(currentSlide);
}

// Inicializar el carrusel automático
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000); // Cambiar cada 5 segundos
}

// Detener el carrusel automático
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Listeners para los botones
prevButton.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide(); // Detener el carrusel automático al interactuar
    startAutoSlide(); // Reiniciar el carrusel automático
});

nextButton.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide(); // Detener el carrusel automático al interactuar
    startAutoSlide(); // Reiniciar el carrusel automático
});

// Iniciar el carrusel automático al cargar
startAutoSlide();

// ----------- SECCIONES DINÁMICAS -----------
const featureItems = document.querySelectorAll('.feature-item'); // Los cuadros clicables
const introSections = document.querySelectorAll('.intro-section'); // Todas las secciones de intro

// Función para cambiar entre las secciones con animación
function showIntroSection(type) {
    // Ocultar todas las secciones con animación de salida
    introSections.forEach((section) => {
        section.classList.add('fade-out'); // Clase de salida
        setTimeout(() => {
            section.classList.add('hidden'); // Ocultar después de la animación
            section.classList.remove('fade-out'); // Quitar clase de salida
        }, 500); // Duración de la animación de desvanecimiento
    });

    // Mostrar la sección seleccionada con animación de entrada
    const selectedSection = document.getElementById(`intro-${type}`);
    if (selectedSection) {
        setTimeout(() => {
            selectedSection.classList.remove('hidden'); // Quitar clase de ocultar
            selectedSection.classList.add('fade-in'); // Clase de entrada
            setTimeout(() => {
                selectedSection.classList.remove('fade-in'); // Quitar clase después de la entrada
            }, 500); // Duración de la animación de desvanecimiento
        }, 500); // Esperar a que terminen las animaciones de salida
    }
}

// Agregar eventos de clic a los cuadros
featureItems.forEach((item) => {
    item.addEventListener('click', () => {
        const bannerType = item.getAttribute('data-banner'); // Obtener el tipo (calidad, envios, soporte)
        showIntroSection(bannerType); // Cambiar a la sección correspondiente
    });
});
