document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Evitar recarga de la página

    const email = document.getElementById("email").value.trim();
    const contraseña = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error-message");

    // Validar que los campos no estén vacíos
    if (!email || !contraseña) {
        errorMessage.textContent = "Por favor, llena ambos campos.";
        errorMessage.style.display = "block";
        return;
    }

    // Validación de formato de email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        errorMessage.textContent = "Por favor, ingresa un correo electrónico válido.";
        errorMessage.style.display = "block";
        return;
    }

    try {
        const response = await fetch("http://167.114.114.208:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, contraseña }),
        });

        const data = await response.json();

        if (response.ok) {
            // Si el inicio de sesión es exitoso, guardar el token en localStorage
            localStorage.setItem("authToken", data.token);  // Aquí guardas el token

            alert("Inicio de sesión exitoso");
            // Redirigir al perfil u otra página protegida
            window.location.href = "/pages/perfil/perfil.html"; 
        } else {
            // Si el servidor responde con un error
            errorMessage.textContent = data.error || "Error desconocido. Intenta más tarde.";
            errorMessage.style.display = "block";
        }
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        errorMessage.textContent = "Hubo un problema. Inténtalo más tarde.";
        errorMessage.style.display = "block";
    }
});
