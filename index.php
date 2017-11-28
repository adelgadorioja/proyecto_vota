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

	<div class="tpl-snow">
    <?php
    	// Creación de 48 divs para la animación (cada div es una bolita)
    	for ($i=0; $i < 48; $i++) { 
    		echo "<div></div>";
    	}
    ?>
</div>

	<div id="contenedorIndex">
		<h1>¡vota!</h1>
		<h2>aseguramos tu anonimato</h2>
		<form id="formularioLogin" action="PHP/validacionUsuario.php" method="POST">
			<div id="mensajeDialog"></div>
			<div id="circulo"></div>
			<input onblur="comprobarInputVacio(event)" type="text" placeholder="usuario" id="usuario" name="usuario">
			<input onblur="comprobarInputVacio(event)" type="password" placeholder="contraseña" id="contrasena" name="contrasena">
			<input type="submit" id="botonAceptar" name="aceptar" value="aceptar">
		</form>
	</div>

</body>
</html>