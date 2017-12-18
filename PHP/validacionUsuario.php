<!-- 

    Nombre fichero: validacionUsuario.php
    Creador: Álvaro
    Fecha creación: 28/11/2017
    Funcionalidad: Comprueba que los datos introducidos por el usuario en el Login sean correctos, de ser así, comprueba qué tipo de usuario es y lo redirige a su página de inicio.

-->

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
		iniciarSesion($idUsuario, $tipoUsuario, $contrasena);
		if ($tipoUsuario == "administrador") {
			header('Location: inicio.php');
		} else {
			header('Location: inicioInvitado.php');
		}
	}
?>