window.onload = function () {
    const authToken = localStorage.getItem("authToken"); // Recuperamos el token de localStorage

    if (!authToken) {
        // Si no hay token (usuario no ha iniciado sesión), redirigir al login
        window.location.href = '/pages/login/login.html';
    } else {
        // Si hay un token, realizar la petición al backend para obtener los datos del perfil
        fetch('/perfil', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`  // Pasamos el token de autorización en el encabezado
            },
        })
        .then(response => {
            // Revisar el tipo de respuesta
            console.log("Respuesta recibida:", response);
            if (response.status === 401) {
                // Si no hay sesión válida, redirigir al login
                window.location.href = '/pages/login/login.html';
            } else if (response.status !== 200) {
                return response.text();  // Leer la respuesta como texto si no es JSON
            }
            return response.json();  // Si es JSON, procesar como tal
        })
        .then(data => {
            if (typeof data === 'string') {
                // Si la respuesta no es JSON, mostrar el error y parar la ejecución
                console.error("Error en la respuesta del servidor:", data);
                alert("Hubo un problema al cargar el perfil. Por favor, intente más tarde.");
                return;
            }

            // Si la sesión está activa, mostrar los datos del perfil
            if (data) {
                document.getElementById('profile-name').textContent = data.nombre_completo;
                document.getElementById('profile-email-info').textContent = data.email;
                document.getElementById('profile-phone').textContent = data.telefono || 'No disponible';
                document.getElementById('profile-dob').textContent = data.fecha_nacimiento;
                document.getElementById('profile-registration-date').textContent = data.fecha_registro;

                // Mostrar la foto de perfil (si existe)
                if (data.foto_perfil) {
                    document.getElementById('profile-image').src = `/uploads/${data.foto_perfil}`;
                } else {
                    document.getElementById('profile-image').src = '/imagenes/imagen_por_defecto.jpg'; // Foto predeterminada
                }
            }
        })
        .catch(error => {
            console.error('Error al cargar el perfil:', error);
        });
    }
};
