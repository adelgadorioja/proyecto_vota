<!DOCTYPE html>
<html>
<head>
	<title>Votaciones AM</title>
</head>
<body>
	<h2>Crear consulta</h2>
	<form action="funcionesPHP.php" method="POST">
		Titulo <input type="text" name="titulo" placeholder="Nombre consulta"><br><br>
		Fecha de inicio: <input type="date" name="inicio"><br><br>
		Fecha de cierre: <input type="date" name="final"><br><br>
		<input type="submit" value="Crear consulta">
		<input type="reset">
	</form>
</body>
</html>