<?php
	function conectarBD(){
		$GLOBALS['conn'] = mysqli_connect('localhost','root','123abc123');
		mysqli_select_db($GLOBALS['conn'], 'proyecto_vota');
	}
	function realizarConsulta($query) {
		conectarBD();
		$resultat = mysqli_query($GLOBALS['conn'], $query) or die(mysql_error());
		return $resultat;
	}
	function crearConsulta(){
	  	$tituloConsulta = $_POST['titulo'];
	  	$fechainicio = $_POST['inicio'];
	  	$fechaexpiracion = $_POST['final'];
	  	conectarBD();
	  	$consulta = "INSERT INTO consultas VALUES 
	  				(NULL,'$tituloConsulta','tercera','funka', '$fechainicio', '$fechaexpiracion')";
 		$resultat = mysqli_query($GLOBALS['conn'], $consulta);
	}
	if (isset($_POST['titulo'])) {
		crearConsulta();
	}
?>