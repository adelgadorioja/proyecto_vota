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
  
}
?>