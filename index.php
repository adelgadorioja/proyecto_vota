<!DOCTYPE html>
<html>
<head>
	<title>PROYECT VOTA</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="reset.css">
	<link rel="stylesheet" type="text/css" href="style.css">
	<script type="text/javascript" src="script.js"></script>
</head>
<body>

	<div id="contenedorIndex">
		<form id="formularioLogin" action="PHP/validacionUsuario.php" method="POST">
			<label for="usuario">Usuario</label>
			<input type="text" id="usuario" name="usuario">
			<label for="contrasena">Contraseña</label>
			<input type="password" id="contrasena" name="contrasena">
			<input type="submit" id="botonAceptar" name="aceptar" value="Aceptar">
		</form>
	</div>

</body>
</html>