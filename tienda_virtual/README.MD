/********************************************************************************************************************/
                            ACCESO AL SISTEMA
/********************************************************************************************************************/
Acceso al administrador
usuario: info@abelosh.com
clave: 12345Abel
hash 6289f598db2db491598da459c2ef05326e0c4491597e39050ab54031298842e3

Acceso al Supervisor
usuario: alex@info.com
clave: alexi78
hash 622f0b9973cd683576bce47016e0159cde710600e450a0b7e7cf313e566788b2

Acceso al vendedor 
usuario: hr@info.com
clave: hr78
hash  9316e114d1fff77af5cacea43f2d7dab4659cf9f691f002359a94d50a4c41597


Acceso al cliente prueba
usuario: fer@info.com
clave: fer895
hash 36d480af03f9fcb0c6eca3f03722a4d636faa39efa17bd2f31777bac8026c96b

/********************************************************************************************************************/
                            EXPLICACION DE CAMBIOS REALIZADOS
/********************************************************************************************************************/
Explicacion enn este archivo encontraras los accesos de los usuarios prueba 
mi parte esta concluida sin errores, cree un archivo aparte donde esta guardado los usuarios de prueba del sistema,
es tienda.sql en ese archivo ordener lo que estaba en db_tiendasVirtual.sql pero no tiene las modificaciones.

cualquier cambios que deseas hacer en las carpetas:
Assets > Js > tienda > functions.js : se encuentra el js del formulario 
Assets > Js > functions_admin.js : se encuentra las funciones de los campos del formulario

Controllers > Tienda.php : se encuentra el metodo registro es el que se encarga de la logica 

Models > TClientes.php se encuentra el metodo insertUserCliente que me permite registra los usuarios cliente, el metodo se puede mejorarlo pero tuve que adaptarme
                          al codigo estructurado


Views > template > header_tienda.php en ese archivo tuve que agregar mi modal de crear cuenta, por el tiempo tuve que dejarlo hay.


/********************************************************************************************************************/
                                        RECOMENDACIONES
/********************************************************************************************************************/
Fallos que note en la estructura del proyecto

1.- El Codigo es un codigo espagueti y no se entiende.

2.- La estructura MVC se puede mejorar considerablemente, ciertas clase no cumple el principio de responsabilidad unica.

3.- El namescape no es usado eso lo ayuda muchisimo en la hora de llamar las clases por que no tiene que hacer require seguidos.

4.- El Cierre de la etiqueta de php  " ?> ", cuando se trabaja con codigo php no es recomendable usar el cierre por que da entender 
         puede seguir codigo html,script. Puede ocasionar el ingreso de script malicioso.

5.- Mejorar la reutilizacion de codigo repetitivo, el mal uso de los Controllers por que si va a usar Controllers el controller
         envia los datos que el cliente necesita y asi reduciendo el uso de php en html.
         
6.- La estructura de las carpetas podria mejorarse y tener una busqueda de recursos mas optimizadas. 