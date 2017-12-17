-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-12-2017 a las 21:50:06
-- Versión del servidor: 10.1.28-MariaDB
-- Versión de PHP: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto_vota`
--
CREATE DATABASE IF NOT EXISTS `proyecto_vota` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `proyecto_vota`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consultas`
--

DROP TABLE IF EXISTS `consultas`;
CREATE TABLE `consultas` (
  `id_consulta` int(11) NOT NULL,
  `des_pregunta` varchar(60) CHARACTER SET latin1 NOT NULL,
  `id_usuario` varchar(16) CHARACTER SET latin1 NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_final` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `consultas`
--

INSERT INTO `consultas` (`id_consulta`, `des_pregunta`, `id_usuario`, `fecha_inicio`, `fecha_final`) VALUES
(1, '¿Perros o gatos?', 'admin', '2017-12-20', '2017-12-20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `invitaciones`
--

DROP TABLE IF EXISTS `invitaciones`;
CREATE TABLE `invitaciones` (
  `id_invitacion` int(11) NOT NULL,
  `id_consulta` int(11) NOT NULL,
  `email_invitado` varchar(40) NOT NULL,
  `pendiente` varchar(1) NOT NULL DEFAULT 'T'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `invitaciones`
--

INSERT INTO `invitaciones` (`id_invitacion`, `id_consulta`, `email_invitado`, `pendiente`) VALUES
(1, 1, 'alumne@gmail.com', 'F');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opciones`
--

DROP TABLE IF EXISTS `opciones`;
CREATE TABLE `opciones` (
  `id_opcion` int(11) NOT NULL,
  `id_consulta` int(11) NOT NULL,
  `des_opcion` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `opciones`
--

INSERT INTO `opciones` (`id_opcion`, `id_consulta`, `des_opcion`) VALUES
(1, 1, 'Perros'),
(2, 1, 'Gatos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id_usuario` varchar(16) NOT NULL,
  `contrasena` varchar(256) NOT NULL,
  `email` varchar(40) NOT NULL,
  `permisos` varchar(1) DEFAULT 'U'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `contrasena`, `email`, `permisos`) VALUES
('admin', '998ed4d621742d0c2d85ed84173db569afa194d4597686cae947324aa58ab4bb', 'admin@gmail.com', 'A'),
('alumne', '1cf80ae63067562300a37e64e5547c1f441c9cccfb65a63e2d4784bf9285c62e', 'alumne@gmail.com', 'U');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `votos`
--

DROP TABLE IF EXISTS `votos`;
CREATE TABLE `votos` (
  `id_voto` int(11) NOT NULL,
  `id_opcion` varchar(256) NOT NULL,
  `id_usuario` varchar(16) NOT NULL,
  `id_consulta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `votos`
--

INSERT INTO `votos` (`id_voto`, `id_opcion`, `id_usuario`, `id_consulta`) VALUES
(1, 'N3£> ¯ŠVØœñ×›DE', 'alumne', 1),
(2, 'Íq¸¿Ý×fŠ‰IRpÑ:', 'alumne', 1);

--
-- Disparadores `votos`
--
DROP TRIGGER IF EXISTS `trigger_votos`;
DELIMITER $$
CREATE TRIGGER `trigger_votos` BEFORE INSERT ON `votos` FOR EACH ROW UPDATE invitaciones SET pendiente='F' WHERE id_consulta = NEW.id_consulta AND email_invitado = (SELECT email FROM usuarios WHERE id_usuario = NEW.id_usuario)
$$
DELIMITER ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `consultas`
--
ALTER TABLE `consultas`
  ADD PRIMARY KEY (`id_consulta`);

--
-- Indices de la tabla `invitaciones`
--
ALTER TABLE `invitaciones`
  ADD PRIMARY KEY (`id_invitacion`);

--
-- Indices de la tabla `opciones`
--
ALTER TABLE `opciones`
  ADD PRIMARY KEY (`id_opcion`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `votos`
--
ALTER TABLE `votos`
  ADD PRIMARY KEY (`id_voto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `consultas`
--
ALTER TABLE `consultas`
  MODIFY `id_consulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `invitaciones`
--
ALTER TABLE `invitaciones`
  MODIFY `id_invitacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `opciones`
--
ALTER TABLE `opciones`
  MODIFY `id_opcion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `votos`
--
ALTER TABLE `votos`
  MODIFY `id_voto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
