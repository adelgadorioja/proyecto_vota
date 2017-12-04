<?php
  function conectarBD(){
    // Conectamos con la BBDD mediante el objeto PDO
    try {
      $GLOBALS['conn'] = new PDO ("mysql:host=localhost;dbname=proyecto_vota;charset=utf8","root","123abc123");
    } catch(PDOException $e) {
      echo "Fallo en la conexión: " . $e->getMessage() . "\n";
    }
  }

  function desconectarBD(){
    // Unseteamos la variable
    unset($GLOBALS['conn']);
  }

  function intentarLogin($usuario, $contrasena) {
    conectarBD();
    $query = $GLOBALS['conn']->prepare('SELECT * FROM usuarios WHERE id_usuario = :usuario AND contrasena = :contrasena');
    $query->bindParam(':usuario', $_POST['usuario']);
    $query->bindParam(':contrasena', $_POST['contrasena']);
    $query->execute();
    if($query->rowCount() != 0) {
      return $query->fetch();
    }
    return null;
  }

  function realizarConsulta($query) {
    // Realiza la conexión y prepara la query pasada como parámetro
    conectarBD();
    $resultado = $GLOBALS['conn']->prepare($query);
    try {
      // Realiza la query
      $resultado->execute();
      return $resultado;
    } catch (PDOException $e) {
      echo "Fallo al realizar la consulta: " . $e->getMessage() . "\n";
      desconectarBD();
    }
  }

  function insertarElemento($query) {
    // Realiza la conexión y prepara la query pasada como parámetro
    conectarBD();
    $resultado = $GLOBALS['conn']->prepare($query);
    try {
      // Realiza la query
      $resultado->execute();
    } catch (PDOException $e) {
      echo "Fallo al insertar el elemento: " . $e->getMessage() . "\n";
      desconectarBD();
    }
    desconectarBD();
  }

  function iniciarSesion($usuario, $tipoUsuario) {
    // Guarda las variables del usuario en variables SESSION
    session_start();
    $_SESSION['usuario'] = $usuario;
    $_SESSION['tipoUsuario'] = $tipoUsuario;
  }

  function cerrarSesion() {
    // Elimina la sesión del usuario
    session_start();
    unset($_SESSION['usuario']);
    session_destroy();
  }

  function comprobarSesionIniciada() {
    // Comprueba que el usuario ha iniciado sesión y devuelve true o false
    session_start();
    if (isset($_SESSION['usuario'])) {
      return true;
    }
    return false;
  }

  function crearConsulta($consulta, $usuario, $fechaInicio, $fechaExpiracion){
    // Inserta una consulta en BBDD
    $crearConsulta = "INSERT INTO consultas VALUES (NULL,'$consulta','$usuario', '$fechaInicio', '$fechaExpiracion')";
    insertarElemento($crearConsulta);
  }

  function obtenerConsulta($idConsulta) {
    // Obtiene una consulta de la BBDD buscándola por ID
    $obtenerConsulta = realizarConsulta("SELECT des_pregunta from consultas WHERE id_consulta =".$idConsulta);
    $consulta = $obtenerConsulta->fetch();
    return $consulta['des_pregunta'];
  }

  function obtenerTodasConsultas($usuario) {
    // Obtiene todas las consultas de la BDD y las devuelve en una array
    $consultas = [];
    $obtenerTodasConsultas = realizarConsulta("SELECT * from consultas where id_usuario = '$usuario'");
    $consulta = $obtenerTodasConsultas->fetch();
    while ($consulta) {
      $consulta = [0=> $consulta['des_pregunta'], 1=>$consulta['id_usuario'], 2=>$consulta['fecha_inicio'], 3=>$consulta['fecha_final'], 4=>$consulta['id_consulta']];
      array_push($consultas, $consulta);
      $consulta = $obtenerTodasConsultas->fetch();
    }
    return $consultas;
  }

  function obtenerOpciones($idConsulta) {
    // Obtiene las opciones de una consulta de la BBDD buscándola por ID de consulta y las devuelve en una array
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
    // Inserta una votación en BBDD
    $realizarVotacion = "INSERT INTO votos VALUES(NULL, '$idOpcion', '$usuario')";
    insertarElemento($realizarVotacion);
  }

  function cojerRespuestas($array){
    // Extrae las respuestas de la array pasada (todos los inputs)
    $arrayRespuestas = array();
    foreach ($array as $llave => $valor) {
        if (strpos($llave, 'respuesta') !== false) {
          $arrayRespuestas[] = $valor;
      }
    }
    return ($arrayRespuestas);
  }

  function anadirOpciones($arrayOpciones, $des_consulta){
    // Obtiene el ID de la consulta por la descripción de la consulta
    $idConsulta = realizarConsulta("SELECT id_consulta from consultas WHERE des_pregunta ='".$des_consulta."'");
    $idConsulta = $idConsulta->fetch();
    $idConsulta = $idConsulta['id_consulta'];
    for ($i=0; $i < sizeof($arrayOpciones); $i++) { 
      // Inserta tantas opciones como haya creado el usuario en BBDD
      $anadirOpciones = "INSERT INTO opciones VALUES(NULL, '$idConsulta', '".$arrayOpciones[$i]."')";
      insertarElemento($anadirOpciones);
    }
  }
?>