<?php
	include 'funcionesPHP.php';
	$usuario = $_POST['usuario'];
	$contrasena = $_POST['contrasena'];
	$rs = realizarConsulta("SELECT * FROM usuarios WHERE id_usuario = '$usuario' AND contrasena = '$contrasena'");
	if($rs->num_rows === 0){
		header('Location: ../index.php');
	}else{
		header('Location: userPage.php');
	}
?>