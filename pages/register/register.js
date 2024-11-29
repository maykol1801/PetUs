document.getElementById("register-form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

    const nombre_completo = document.getElementById("nombre_completo").value;
    const nombre_usuario = document.getElementById("nombre_usuario").value;
    const fecha_nacimiento = document.getElementById("fecha_nacimiento").value;
    const email = document.getElementById("email").value;
    const contraseña = document.getElementById("contraseña").value;
    const telefono = document.getElementById("telefono").value;
    const errorMessage = document.getElementById("error-message");

    // Validar la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(contraseña)) {
        errorMessage.textContent = "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo.";
        errorMessage.style.display = "block";
        return;
    }

    try {
        // Usamos HTTPS en la URL para evitar el problema de contenido mixto
        // Usamos la URL absoluta con el dominio completo para evitar problemas si se ejecuta en diferentes entornos
        const response = await fetch("https://petus.lat/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre_completo,
                nombre_usuario,
                fecha_nacimiento,
                email,
                contraseña,
                telefono,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Usuario registrado exitosamente. Ahora puedes iniciar sesión.");
            window.location.href = "/pages/login/login.html"; // Redirige a la página de login
        } else {
            errorMessage.textContent = data.error;
            errorMessage.style.display = "block"; // Muestra el mensaje de error si ocurre
        }
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        errorMessage.textContent = "Hubo un problema. Inténtalo más tarde.";
        errorMessage.style.display = "block"; // Muestra mensaje si falla la conexión
    }
});
