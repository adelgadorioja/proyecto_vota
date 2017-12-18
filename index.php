<!-- 

    Nombre fichero: index.php
    Creador: Álvaro
    Fecha creación: 11/12/2017
    Funcionalidad: Permite al usuario introducir sus datos de conexión a la aplicación.

-->

<!DOCTYPE html>
<html>
<head>
	<title>PROYECTO VOTA</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="reset.css">
	<script type="text/javascript" src="script.js"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>

	<div class="container-fluid">
		<div class="tpl-snow">
		    <?php
		    	// Creación de 48 divs para la animación (cada div es una bolita)
		    	for ($i=0; $i < 48; $i++) { 
		    		echo "<div></div>";
		    	}
	    ?>
		</div>
		<div class="row">
			<div id="landPage" class="center col-md-6">
					<h4 class="text-center title">¡vota!</h2>
					<h6 class="text-center">aseguramos tu anonimato</h2>
					<form class="jumbotron box-shadow" id="formularioLogin" action="PHP/validacionUsuario.php" method="POST">
						<div class="row">
							<div class="alert alert-danger d-none alert-dismissable col-md-12" id="mensajeDialog" role="alert">
							</div>
						</div>
						<div class="row">
							<div class="circle-logo mx-auto"></div>
						</div>
						<div class="form-group row">
							<input class="form-control text-center col-md-12" onblur="comprobarInputVacio(event)" type="text" placeholder="usuario" id="usuario" name="usuario">
						</div>
						<div class="form-group row">
							<input class="form-control text-center col-md-12" onblur="comprobarInputVacio(event)" type="password" placeholder="contraseña" id="contrasena" name="contrasena">
						</div>
						<div class="row">
							<input class="col-md-12 btn" type="submit" id="botonAceptar" name="aceptar" value="aceptar">
						</div>
					</form>
			</div>
		</div>
	</div>

	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
</body>
</html>