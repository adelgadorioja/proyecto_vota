<!DOCTYPE html>
<html>
<head>
	<title>Votaciones VOTA</title>
</head>
<body>

	<p>gsdgdgsgsdg</p>

</body>
</html>

<?php
	include 'funcionesPHP.php';
	if (!comprobarSesionIniciada()) {
		header('Location: ../index.php');
	}
	$consulta = $_POST['consulta'];
	$usuario = $_SESSION['usuario'];
	$fecInicio = $_POST['fecInicio'];
	$fecFin = $_POST['fecFin'];
	crearConsulta($consulta, $usuario, $fecInicio, $fecFin);
?>