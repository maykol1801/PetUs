const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Configuración de conexión a SQL Server
const config = {
    user: 'petus_user', // Tu usuario de SQL Server
    password: 'petus1234', // Contraseña de tu usuario
    server: 'localhost', // Dirección del servidor
    database: 'petus', // Nombre de la base de datos
    options: {
        encrypt: false, // Cambia a `true` si usas SSL
        trustServerCertificate: true, // Necesario para entornos de desarrollo
    }
};

// Crear un pool de conexión global
let pool;

sql.connect(config)
    .then((p) => {
        pool = p;
        console.log('Conexión exitosa con la base de datos.');
    })
    .catch((err) => {
        console.error('Error al conectar a la base de datos:', err);
    });

// Ruta para autenticar usuarios
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verifica que la conexión esté activa
        if (!pool) {
            return res.status(500).send({ success: false, message: 'No hay conexión con la base de datos.' });
        }

        // Realiza la consulta a la base de datos
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .query('SELECT * FROM usuarios WHERE email = @email AND contraseña = @password');

        if (result.recordset.length > 0) {
            res.status(200).send({ success: true, message: 'Inicio de sesión exitoso.' });
        } else {
            res.status(401).send({ success: false, message: 'Credenciales incorrectas.' });
        }
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).send({ success: false, message: 'Error interno del servidor.' });
    }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
