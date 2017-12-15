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
		iniciarSesion($usuario, "usuario");
		header('Location: inicioInvitado.php');
	}
?>