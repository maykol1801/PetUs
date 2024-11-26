use petus;


INSERT INTO usuarios (nombre, nombre_usuario, fecha_nacimiento, email, contraseña, telefono, foto_perfil)
VALUES ('Juan Pérez', 'juan123', '1990-05-10', 'juan@example.com', 'contraseña_segura', '1234567890', 'ruta_a_foto_perfil.jpg');


INSERT INTO ordenes (usuario_id, total, metodo_pago)
VALUES (1, 150.75, 'Tarjeta de Crédito');


INSERT INTO articulos (orden_id, nombre, precio, cantidad)
VALUES (1, 'Producto A', 100.50, 1),
       (1, 'Producto B', 50.25, 2);


