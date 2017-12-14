<?php
	// Import del archivo funcionesPHP
	include 'funcionesPHP.php';
	// Obtenemos los datos introducidos por el usuario
	$usuario = $_POST['usuario'];
	$contrasena = $_POST['contrasena'];
	// Consultamos a la BBDD si existe el usuario y la contraseña
	$usuario = intentarLogin($usuario, $contrasena);
	if (null == $usuario) {
		cerrarSesion();
		header('Location: ../index.php');
	}else{
		$idUsuario = $usuario['id_usuario'];
		$tipoUsuario = $usuario['permisos'] != "U"? "administrador" : "usuario";
		// El usuario inicia sesión y es redirigido a la página de inicio
		iniciarSesion($idUsuario, $tipoUsuario);
		if ($tipoUsuario == "administrador") {
			header('Location: inicio.php?');
		} else {
			header('Location: inicioInvitado.php');
		}
	}
?>