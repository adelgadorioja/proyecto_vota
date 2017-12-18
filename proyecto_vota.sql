-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Temps de generació: 18-12-2017 a les 23:15:32
-- Versió del servidor: 10.1.26-MariaDB
-- Versió de PHP: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de dades: `proyecto_vota`
--

-- --------------------------------------------------------

--
-- Estructura de la taula `consultas`
--

CREATE TABLE `consultas` (
  `id_consulta` int(11) NOT NULL,
  `des_pregunta` varchar(255) CHARACTER SET latin1 NOT NULL,
  `id_usuario` varchar(16) CHARACTER SET latin1 NOT NULL,
  `fecha_inicio` datetime NOT NULL,
  `fecha_final` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Bolcant dades de la taula `consultas`
--

INSERT INTO `consultas` (`id_consulta`, `des_pregunta`, `id_usuario`, `fecha_inicio`, `fecha_final`) VALUES
(1, 'El mundo es redondo y lo llaman planeta. Si fuese plano, ¿lo llamarian redondeta?', 'admin', '2017-12-19 09:00:00', '2017-12-25 12:00:00');

-- --------------------------------------------------------

--
-- Estructura de la taula `invitaciones`
--

CREATE TABLE `invitaciones` (
  `id_invitacion` int(11) NOT NULL,
  `id_consulta` int(11) NOT NULL,
  `email_invitado` varchar(40) NOT NULL,
  `pendiente` varchar(1) NOT NULL DEFAULT 'T'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Bolcant dades de la taula `invitaciones`
--

INSERT INTO `invitaciones` (`id_invitacion`, `id_consulta`, `email_invitado`, `pendiente`) VALUES
(1, 1, 'alumne@gmail.com', 'T');

-- --------------------------------------------------------

--
-- Estructura de la taula `opciones`
--

CREATE TABLE `opciones` (
  `id_opcion` int(11) NOT NULL,
  `id_consulta` int(11) NOT NULL,
  `des_opcion` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Bolcant dades de la taula `opciones`
--

INSERT INTO `opciones` (`id_opcion`, `id_consulta`, `des_opcion`) VALUES
(1, 1, 'Sí'),
(2, 1, 'No');

-- --------------------------------------------------------

--
-- Estructura de la taula `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` varchar(16) NOT NULL,
  `contrasena` varchar(256) NOT NULL,
  `email` varchar(40) NOT NULL,
  `permisos` varchar(1) DEFAULT 'U'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Bolcant dades de la taula `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `contrasena`, `email`, `permisos`) VALUES
('admin', '998ed4d621742d0c2d85ed84173db569afa194d4597686cae947324aa58ab4bb', 'admin@gmail.com', 'A'),
('alumne', '1cf80ae63067562300a37e64e5547c1f441c9cccfb65a63e2d4784bf9285c62e', 'alumne@gmail.com', 'U');

-- --------------------------------------------------------

--
-- Estructura de la taula `votos`
--

CREATE TABLE `votos` (
  `id_voto` int(11) NOT NULL,
  `id_opcion` varchar(256) NOT NULL,
  `id_usuario` varchar(16) NOT NULL,
  `id_consulta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Disparadors `votos`
--
DELIMITER $$
CREATE TRIGGER `trigger_votos` BEFORE INSERT ON `votos` FOR EACH ROW UPDATE invitaciones SET pendiente='F' WHERE id_consulta = NEW.id_consulta AND email_invitado = (SELECT email FROM usuarios WHERE id_usuario = NEW.id_usuario)
$$
DELIMITER ;

--
-- Indexos per taules bolcades
--

--
-- Index de la taula `consultas`
--
ALTER TABLE `consultas`
  ADD PRIMARY KEY (`id_consulta`);

--
-- Index de la taula `invitaciones`
--
ALTER TABLE `invitaciones`
  ADD PRIMARY KEY (`id_invitacion`);

--
-- Index de la taula `opciones`
--
ALTER TABLE `opciones`
  ADD PRIMARY KEY (`id_opcion`);

--
-- Index de la taula `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Index de la taula `votos`
--
ALTER TABLE `votos`
  ADD PRIMARY KEY (`id_voto`);

--
-- AUTO_INCREMENT per les taules bolcades
--

--
-- AUTO_INCREMENT per la taula `consultas`
--
ALTER TABLE `consultas`
  MODIFY `id_consulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la taula `invitaciones`
--
ALTER TABLE `invitaciones`
  MODIFY `id_invitacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la taula `opciones`
--
ALTER TABLE `opciones`
  MODIFY `id_opcion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la taula `votos`
--
ALTER TABLE `votos`
  MODIFY `id_voto` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
