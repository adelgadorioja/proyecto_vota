<?php
	// Cierra la sesión del usuario
	include 'funcionesPHP.php';
	cerrarSesion();
	header('Location: ../index.php');
?>