<!DOCTYPE html>
<html>
<head>
	<title>REALIZAR VOTACIÓN</title>
</head>
<body>

	<?php
		include 'funcionesPHP.php';
		if (!comprobarSesionIniciada()) {
			header('Location: ../index.php');
		}

		$consulta = obtenerConsulta($_GET['idConsulta']);
		echo "<label>$consulta</label>\n";

		$opciones = obtenerOpciones($_GET['idConsulta']);
		for ($i=0; $i < sizeof($opciones); $i++) { 
			echo "\t<input type='radio' value='".$opciones[$i]."' name='opcion'>".$opciones[$i]."</input>\n";
		}
	?>

</body>
</html>