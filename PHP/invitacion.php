<!-- 

	Nombre fichero: invitacion.php
	Creador: Álvaro
	Fecha creación: 11/12/2017
	Funcionalidad: Redirige al usuario en función de la existencia de su email en la BBDD.

-->

<?php

    include 'funcionesPHP.php';
    if (isset($SESSION)) {
    	session_destroy();
    }
	$emailInvitado = $_GET['email'];
	$usuarioExistente = obtenerUsuarioPorEmail($emailInvitado);
	if ($usuarioExistente == null) {
		header('Location: registro.php?email='.$emailInvitado.'');
	} else {
		header('Location: ../index.php');
	}

?>