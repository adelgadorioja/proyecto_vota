<!DOCTYPE html>
<html>
<head>
	<title>Votaciones VOTA</title>
</head>
<body>
	<?php
		include 'funcionesPHP.php';
		if (!comprobarSesionIniciada()) {
			header('Location: ../index.php');
		}
	?>
	
	<h2>Crear consulta</h2>
	<form action="consultaCreada.php" method="POST">
		<label>Pregunta</label> <input type="text" name="consulta">
		<label>Fecha de inicio</label> <input type="date" name="fecInicio">
		<label>Fecha de cierre</label> <input type="date" name="fecFin">
		<input type="submit" value="Crear consulta">
	</form>
</body>
</html>