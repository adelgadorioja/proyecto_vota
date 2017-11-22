<?php
include 'funcionesPHP.php';

$usuario = $_POST['usuario'];
$contrasena = $_POST['contrasena'];
$rs = realizarConsulta("SELECT * FROM usuarios WHERE id_usuario = '$usuario' AND contrasena = '$contrasena'");
if ($rs->fetch()) {
  echo "Hola";
}
else {
  echo "Adiós";
}
?>