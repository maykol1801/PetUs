// mailer.js
const nodemailer = require('nodemailer');

// Configuración del transportador de Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: 'noreply@petus.lat',
        pass: 'Noreply132!',
    },
});

/**
 * Función para enviar un correo de confirmación de compra.
 * @param {string} email - Correo del cliente.
 * @param {string} nombre_completo - Nombre completo del cliente.
 * @param {Array} productos - Lista de productos comprados.
 */
const enviarCorreoConfirmacion = (email, nombre_completo, productos) => {
    let resumenOrden = `
        <h3>Resumen de la Orden</h3>
        <p>Gracias por tu compra, <strong>${nombre_completo}</strong>! Aquí está el resumen de tu orden:</p>
        <ul>
    `;

    // Iterar sobre los productos para agregar los detalles
    productos.forEach((producto) => {
        resumenOrden += `
            <li>
                <strong>Producto:</strong> ${producto.nombre} <br>
                <strong>Cantidad:</strong> ${producto.cantidad} <br>
                <strong>Precio:</strong> $${producto.precio} <br>
                <strong>Total:</strong> $${producto.total} <br>
            </li>
        `;
    });

    resumenOrden += '</ul>';
    resumenOrden += `<p><strong>Total: $${productos.reduce((total, producto) => total + producto.total, 0)}</strong></p>`;

    // Configuración del correo
    const mailOptions = {
        from: 'noreply@petus.lat', // Dirección del correo del remitente
        to: email, // Dirección de correo del cliente
        subject: 'Confirmación de Compra - PetUs',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                <div style="background-color: #ff7f50; color: white; padding: 20px; text-align: center;">
                    <h1 style="margin: 0; font-size: 24px;">¡Gracias por tu compra en PetUs!</h1>
                </div>
                <div style="padding: 20px;">
                    ${resumenOrden}
                    <p style="font-size: 16px; color: #555;">
                        Si tienes alguna pregunta, no dudes en contactarnos. Estamos aquí para ayudarte.
                    </p>
                </div>
                <div style="background-color: #f9f9f9; padding: 10px 20px; text-align: center; font-size: 12px; color: #999;">
                    <p style="margin: 0;">© 2024 PetUs. Todos los derechos reservados.</p>
                    <p style="margin: 5px 0;">
                        <a href="http://petus.lat" style="color: #999; text-decoration: none;">Visítanos en petus.lat</a>
                    </p>
                </div>
            </div>
        `
    };

    // Enviar el correo
    return transporter.sendMail(mailOptions);
};

// Exportar la función para ser utilizada en otros archivos
module.exports = { enviarCorreoConfirmacion };

