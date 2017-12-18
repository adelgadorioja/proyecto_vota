<!-- 

	Nombre fichero: consultaCreada.php
	Creador: Álvaro
	Fecha creación: 29/11/2017
	Funcionalidad: Inserta la consulta con sus respectivas opciones en BBDD.

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

	<?php
		// Import del archivo funciones.php
	include 'funcionesPHP.php';
	if (!comprobarSesionIniciada() || $_SESSION['tipoUsuario'] != "administrador") {
		// Redirigimos al usuario que no haya iniciado sesión antes
		header('Location: ../index.php');
	}
	?>
	
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<div class="container">
				<a class="navbar-brand" href="inicio.php">proyecto<span>vota</span></a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
			<div class="collapse navbar-collapse" id="navegacion">
				<ul class="navbar-nav ml-auto">
					<li class="nav-item">
						<a class="nav-link" href="inicio.php">inicio</a>
					</li>
					<li class="nav-item">
						<a class="nav-link active" href="creacionConsulta.php">crear consulta</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="cerrarSesion.php">cerrar sesión</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>

	<div class="container">

		<div class="row">

			<div class="col-md-12 col-lg-3">
				<div id="perfil" class="caja">
					<div class="row">
						<div class="circle-logo mx-auto"></div>
					</div>
					<h3 class="text-center color-blue"><?php echo $_SESSION['usuario']; ?></h3>
					<h6 class="text-center"><?php echo $_SESSION['tipoUsuario']; ?></h6>
				</div>
				<div class="caja d-none d-lg-block">
					<div class="page-header">
						<h6>Publicidad</h6>
					</div>
					<img src="../IMG/banner.svg" class="img-fluid" alt="Responsive image">
				</div>
			</div>

			<div class="col-md-12 col-lg-9">
				<div class="caja">
					<div class="page-header">
						<h2>Consulta creada</h2>
					</div>
					<p>
						La consulta ha sido creada con éxito.
					</p>
				</div>

			</div>
		</div>
	</div>

	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
</body>
</html>

<?php
	$consulta = $_POST['consulta'];
	$usuario = $_SESSION['usuario'];
	$fecInicio = $_POST['fecInicio'];
	$fecFin = $_POST['fecFin'];
	// Inserta la consulta en BBDD
	crearConsulta($consulta, $usuario, $fecInicio, $fecFin);
	$arrayRespuestas = cojerRespuestas($_POST);
	anadirOpciones($arrayRespuestas,$consulta);
?>