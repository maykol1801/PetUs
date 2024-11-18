USE PetUs;

-- Crear tabla de usuarios
CREATE TABLE usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY, -- Se usa IDENTITY en lugar de AUTO_INCREMENT
    nombre NVARCHAR(100) NOT NULL, -- NVARCHAR para soporte de Unicode
    nombre_usuario NVARCHAR(50) UNIQUE NOT NULL,
    descripcion NVARCHAR(MAX), -- NVARCHAR(MAX) para textos largos
    fecha_nacimiento DATE,
    email NVARCHAR(100) UNIQUE NOT NULL,
    contraseña NVARCHAR(255) NOT NULL, -- Se usa NVARCHAR para compatibilidad
    telefono NVARCHAR(15),
    foto_perfil NVARCHAR(255),
    fecha_registro DATETIME DEFAULT GETDATE() -- GETDATE() en lugar de CURRENT_TIMESTAMP
);

-- Crear tabla de publicaciones
CREATE TABLE publicaciones (
    id INT IDENTITY(1,1) PRIMARY KEY, -- IDENTITY en lugar de AUTO_INCREMENT
    usuario_id INT NOT NULL,
    titulo NVARCHAR(150) NOT NULL,
    descripcion NVARCHAR(MAX) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    foto_mascota NVARCHAR(255) NOT NULL,
    categoria NVARCHAR(50),
    ubicacion NVARCHAR(100),
    fecha_publicacion DATETIME DEFAULT GETDATE(), -- GETDATE() en lugar de CURRENT_TIMESTAMP
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Crear tabla de categorías
CREATE TABLE categorias (
    id INT IDENTITY(1,1) PRIMARY KEY, -- IDENTITY en lugar de AUTO_INCREMENT
    nombre NVARCHAR(50) UNIQUE NOT NULL
);
