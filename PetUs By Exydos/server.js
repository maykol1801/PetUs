const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database configuration
const dbConfig = {
  user: "petus_user",
  password: "petus1234",
  server: "localhost",
  database: "petus",
  options: {
    encrypt: false, // For local development
    enableArithAbort: true,
  },
};

// Connect to the database
let pool;
sql.connect(dbConfig)
  .then((connectionPool) => {
    pool = connectionPool;
    console.log("Conexión a la base de datos establecida.");
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
  });

// Login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, password)
      .query(
        "SELECT * FROM usuarios WHERE email = @email AND contraseña = @password"
      );

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas." });
    }

    res.status(200).json({ message: "Inicio de sesión exitoso." });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
});

// Register route
app.post("/api/register", async (req, res) => {
  const { nombre, nombre_usuario, fecha_nacimiento, email, contraseña, telefono } =
    req.body;

  try {
    // Check if email or username already exists
    const emailExists = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM usuarios WHERE email = @email");

    if (emailExists.recordset.length > 0) {
      return res.status(400).json({ message: "El correo ya está en uso." });
    }

    const usernameExists = await pool
      .request()
      .input("nombre_usuario", sql.VarChar, nombre_usuario)
      .query("SELECT * FROM usuarios WHERE nombre_usuario = @nombre_usuario");

    if (usernameExists.recordset.length > 0) {
      return res
        .status(400)
        .json({ message: "El nombre de usuario ya está en uso." });
    }

    // Insert new user
    await pool
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("nombre_usuario", sql.VarChar, nombre_usuario)
      .input("fecha_nacimiento", sql.Date, fecha_nacimiento)
      .input("email", sql.VarChar, email)
      .input("contraseña", sql.VarChar, contraseña)
      .input("telefono", sql.VarChar, telefono)
      .query(
        "INSERT INTO usuarios (nombre, nombre_usuario, fecha_nacimiento, email, contraseña, telefono) VALUES (@nombre, @nombre_usuario, @fecha_nacimiento, @email, @contraseña, @telefono)"
      );

    res.status(201).json({ message: "Usuario registrado con éxito." });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
