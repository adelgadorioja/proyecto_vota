<!-- 

    Nombre fichero: validacionRegistro.php
    Creador: Álvaro
    Fecha creación: 13/12/2017
    Funcionalidad: Comprueba que tanto el identificador como el email del usuario que se está intentado registrar no existan en la BBDD.

-->

<?php
	include 'funcionesPHP.php';
	$usuario = $_POST['usuario'];
	$email = $_POST['email'];
	$contrasena = $_POST['contrasena'];
	$contrasenaRepetida = $_POST['repetirContrasena'];
	$usuarioExistente = obtenerUsuarioPorId($usuario);
	$emailExistente = obtenerUsuarioPorEmail($email);
	if (null != $usuarioExistente || $emailExistente != null) {
		header('Location: registro.php?error=true');
	}else{
		registrarUsuario($usuario, $email, $contrasena);
		iniciarSesion($usuario, "usuario", $contrasena);
		header('Location: inicioInvitado.php');
	}
?>