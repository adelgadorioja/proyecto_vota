<!DOCTYPE html>
<html>
<head>
	<title>REALIZAR VOTACIÓN</title>
</head>
<body>

	<h1>Votación realizada</h1>

</body>
</html>

<?php
	include 'funcionesPHP.php';
	if (!comprobarSesionIniciada()) {
		header('Location: ../index.php');
	}

	$usuario = $_SESSION['usuario'];
	$opcion = $_POST['opcion'];
	realizarVotacion($usuario, $opcion);
?>