USE PetUs;

-- Insertar usuarios
INSERT INTO usuarios (nombre, nombre_usuario, descripcion, fecha_nacimiento, email, contrase�a, telefono, foto_perfil)
VALUES
('Juan P�rez', 'juanp', 'Amo a los animales, tengo 2 perros y 1 gato.', '1990-05-15', 'juanp@example.com', '1234', '1234567890', '/fotos/juan.jpg'),
('Ana G�mez', 'anag', 'Fan�tica de los gatos, criadora profesional.', '1985-10-20', 'anag@example.com', 'abcd', '9876543210', '/fotos/ana.jpg');

-- Insertar publicaciones
INSERT INTO publicaciones (usuario_id, titulo, descripcion, precio, foto_mascota, categoria, ubicacion)
VALUES
(1, 'Labrador Retriever en adopci�n', 'Cachorro de 3 meses, vacunado.', 200.00, '/fotos/labrador.jpg', 'Perros', 'Ciudad de M�xico'),
(2, 'Gato Persa', 'Hermoso gato persa de 1 a�o, perfecto para interiores.', 300.00, '/fotos/gatopersa.jpg', 'Gatos', 'Monterrey');
