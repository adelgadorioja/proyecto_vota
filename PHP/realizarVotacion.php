<!DOCTYPE html>
<html>
<head>
	<title>Votaciones VOTA</title>
	<link rel="stylesheet" type="text/css" href="../reset.css">
	<link rel="stylesheet" type="text/css" href="../style.css">
	<script type="text/javascript" src="../script.js"></script>
</head>
<body onload="setTimeout('mostrarRespuestas()', 2000);">
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
				<a href="creacionConsulta.php">crear consulta</a>
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
			<h2>Realizar votación</h2>
			<div id="mensajeDialog"></div>
			<form method="POST" action="votacionRealizada.php">
				<?php
					$consulta = obtenerConsulta($_GET['idConsulta']);
					echo "<label class='pregunta'>$consulta</label>\n";
					$opciones = obtenerOpciones($_GET['idConsulta']);
					echo "<div id='respuestas'>";
					for ($i=0; $i < sizeof($opciones); $i++) {
						echo "\t\t\t\t<label class='respuesta'>";
						echo "\t\t\t\t<input type='radio' value='".$opciones[$i][1]."' name='opcion'/>\n";
						echo "\t\t\t\t".$opciones[$i][0]."</label>\n";
					}
				?>
				<input type="button" name="aceptar" value="aceptar" onclick="debesVotar()">
				</div>
			</form>
		</div>
		
	</div>

</body>
</html>