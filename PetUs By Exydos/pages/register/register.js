document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre_completo = document.getElementById('nombre_completo').value;
        const nombre_usuario = document.getElementById('nombre_usuario').value;
        const fecha_nacimiento = document.getElementById('fecha_nacimiento').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const contraseña = document.getElementById('contraseña').value;

        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre_completo, nombre_usuario, fecha_nacimiento, email, telefono, contraseña })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message); // Mensaje de éxito
                window.location.href = '/login.html'; // Redirige al login
            } else {
                errorMessage.textContent = data.message || 'Error al registrar usuario.';
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
            errorMessage.textContent = 'Hubo un problema al conectar con el servidor.';
            errorMessage.style.display = 'block';
        }
    });
});
