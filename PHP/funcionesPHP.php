<?php
  function conectarBD(){
    try {
      $GLOBALS['conn'] = new PDO ("mysql:host=localhost;dbname=proyecto_vota","root","123abc123");
    } catch(PDOException $e) {
      echo "Fallo en la conexión: " . $e->getMessage() . "\n";
      exit;
    }
  }

  function desconectarBD(){
    exit;
    unset($GLOBALS['conn']);
  }

  function realizarConsulta($query) {
    conectarBD();
    $resultado = $GLOBALS['conn']->prepare($query);
    try {
      $resultado->execute();
      return $resultado;
    } catch (PDOException $e) {
      echo "Fallo al realizar la consulta: " . $e->getMessage() . "\n";
      desconectarBD();
    }
    desconectarBD();
  }

  function insertarElemento($query) {
    conectarBD();
    $resultado = $GLOBALS['conn']->prepare($query);
    try {
      $resultado->execute();
    } catch (PDOException $e) {
      echo "Fallo al insertar el elemento: " . $e->getMessage() . "\n";
      desconectarBD();
    }
    desconectarBD();
  }

  function iniciarSesion($usuario) {
    session_start();
    $_SESSION['usuario'] = $usuario;
  }

  function cerrarSesion() {
    session_start();
    unset($_SESSION['usuario']);
    session_destroy();
  }

  function comprobarSesionIniciada() {
    session_start();
    if (isset($_SESSION['usuario'])) {
      return true;
    }
    return false;
  }

  function crearConsulta($consulta, $usuario, $fechaInicio, $fechaExpiracion){
    $crearConsulta = "INSERT INTO consultas VALUES (NULL,'$consulta','$usuario', '$fechaInicio', '$fechaExpiracion')";
    insertarElemento($crearConsulta);
    exit;
  }
?>