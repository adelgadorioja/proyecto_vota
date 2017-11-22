<?php

function realizarConsulta($query) {
  try {
    $hostname = "localhost";
    $dbname = "proyecto_vota";
    $username = "root";
    $pw = "123abc123";
    $pdo = new PDO ("mysql:host=$hostname;dbname=$dbname","$username","$pw");
  } catch (PDOException $e) {
    echo "Fallo en la conexión: " . $e->getMessage() . "\n";
    exit;
  }

  $rs = $pdo->prepare($query);
  $rs->execute();
  return $rs;
  unset($pdo);
}

function crearConsulta(){
  $tituloConsulta = $_POST['titulo'];
  $contrasena = $_POST['contrasena'];
  $rs = realizarConsulta("SELECT * FROM usuarios WHERE id_usuario = '$usuario' AND contrasena = '$contrasena'");
  if ($rs->fetch()) {
    header('Location: ../userPage.php');
  }
  else {
    header('Location: ../index.php');
  }
}
?>