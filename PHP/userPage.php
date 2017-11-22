<!DOCTYPE html>
<html>
<head>
	<title>Votaciones AM</title>
</head>
<body>
	<?php
		include 'funcionesPHP.php';
	?>
	<h2>Crear consulta</h2>
	<form action="<?php crearConsulta() ?>">
		Títol<input type="text" name="titulo">
		Data d'inici: <input type="date" name="inicio">
		Data final: <input type="date" name="final">
		<input type="submit" value="Crear">
		<input type="reset">
	</form>
</body>
</html>