<!-- 

    Nombre fichero: registro.php
    Creador: Álvaro
    Fecha creación: 13/12/2017
    Funcionalidad: Permite al usuario que haya sido invitado por primera vez registrarse en nuestra aplicación.

-->

<!DOCTYPE html>
<html>
<head>
	<title>PROYECTO VOTA</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="../reset.css">
	<script type="text/javascript" src="../script.js"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="../style.css">
</head>
<body>

	<div class="container-fluid">
		<div class="row">
			<div id="landPage" class="center col-md-6">
					<h2 class="text-center title">¡vota!</h2>
					<h5 class="text-center">aseguramos tu anonimato</h2>
					<form class="jumbotron box-shadow" id="formularioRegistro" action="validacionRegistro.php" method="POST">
						<div class="row">
							<?php
									if(!isset($_GET["error"])) {
										$estilo = "d-none";
									} else {
										$estilo = "";
									}
								
									echo "<div class='alert ".$estilo." alert-danger alert-dismissable col-md-12' id='mensajeDialog' role='alert'>";

									if(isset($_GET["error"])) {
										echo "Ha ocurrido un error.";
									}
									$mail = $_GET["email"];
							?>
							</div>
						</div>
						<div class="row">
							<div class="circle-logo mx-auto"></div>
						</div>
						<div class="form-group row">
							<input class="form-control text-center col-md-12" onblur="comprobarInputVacio(event)" type="text" placeholder="usuario" id="usuarioRegistro" name="usuario">
						</div>
						<div class="form-group row">
							<input class="form-control text-center col-md-12" onblur="comprobarInputVacio(event)" type="text" placeholder="email" id="emailRegistro" name="email" value="<?php echo htmlspecialchars($mail); ?>" readonly>
						</div>
						<div class="form-group row">
							<input class="form-control text-center col-md-12" onblur="comprobarInputVacio(event)" type="password" placeholder="contraseña" id="pass1Registro" name="contrasena">
						</div>
						<div class="form-group row">
							<input class="form-control text-center col-md-12" onblur="comprobarInputVacio(event)" type="password" placeholder="repite la contraseña" id="pass2Registro" name="repetirContrasena">
						</div>
						<div class="row">
							<button type="button" class="col-md-12 btn" onclick = "validarFormularioRegistro()" id="botonAceptar" name="aceptar">aceptar</button>
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