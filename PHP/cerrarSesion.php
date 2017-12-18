<!-- 

	Nombre fichero: cerrarSesion.php
	Creador: Álvaro
	Fecha creación: 27/11/2017
	Funcionalidad: Destruye la sesión creada por el usuario.

-->

<?php
	// Cierra la sesión del usuario
	include 'funcionesPHP.php';
	cerrarSesion();
	header('Location: ../index.php');
?>