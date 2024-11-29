const express = require('express'); // Importa Express
const bodyParser = require('body-parser'); // Importa Body-Parser
const mysql = require('mysql2');
const bcrypt = require('bcrypt'); // Importa bcrypt
const nodemailer = require('nodemailer'); // Importa Nodemailer
const cors = require('cors'); // Importa cors

// Inicializa Express
const app = express(); // Asegúrate de que esta línea esté antes de cualquier uso de `app`
const port = 3000; // Define el puerto donde correrá el servidor
app.use(bodyParser.urlencoded({ extended: true })); // Para datos de formularios

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



const jwt = require('jsonwebtoken'); // Importa jsonwebtoken para crear tokens

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

        // Generar un token JWT. Puedes agregar más información en el payload si es necesario (por ejemplo, el nombre del usuario).
        const token = jwt.sign(
            { id: user.id, email: user.email }, // Payload del token (datos que el token llevará)
            'Petus123!', // Esta es la clave secreta que usas para firmar el token
            { expiresIn: '1h' } // El token expirará en 1 hora
        );

        // Enviar el token al cliente
        res.status(200).json({ 
            message: 'Inicio de sesión exitoso', 
            token // Envía el token al cliente
        });
    });
});


// Ruta para obtener los datos del perfil (GET)
app.get('/perfil', (req, res) => {
    // Obtener el token del encabezado 'Authorization'
    const token = req.headers['authorization']?.split(' ')[1]; // Token en formato 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ error: 'No autorizado, el token es requerido.' });
    }

    // Verificar el token
    jwt.verify(token, 'Petus123!', (err, decoded) => {
        if (err) {
            console.error('Error al verificar el token:', err);
            return res.status(401).json({ error: 'Token inválido o expirado' });
        }

        const userId = decoded.id; // Usar el id extraído del token

        // Consultar los datos del usuario en la base de datos
        const query = 'SELECT * FROM usuarios WHERE id = ?';
        db.query(query, [userId], (err, results) => {
            if (err) {
                console.error('Error al obtener los datos del usuario:', err);
                return res.status(500).json({ error: 'Error al obtener los datos del perfil' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            const user = results[0]; // El primer resultado es el usuario encontrado

            // Enviar los datos del perfil
            res.json({
                nombre_completo: user.nombre,
                nombre_usuario: user.nombre_usuario,
                email: user.email,
                telefono: user.telefono,
                fecha_nacimiento: user.fecha_nacimiento,
                fecha_registro: user.fecha_registro,
                foto_perfil: user.foto_perfil
            });
        });
    });
});




// Ruta para procesar la compra y enviar correo de confirmación
app.post('/procesar-compra', (req, res) => {
    // Asegúrate de que los campos están siendo desestructurados correctamente
    const { email, nombre_completo, direccion, ciudad, pais, codigo_postal, telefono, productos, total } = req.body;

    // Parsear 'productos' para asegurarte de que es un arreglo
    const productosParsed = JSON.parse(productos);

    console.log('Datos de la compra:', req.body);

    // Validar los campos necesarios
    if (!email || !nombre_completo || !direccion || !ciudad || !pais || !codigo_postal || !telefono || !productosParsed || productosParsed.length === 0) {
        return res.status(400).json({ error: 'Faltan datos en la compra.' });
    }

    // Crear el resumen de la compra
    let resumenOrden = ` 
        <h3>Resumen de la Orden</h3>
        <p>Gracias por tu compra, <strong>${nombre_completo}</strong>! Aquí está el resumen de tu orden:</p>
        <p><strong>Dirección de Envío:</strong><br>
           ${direccion}, ${ciudad}, ${codigo_postal}, ${pais}<br>
           <strong>Teléfono:</strong> ${telefono}<br>
        </p>
        <ul>
    `;

    let totalOrden = 0;
    productosParsed.forEach((producto) => {
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
        res.redirect('/pages/checkout/thankyou.html');
    });
});





// Ruta para manejar el formulario de contacto
app.post('/send-contact-email', async (req, res) => {
    console.log("Recibiendo solicitud para enviar correo de contacto...");
    
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        console.error("Campos faltantes en el formulario de contacto:", req.body);
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    console.log("Datos del formulario de contacto:", req.body);

    // Configuramos el correo de confirmación para el usuario
    const mailOptions = {
        from: 'noreply@petus.lat',
        to: email,
        subject: 'Estamos trabajando en resolver tu solicitud',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                <div style="background-color: #ff7f50; color: white; padding: 20px; text-align: center;">
                    <h1 style="margin: 0; font-size: 24px;">¡Gracias por contactarnos!</h1>
                </div>
                <div style="padding: 20px;">
                    <p style="font-size: 16px; color: #555;">
                        Hola, <strong>${name}</strong>:
                    </p>
                    <p style="font-size: 16px; color: #555; line-height: 1.6;">
                        Gracias por ponerte en contacto con nosotros. Hemos recibido tu mensaje y nuestro equipo está trabajando para resolver tu solicitud. Te responderemos a la brevedad posible.
                    </p>
                    <p style="font-size: 16px; color: #555;">
                        Tu mensaje: <br>
                        <i>"${message}"</i>
                    </p>
                    <p style="font-size: 14px; color: #999; line-height: 1.6;">
                        Si tienes más preguntas, no dudes en escribirnos nuevamente.
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

    try {
        // Esperamos a que el correo sea enviado
        console.log("Enviando correo...");
        await new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error al enviar el correo:', error);
                    reject(error);  // Si hay un error, rechazamos la promesa
                } else {
                    console.log('Correo enviado:', info.response);
                    resolve(info);  // Si el correo se envía correctamente, resolvemos la promesa
                }
            });
        });

        // Si el correo se envió correctamente, redirigimos al usuario a la página de ticket
        console.log("Correo enviado correctamente, redirigiendo...");
        res.redirect("/pages/contacto/ticketregistrado/ticket.html");
    } catch (error) {
        console.error('Error al enviar el correo de contacto:', error);
        res.status(500).json({ error: 'Error al enviar el correo de confirmación.' });
    }
});



// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});