const express = require('express'); // Importa Express
const bodyParser = require('body-parser'); // Importa Body-Parser
const mysql = require('mysql2');
const bcrypt = require('bcrypt'); // Importa bcrypt
const nodemailer = require('nodemailer'); // Importa Nodemailer
const cors = require('cors'); // Importa cors

// Inicializa Express
const app = express(); // Asegúrate de que esta línea esté antes de cualquier uso de `app`
const port = 3000; // Define el puerto donde correrá el servidor

// Middleware para manejar JSON y CORS
app.use(bodyParser.json()); // Parsear cuerpo de las solicitudes como JSON
app.use(cors()); // Permitir todas las solicitudes

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'petus_user',
    password: 'petus_1234@@',
    database: 'petus',
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});

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

// Ruta para manejar el registro de usuarios
app.post('/register', async (req, res) => {
    try {
        const { nombre_completo, nombre_usuario, fecha_nacimiento, email, contraseña, telefono } = req.body;

        // Validar campos obligatorios
        if (!nombre_completo || !nombre_usuario || !fecha_nacimiento || !email || !contraseña) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        // Validar si la fecha de nacimiento es válida
        const fechaValida = new Date(fecha_nacimiento).toString() !== 'Invalid Date';
        if (!fechaValida || new Date(fecha_nacimiento) > new Date()) {
            return res.status(400).json({ error: 'Fecha de nacimiento inválida.' });
        }

        console.log("Datos recibidos en el registro:", req.body);

        // Validar si el usuario ya existe
        const queryCheck = 'SELECT * FROM usuarios WHERE email = ? OR nombre_usuario = ?';
        db.query(queryCheck, [email, nombre_usuario], async (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error en el servidor.' });
            }
            if (results.length > 0) {
                return res.status(409).json({ error: 'El usuario o correo ya está registrado.' });
            }

            // Cifrar la contraseña
            const hashedPassword = await bcrypt.hash(contraseña, 10);

            // Insertar el nuevo usuario
            const queryInsert = `
                INSERT INTO usuarios (nombre, nombre_usuario, fecha_nacimiento, email, contraseña, telefono, foto_perfil)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            db.query(queryInsert, [nombre_completo, nombre_usuario, fecha_nacimiento, email, hashedPassword, telefono || '', null], (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al registrar el usuario.' });
                }

                // Configurar el contenido del correo
                const mailOptions = {
                    from: 'noreply@petus.lat',
                    to: email,
                    subject: '¡Bienvenido a PetUs!',
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                            <div style="background-color: #ff7f50; color: white; padding: 20px; text-align: center;">
                                <h1 style="margin: 0; font-size: 24px;">¡Bienvenido a PetUs!</h1>
                            </div>
                            <div style="padding: 20px;">
                                <p style="font-size: 16px; color: #555;">
                                    Hola, <strong>${nombre_completo}</strong>:
                                </p>
                                <p style="font-size: 16px; color: #555; line-height: 1.6;">
                                    Gracias por registrarte en <strong>PetUs</strong>. Estamos emocionados de tenerte como parte de nuestra comunidad. ¡Explora nuestras funcionalidades, descubre productos increíbles y conecta con otros amantes de las mascotas!
                                </p>
                                <div style="text-align: center; margin: 30px 0;">
                                    <a href="http://petus.lat/login" style="background-color: #ff7f50; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; font-size: 16px; display: inline-block;">
                                        Inicia Sesión Ahora
                                    </a>
                                </div>
                                <p style="font-size: 14px; color: #999; line-height: 1.6;">
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
                    `,
                };
                

                // Enviar el correo de bienvenida
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error al enviar el correo:', error);
                    } else {
                        console.log('Correo enviado:', info.response);
                    }
                });

                // Responder al cliente
                res.status(201).json({ message: 'Usuario registrado correctamente. Por favor, inicia sesión.' });
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud.' });
    }
});

app.post('/login', (req, res) => {
    const { email, contraseña } = req.body;

    // Validar campos obligatorios
    if (!email || !contraseña) {
        console.log("Campos faltantes en el cuerpo de la solicitud:", req.body);
        return res.status(400).json({ error: 'El correo y la contraseña son obligatorios.' });
    }

    console.log("Intento de inicio de sesión con los datos:", req.body);

    const query = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Error en la consulta a la base de datos:', err);
            return res.status(500).json({ error: 'Error en el servidor.' });
        }

        if (results.length === 0) {
            console.log("Usuario no encontrado:", email);
            return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(contraseña, user.contraseña);

        if (!passwordMatch) {
            console.log("Contraseña incorrecta para el usuario:", email);
            return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
        }

        console.log("Inicio de sesión exitoso para el usuario:", email);
        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    });
});



// Ruta para procesar la compra y enviar correo de confirmación
app.post('/procesar-compra', (req, res) => {
    const { email, nombre_completo, productos } = req.body;

    console.log('Datos de la compra:', req.body);

    // Validar los campos necesarios
    if (!email || !productos || productos.length === 0) {
        return res.status(400).json({ error: 'Faltan datos en la compra.' });
    }

    // Crear el resumen de la compra
    let resumenOrden = `
        <h3>Resumen de la Orden</h3>
        <p>Gracias por tu compra, <strong>${nombre_completo}</strong>! Aquí está el resumen de tu orden:</p>
        <ul>
    `;
    let totalOrden = 0;
    productos.forEach((producto) => {
        const totalProducto = producto.precio * producto.cantidad;
        resumenOrden += `
            <li>
                <strong>Producto:</strong> ${producto.nombre} <br>
                <strong>Cantidad:</strong> ${producto.cantidad} <br>
                <strong>Precio:</strong> $${producto.precio} <br>
                <strong>Total:</strong> $${totalProducto} <br>
            </li>
        `;
        totalOrden += totalProducto;
    });
    resumenOrden += `</ul><p><strong>Total: $${totalOrden}</strong></p>`;

    // Configuración del correo
    const mailOptions = {
        from: 'noreply@petus.lat',
        to: email,
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
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
            return res.status(500).json({ error: 'Error al enviar el correo de confirmación.' });
        }
        console.log('Correo enviado:', info.response);
        
        // Redirigir al cliente a la página de agradecimiento
        res.status(200).json({ message: 'Compra procesada y correo enviado.' });
    });
});





// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});