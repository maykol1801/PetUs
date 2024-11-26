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
            alert("Inicio de sesión exitoso");
            // Redirigir al usuario
            window.location.href = "/index.html";
        } else {
            errorMessage.textContent = data.error || "Error desconocido. Intenta más tarde.";
            errorMessage.style.display = "block";
        }
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        errorMessage.textContent = "Hubo un problema. Inténtalo más tarde.";
        errorMessage.style.display = "block";
    }
});
