DROP DATABASE IF EXISTS GRUASYEROVI;
CREATE DATABASE GRUASYEROVI;
USE GRUASYEROVI;

DROP TABLE IF EXISTS LOGIN;
CREATE TABLE `Login` (
  `correo` VARCHAR(50) UNIQUE,
  `contrasenia` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`correo`)
);

DROP TABLE IF EXISTS UBICACION;
CREATE TABLE `Ubicacion` (
  `id_ubicacion` INT UNIQUE AUTO_INCREMENT,
  `provincia` VARCHAR(30) NOT NULL,
  `ciudad` VARCHAR(25) NOT NULL,
  `referencia` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_ubicacion`)
);

DROP TABLE IF EXISTS USUARIOS;
CREATE TABLE `Usuarios` (
  `id_usuario` INT UNIQUE AUTO_INCREMENT,
  `cedula` CHAR(10) NOT NULL,
  `nombres` VARCHAR(20) NOT NULL,
  `apellidos` VARCHAR(20) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `ubicacion` INT UNIQUE,
  `celular` CHAR(10),
  `foto` BLOB,
  `rol` VARCHAR(13), -- ADMINISTRADOR, MECANICO, CLIENTE
  `correo` VARCHAR(50) UNIQUE,
  PRIMARY KEY (`id_usuario`),
  FOREIGN KEY (UBICACION) REFERENCES UBICACION(ID_UBICACION) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (CORREO) REFERENCES LOGIN(CORREO) ON DELETE RESTRICT ON UPDATE CASCADE
);

DROP TABLE IF EXISTS AUTOS;
CREATE TABLE `Autos` (
  `id_auto` INT UNIQUE AUTO_INCREMENT,
  `placa` CHAR(7) NOT NULL, #LETRAS-NUMERO 
  `marca` VARCHAR(20) NOT NULL,
  `modelo` VARCHAR(30) NOT NULL,
  `color` VARCHAR(20) NOT NULL,
  `clave_llave` VARCHAR(5) NOT NULL,
  `propietario` INT NOT NULL,
  PRIMARY KEY (`id_auto`),
  FOREIGN KEY (PROPIETARIO) REFERENCES USUARIOS(ID_USUARIO) ON DELETE RESTRICT ON UPDATE CASCADE
);

DROP TABLE IF EXISTS PROMOCIONES;
CREATE TABLE `Promociones` (
  `id_promocion` INT UNIQUE AUTO_INCREMENT,
  `titulo` VARCHAR(20) NOT NULL,
  `descripcion` VARCHAR(200) NOT NULL,
  `precio` NUMERIC(5,2) NOT NULL,
  PRIMARY KEY (`id_promocion`)
);

DROP TABLE IF EXISTS SERVICIOGRUA;
CREATE TABLE `ServicioGrua` (
  `id_servicio_grua` INT UNIQUE AUTO_INCREMENT,
  `id_conductor` INT NOT NULL,
  `id_auto` INT NOT NULL,
  `ubicacion_latitud` VARCHAR(30) NOT NULL,
  `ubicacion_longitud` VARCHAR(30) NOT NULL,
  `ubicacion_referencia` VARCHAR(50) NOT NULL,
  `fecha` DATE NOT NULL,
  `hora_inicio` TIME NOT NULL,
  `hora_final` TIME NOT NULL,
  `id_promocion` INT,
  PRIMARY KEY (`id_servicio_grua`),
  FOREIGN KEY (ID_CONDUCTOR) REFERENCES USUARIOS(ID_USUARIO) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (ID_AUTO) REFERENCES AUTOS(ID_AUTO) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (ID_PROMOCION) REFERENCES PROMOCIONES(ID_PROMOCION) ON DELETE RESTRICT ON UPDATE CASCADE
);

DROP TABLE IF EXISTS HORARIOSDISPONIBLES;
CREATE TABLE `HorariosDisponibles` (
  `id_horario` INT UNIQUE AUTO_INCREMENT,
  `fecha` DATE NOT NULL,
  `hora` TIME NOT NULL,
  PRIMARY KEY (`id_horario`)
);

DROP TABLE IF EXISTS TIPOMANTENIMIENTO;
CREATE TABLE `TipoMantenimiento` (
  `id_tipoMantenimiento` INT UNIQUE AUTO_INCREMENT,
  `descripcion` VARCHAR(100) NOT NULL,
  `precio` NUMERIC(5,2) NOT NULL,
  PRIMARY KEY (`id_tipoMantenimiento`)
);

DROP TABLE IF EXISTS PROCESOMANTENIMIENTO;
CREATE TABLE `ProcesoMantenimiento` (
  `id_proceso` INT UNIQUE AUTO_INCREMENT,
  `fecha_actual` DATE NOT NULL,
  `hora_actual` TIME NOT NULL,
  `observacion_mecanico` VARCHAR(100) NOT NULL,
  `foto` BLOB,
  `tipoMantenimiento` INT NOT NULL,
  `id_proceso_anterior` INT UNIQUE,
  `id_proceso_siguiente` INT UNIQUE,
  PRIMARY KEY (`id_proceso`),
  FOREIGN KEY (TIPOMANTENIMIENTO) REFERENCES TIPOMANTENIMIENTO(ID_TIPOMANTENIMIENTO) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (ID_PROCESO_ANTERIOR) REFERENCES PROCESOMANTENIMIENTO(ID_PROCESO) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (ID_PROCESO_SIGUIENTE) REFERENCES PROCESOMANTENIMIENTO(ID_PROCESO) ON DELETE RESTRICT ON UPDATE CASCADE
);

DROP TABLE IF EXISTS SERVICIOMANTENIMIENTO;
CREATE TABLE `ServicioMantenimiento` (
  `id_mantenimiento` INT UNIQUE AUTO_INCREMENT,
  `id_auto` INT NOT NULL,
  `id_mecanico` INT NOT NULL,
  `tipo_movilizacion` INT NOT NULL, #1: El CLIENTE 2: POR GRUA
  `fecha_pedido` DATE NOT NULL,
  `precio_total` NUMERIC(5,2),
  `id_horario` INT NOT NULL,
  `id_proceso_inicial` INT UNIQUE NOT NULL,
  `id_promocion` INT,
  PRIMARY KEY (`id_mantenimiento`),
  FOREIGN KEY (ID_AUTO) REFERENCES AUTOS(ID_AUTO) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (ID_MECANICO) REFERENCES USUARIOS(ID_USUARIO) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (ID_HORARIO) REFERENCES HORARIOSDISPONIBLES(ID_HORARIO) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (ID_PROCESO_INICIAL) REFERENCES PROCESOMANTENIMIENTO(ID_PROCESO) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (ID_PROMOCION) REFERENCES PROMOCIONES(ID_PROMOCION) ON DELETE RESTRICT ON UPDATE CASCADE
);

DROP TABLE IF EXISTS COMENTARIOSCLIENTES;
CREATE TABLE `ComentariosClientes` (
  `id_comentario` INT UNIQUE AUTO_INCREMENT,
  `id_cliente` INT NOT NULL,
  `id_mantenimiento` INT,
  `id_servicio_grua` INT,
  `cantidad_estrellas` INT NOT NULL, #Del 1 al 5, peor a mejor respectivamente.
  `descripcion` VARCHAR(144) NOT NULL,
  PRIMARY KEY (`id_comentario`),
  FOREIGN KEY (ID_CLIENTE) REFERENCES USUARIOS(ID_USUARIO) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (ID_MANTENIMIENTO) REFERENCES SERVICIOMANTENIMIENTO(ID_MANTENIMIENTO) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (ID_SERVICIO_GRUA) REFERENCES SERVICIOGRUA(ID_SERVICIO_GRUA) ON DELETE RESTRICT ON UPDATE CASCADE
);








