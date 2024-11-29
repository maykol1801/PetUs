window.onload = function () {
    // Verificar si el usuario está logueado
    const authToken = localStorage.getItem("authToken");

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
                    document.getElementById('profile-image').src = '/imagenes/ppdefault.jpg'; // Foto predeterminada
                }
            }
        })
        .catch(error => {
            console.error('Error al cargar el perfil:', error);
        });
    }

    // Función para mostrar la previsualización de la imagen
    function mostrarPrevia(event) {
        const file = event.target.files[0]; // Obtener el primer archivo
        if (file) {
            const reader = new FileReader(); // Crear un objeto FileReader
            reader.onload = function(e) {
                // Establecer la imagen en el elemento de la foto de perfil
                document.getElementById('profile-image').src = e.target.result;
            }
            reader.readAsDataURL(file); // Leer el archivo como una URL de datos
        }
    }

    // Asociar el evento onchange al input de archivo para mostrar la previsualización
    const fotoPerfilInput = document.getElementById('foto_perfil');
    if (fotoPerfilInput) {
        fotoPerfilInput.addEventListener('change', mostrarPrevia);
    }

    // Función para subir la foto
    function subirFoto() {
        const fileInput = document.getElementById('foto_perfil');
        const formData = new FormData();

        if (fileInput.files.length > 0) {
            formData.append('foto_perfil', fileInput.files[0]);

            const authToken = localStorage.getItem("authToken");

            fetch('/perfil/actualizar-foto', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Foto de perfil actualizada con éxito.') {
                    // Actualizar la imagen mostrada
                    document.getElementById('profile-image').src = `/uploads/${data.foto_perfil}`;
                    alert('Foto de perfil actualizada correctamente');
                } else {
                    alert('Error al actualizar la foto');
                }
            })
            .catch(error => {
                console.error('Error al actualizar la foto:', error);
            });
        } else {
            alert('Por favor, selecciona una foto');
        }
    }

    // Asociar el evento de clic al botón de "Guardar Foto" (usando el ID del botón)
    const guardarFotoBtn = document.getElementById('guardarFotoBtn');
    if (guardarFotoBtn) {
        guardarFotoBtn.addEventListener('click', subirFoto);
    }
};
