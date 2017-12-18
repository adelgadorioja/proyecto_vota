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