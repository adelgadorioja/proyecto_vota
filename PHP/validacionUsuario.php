<?php
	include 'funcionesPHP.php';
	$usuario = $_POST['usuario'];
	$contrasena = $_POST['contrasena'];
	$rs = realizarConsulta("SELECT * FROM usuarios WHERE id_usuario = '$usuario' AND contrasena = '$contrasena'");
	if($rs->rowCount() == 0){
		cerrarSesion();
		header('Location: ../index.php');
	}else{
		$usuario = $rs->fetch();
		$usuario = $usuario['id_usuario'];
		iniciarSesion($usuario);
		header('Location: creacionConsulta.php');
	}
?>