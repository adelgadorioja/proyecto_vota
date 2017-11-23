<!DOCTYPE html>
<html>
<head>
	<title>PROYECTO VOTA</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="reset.css">
	<link rel="stylesheet" type="text/css" href="style.css">
	<script type="text/javascript" src="script.js"></script>
	<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"> 
</head>
<body>

	<div id="contenedorIndex">
		<h1>¡vota!</h1>
		<h2>aseguramos tu anonimato</h2>
		<form id="formularioLogin" action="PHP/validacionUsuario.php" method="POST">
			<div id="circulo">?</div>
			<input type="text" id="usuario" name="usuario">
			<input type="password" id="contrasena" name="contrasena">
			<input type="submit" id="botonAceptar" name="aceptar" value="aceptar">
		</form>
	</div>

</body>
</html>