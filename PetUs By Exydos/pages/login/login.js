document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del formulario

        // Captura los valores de los campos
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // Enviar datos al servidor
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json(); // Parsear la respuesta del servidor

            if (response.ok) {
                // Credenciales correctas
                alert(data.message); // Mensaje de éxito
                window.location.href = '/index.html'; // Redirigir al index
            } else {
                // Credenciales incorrectas
                errorMessage.textContent = data.message || 'Credenciales inválidas.';
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
            errorMessage.textContent = 'Hubo un problema al conectar con el servidor.';
            errorMessage.style.display = 'block';
        }
    });
});
