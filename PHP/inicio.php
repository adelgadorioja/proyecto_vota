<!DOCTYPE html>
<html>
<head>
	<title>Votaciones VOTA</title>
	<link rel="stylesheet" type="text/css" href="../reset.css">
	<link rel="stylesheet" type="text/css" href="../style.css">
	<script type="text/javascript" src="../script.js"></script>
	<meta charset="utf-8">
</head>
<body>
	<?php
		// Import del archivo funciones.php
		include 'funcionesPHP.php';
		if (!comprobarSesionIniciada()) {
			// Redirigimos al usuario que no haya iniciado sesión antes
			header('Location: ../index.php');
		}
	?>
	
	<header>
		<div id="cabecera">
			<a href="inicio.php"><h1>proyecto<span>vota</span></h1></a>
			<nav>
				<a href="inicio.php" class="actual">inicio</a>
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
			<div id="publicidad" class="caja">
				<h3>Publicidad</h3>
				<div id="banner"></div>
			</div>
		</div>
		<div id="contenido" class="caja">
			<h2>Consultas</h2>
			<table>
				<th class="redondeado">Pregunta</th>
				<th>Usuario creador</th>
				<th>Fecha inicio</th>
				<th class="redondeado">Fecha fin</th>
				<?php
					// Obtenemos todas las consultas de la BBDD
					$consultas = obtenerTodasConsultas();
					for ($i=0; $i < sizeof($consultas); $i++) { 
						// Las printamos por pantalla
						echo "<tr onclick='redirigirConsulta(".$consultas[$i][4].")'>";
						echo "<td>".$consultas[$i][0]."</td>";
						echo "<td>".$consultas[$i][1]."</td>";
						echo "<td>".$consultas[$i][2]."</td>";
						echo "<td>".$consultas[$i][3]."</td>";
						echo "</tr>";
					}
				?>
			</table>
		</div>
		
	</div>

</body>
</html>