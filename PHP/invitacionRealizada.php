<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Votaciones VOTA</title>
	<link rel="stylesheet" type="text/css" href="../reset.css">
	<link rel="stylesheet" type="text/css" href="../style.css">
</head>
<body>
	<?php
		// Import del archivo funciones.php
		include 'funcionesPHP.php';
		if (!comprobarSesionIniciada()) {
			// Redirigimos al usuario que no haya iniciado sesión antes
			header('Location: ../index.php');
		}

		$destinatario = $_POST['email'];
		$asunto = "Has sido invitado a votar!";
		$cuerpo = "Hola, has sido invitado a votar en una consulta.\nSi estas interesado entra en el enlace proporcionado:\n\nhttps://www.marcguerra.ga/proyecto_vota/index.php\n\nEsperamos haber sido de su ayuda.\n\nCopyright © 2017 by proyectoVota";

		mail($destinatario, $asunto, $cuerpo);
	?>
	
	<header>
		<div id="cabecera">
			<a href="inicio.php"><h1>proyecto<span>vota</span></h1></a>
			<nav>
				<a href="inicio.php">inicio</a>
				<a href="creacionConsulta.php">crear consulta</a>
				<a href="realizarInvitacion.php" class="actual">invitar</a>
				<a href="cerrarSesion.php">cerrar sesión</a>
			</nav>
		</div>
	</header>

	<div id="content">
		<div id="lateral">
			<div id="perfil" class="caja">
				<div id="circnav"></div>
				<p id="nombre"><?php echo $_SESSION['usuario']; ?></p>
				<p id="tipoUsuario"><?php echo $_SESSION['tipoUsuario']; ?></p>
			</div>
			<div id="publicidad" class="caja">
				<h3>Publicidad</h3>
				<div id="banner" class="caja">
				</div>
			</div>
		</div>
		<div id="contenido" class="caja">
			<h2>Invitación realizada</h2>
			<p>La invitación se ha realizado correctamente.
		</div>
	</div>

</body>
</html>