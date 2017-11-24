<!DOCTYPE html>
<html>
<head>
	<title>Votaciones VOTA</title>
	<link rel="stylesheet" type="text/css" href="../reset.css">
	<link rel="stylesheet" type="text/css" href="../style.css">
</head>
<body>
	<?php
		include 'funcionesPHP.php';
		if (!comprobarSesionIniciada()) {
			header('Location: ../index.php');
		}
	?>
	
	<header>
		<div id="cabecera">
			<a href="inicio.php"><h1>proyecto<span>vota</span></h1></a>
			<nav>
				<a href="inicio.php">inicio</a>
				<a href="creacionConsulta.php" class="actual">crear consulta</a>
				<a href="realizarInvitacion.php">invitar</a>
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
		</div>
		<div id="contenido" class="caja">
			<h2>Crear consulta</h2>
			<form action="consultaCreada.php" method="POST">
				<label>Pregunta</label> <input type="text" name="consulta">
				<label>Fecha de inicio</label> <input type="date" name="fecInicio">
				<label>Fecha de cierre</label> <input type="date" name="fecFin">
				<input type="submit" value="Crear consulta">
			</form>
		</div>
		
	</div>

</body>
</html>