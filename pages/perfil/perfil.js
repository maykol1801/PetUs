// perfil.js

// Función para cargar los datos del perfil al cargar la página
window.onload = function () {
    // Verificar si hay sesión activa y cargar los datos del perfil
    fetch('/perfil', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.status === 401) {
            // Si no hay sesión, redirigir al login
            window.location.href = 'pages/login/login.html';
        }
        return response.json();
    })
    .then(data => {
        // Si la sesión está activa, mostrar los datos del perfil
        if (data) {
            document.getElementById('nombre').textContent = data.nombre;
            document.getElementById('nombre_usuario').textContent = data.nombre_usuario;
            document.getElementById('email').textContent = data.email;
            document.getElementById('telefono').textContent = data.telefono || 'No disponible';
            document.getElementById('fecha_nacimiento').textContent = data.fecha_nacimiento;
            document.getElementById('fecha_registro').textContent = data.fecha_registro;
            
            // Mostrar la foto de perfil (si existe)
            if (data.foto_perfil) {
                document.getElementById('foto_perfil').src = `/uploads/${data.foto_perfil}`;
            } else {
                document.getElementById('foto_perfil').src = '/imagenes/imagen_por_defecto.jpg'; // Foto predeterminada
            }
        }
    })
    .catch(error => {
        console.error('Error al cargar el perfil:', error);
    });
};

// Función para actualizar la foto de perfil
function actualizarFotoPerfil(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario (recarga de página)
    
    const formData = new FormData();
    const fileInput = document.getElementById('foto_input');
    
    if (fileInput.files.length > 0) {
        formData.append('foto_perfil', fileInput.files[0]);
        
        fetch('/perfil/actualizar-foto', {
            method: 'PUT',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Foto de perfil actualizada con éxito.') {
                // Actualizar la imagen mostrada
                document.getElementById('foto_perfil').src = `/uploads/${data.foto_perfil}`;
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

// Función para actualizar otros datos del perfil
function actualizarPerfil(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario
    
    const nombre = document.getElementById('nombre_input').value;
    const telefono = document.getElementById('telefono_input').value;
    
    fetch('/perfil', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre_completo: nombre,
            telefono: telefono,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Perfil actualizado con éxito.') {
            alert('Perfil actualizado correctamente');
            window.location.reload(); // Recargar la página para ver los cambios
        } else {
            alert('Error al actualizar el perfil');
        }
    })
    .catch(error => {
        console.error('Error al actualizar el perfil:', error);
    });
}
