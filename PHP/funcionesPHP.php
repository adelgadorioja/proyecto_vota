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
	  	$fechaexpiración = $_POST['final'];
	  	conectarBD();
	  	$consulta = "INSERT INTO consultas VALUES ('$id','$tituloConsulta', '$fechainicio', '$fechaexpiración')";
 		$resultat = mysqli_query($conn, $consulta);
	  	if (!$resultat){
	   	 	echo "Consulta erronea.";
	  	}else{
	    	echo "Consulta afegida correctament.";
	  	}
	}
?>