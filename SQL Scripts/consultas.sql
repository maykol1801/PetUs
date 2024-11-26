use petus;

SELECT nombre, nombre_usuario, fecha_nacimiento, email, telefono, foto_perfil, fecha_registro
FROM usuarios
WHERE id = 1;

SELECT o.id AS orden_id, o.total, o.metodo_pago, o.fecha_compra
FROM ordenes o
WHERE o.usuario_id = 1;


SELECT a.nombre, a.precio, a.cantidad
FROM articulos a
WHERE a.orden_id = 1;
