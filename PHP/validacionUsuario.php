<?php
	// Import del archivo funcionesPHP
	include 'funcionesPHP.php';
	// Obtenemos los datos introducidos por el usuario
	$usuario = $_POST['usuario'];
	$contrasena = $_POST['contrasena'];
	// Consultamos a la BBDD si existe el usuario y la contraseña
	$rs = realizarConsulta("SELECT * FROM usuarios WHERE id_usuario = '$usuario' AND contrasena = '$contrasena'");
	if($rs->rowCount() == 0){
		// Si falla el login redirigimos al usuario al login
		cerrarSesion();
		header('Location: ../index.php');
	}else{
		$usuario = $rs->fetch();
		$usuario = $usuario['id_usuario'];
		$tipoUsuario = $usuario['permisos'] == "a"? "administrador" : "usuario";
		// El usuario inicia sesión y es redirigido a la página de inicio
		iniciarSesion($usuario, $tipoUsuario);
		header('Location: inicio.php');
	}
?>