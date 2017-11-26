<?php
  function conectarBD(){
    try {
      $GLOBALS['conn'] = new PDO ("mysql:host=localhost;dbname=proyecto_vota;charset=utf8","root","123abc123");
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

  function iniciarSesion($usuario, $tipoUsuario) {
    session_start();
    $_SESSION['usuario'] = $usuario;
    $_SESSION['tipoUsuario'] = $tipoUsuario;
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

  function obtenerConsulta($idConsulta) {
    $obtenerConsulta = realizarConsulta("SELECT des_pregunta from consultas WHERE id_consulta =".$idConsulta);
    $consulta = $obtenerConsulta->fetch();
    return $consulta['des_pregunta'];
  }

  function obtenerTodasConsultas() {
    $consultas = [];
    $obtenerTodasConsultas = realizarConsulta("SELECT * from consultas");
    $consulta = $obtenerTodasConsultas->fetch();
    while ($consulta) {
      $consulta = [0=> $consulta['des_pregunta'], 1=>$consulta['id_usuario'], 2=>$consulta['fecha_inicio'], 3=>$consulta['fecha_final'], 4=>$consulta['id_consulta']];
      array_push($consultas, $consulta);
      $consulta = $obtenerTodasConsultas->fetch();
    }
    return $consultas;
  }

  function obtenerOpciones($idConsulta) {
    $listaOpciones = [];
    $obtenerOpciones = realizarConsulta("SELECT id_opcion, des_opcion from opciones WHERE id_consulta =".$idConsulta);
    $opcion = $obtenerOpciones->fetch();
    while ($opcion) {
      $opcion = [0=> $opcion['des_opcion'], 1=>$opcion['id_opcion']];
      array_push($listaOpciones, $opcion);
      $opcion = $obtenerOpciones->fetch();
    }
    return $listaOpciones;
  }

  function realizarVotacion($usuario, $idOpcion) {
    $realizarVotacion = "INSERT INTO votos VALUES(NULL, '$idOpcion', '$usuario')";
    insertarElemento($realizarVotacion);
  }
?>