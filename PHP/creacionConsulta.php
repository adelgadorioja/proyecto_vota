<!DOCTYPE html>
<html>
<head>
	<title>Votaciones VOTA</title>
	<script type="text/javascript" src="../script.js"></script>
</head>
<body>
	<?php
		include 'funcionesPHP.php';
		if (!comprobarSesionIniciada()) {
			header('Location: ../index.php');
		}
	?>
	<p>Opcions:</p>
	<button onclick="mostrarConsulta()">Crear consulta</button>
</body>
</html>