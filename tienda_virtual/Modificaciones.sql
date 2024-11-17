use db_tiendavirtual;

-- Modificaciones para la vista de Inicio
select * from categoria;

update categoria set
	nombre = "Computación",
    descripcion = "Computadoras portátiles y de escritorio", 
    portada = "categoriaComputacion.jpg", 
    ruta = "computacion"
where idcategoria = "1";

update categoria set
	nombre = "Videojuegos", 
    descripcion = "Consolas, videojuegos y accesorios", 
    portada = "categoriaVideojuegos.jpg", 
    ruta = "videojuegos"
where idcategoria = "2";

insert into categoria 
(idcategoria, nombre, descripcion, portada, datecreated, ruta, status)
values
("3", "Redes", "Routers, switches, y cableado de red", "categoriaRedes.jpg", now(), "redes", "1");



-- Modificaciones para la lista de Productos

select * from producto;

-- Modificando productos existentes
-- Producto 1: Ex Chaqueta azul, convirtiendo a Computadora portatil
update producto
set nombre = 'Computadora Portátil Dell XPS 13',
	descripcion = '<p><span style=\"color: #000000; font-family: \'Open Sans\', Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">Laptop de alto rendimiento con pantalla 4K y procesador Intel i7 tipo H, con 16 GB de memoria RAM ampliable a 64 GB. Almacenamiento SSD de 512 MB NVMe</span></p>',
    precio = 1200.00,
    stock = 5,
    ruta = 'dell-xps-13'
where idproducto = 1;

-- Modificando imagenes de productos existentes
select * from imagen;

-- Producto 1: Ex Chaqueta azul, convirtiendo a Computadora portatil
-- Imagen 1:
update imagen
set img = 'dell-xps-13-1.jpg'
where id = 1;

-- Imagen 2:
update imagen
set img = 'dell-xps-13-2.jpg'
where id = 2;

-- Imagen 3:
update imagen
set img = 'dell-xps-13-3.jpg'
where id = 3;


-- Modificando productos existentes

select * from producto;
-- Producto 2: Ex reloj, convirtiendo a Computadora gamer
update producto
set nombre = 'Computadora Portátil Gamer HP Omen 15',
	descripcion = '<p><span style=\"color: #000000; font-family: \'Open Sans\', Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">Laptop gamer con procesador Intel Core i7 de 12va generación, tarjeta gráfica NVIDIA GeForce RTX 2070 SUPER con diseño Max-Qcon, con 32 GB de memoria RAM ampliable a 64 GB. Almacenamiento SSD de 1 TB SSD NVMe</span></p>',
    precio = 1600.00,
    stock = 3,
    ruta = 'hp-omen-15'
where idproducto = 2;

-- Modificando imagenes de productos existentes
select * from imagen;

-- Producto 2: Ex reloj, convirtiendo a computadora gamer
-- Imagen 1:
update imagen
set img = 'hp-omen-15-1.jpg'
where id = 4;

-- Imagen 2:
update imagen
set img = 'hp-omen-15-2.jpg'
where id = 12;



-- Modificando productos existentes
-- Producto 3: Ex bocina, convirtiendo a consola de videojuegos
select * from producto;
update producto
set nombre = 'Consola PlayStation 5 Slim',
	descripcion = '<p><span style=\"color: #000000; font-family: \'Open Sans\', Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">La nueva consola PlayStation 5 Slim tiene una velocidad sorprendente con su SSD de  1TB, además de una inmersión más profunda con soporte para respuesta háptica, gatillos adaptables y audio 3D, además de una generación completamente nueva de juegos de PlayStation. La PS5 edición digital es una versión completamente digital de la consola PS5 que no trae unidad de disco.</span></p>',
    precio = 600.00,
    stock = 10,
    ruta = 'ps5-slim'
where idproducto = 3;

-- Modificando imagenes de productos existentes
select * from imagen;

-- Producto 3: Ex bocina, convirtiendo a consola de videojuegos
-- Imagen 1:
update imagen
set img = 'ps5-slim-1.jpg'
where id = 13;

-- Imagen 2:
update imagen
set img = 'ps5-slim-2.jpg'
where id = 14;

-- Imagen 3:
update imagen
set img = 'ps5-slim-3.jpg'
where id = 15;



-- Agregar nuevo producto a categoria nueva

select * from producto;

-- En este caso la categoria 3, es la que se agrego, para este proyecto es la categoria de Redes
insert into producto (categoriaid, codigo, nombre, descripcion, precio, stock, datecreated, ruta, status) values
('3', '817231928', 'Router WiFi TP-Link Archer AX50', '<p><span style=\"color: #000000; font-family: \'Open Sans\', Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">Con velocidad Gigabit y Wi-Fi 6—2402 Mbps en 5 GHz y 574 Mbps en banda de 2.4 GHz se garantiza una transmisión más fluida y descargas más rápidas. La latencia ultrabaja, asegura hasta un 75% de reducción en los juegos y chat de video más receptivos.</span></p>', '150.00', '5', now(), 'tplink-archer-ax50', '1'),
('3', '172345233', 'Firewall WatchGuard Firebox T20', '<p><span style=\"color: #000000; font-family: \'Open Sans\', Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">El Firebox T20 es el modelo más compacto de la serie de firewalls WatchGuard Firebox, es compatible con el sistema operativo UTM de próxima generación de WatchGuard: Fireware OS. Cada dispositivo Firebox incluye Fireware OS y ofrece una protección excepcional contra las amenazas sofisticadas actuales para garantizar que su negocio permanezca conectado.</span></p>', '299.00', '3', now(), 'firewall-watchguard-firebox-t20', '1');

-- Agregar imagenes de los productos nuevos
select * from imagen;

-- Producto 4: Router WiFi TP-Link
-- Imagen 1:
insert into imagen (productoid, img) values
('4', 'router-tplink-ax50-1.jpg');

-- Imagen 2:
insert into imagen (productoid, img) values
('4', 'router-tplink-ax50-2.jpg');

-- Imagen 3:
insert into imagen (productoid, img) values
('4', 'router-tplink-ax50-3.jpg');



-- Producto 5: Firewall WatchGuard Firebox
-- Imagen 1:
insert into imagen (productoid, img) values
('5', 'firewall-watchguard-firebox-t20-1.jpg');

-- Imagen 2:
insert into imagen (productoid, img) values
('5', 'firewall-watchguard-firebox-t20-2.jpg');


	