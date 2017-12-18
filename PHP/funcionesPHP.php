<!-- 

  Nombre fichero: funcionesPHP.php
  Creador: Álvaro
  Fecha creación: 27/11/2017
  Funcionalidad: Contiene todas las funciones necesarias para el desarrollo de la aplicación.

-->

<?php

  /*
    Descripción: realiza la conexión a la BBDD.
    Parámetros de entrada: -
    Valor de retorno: -
  */
  function conectarBD(){
    try {
      $GLOBALS['conn'] = new PDO ("mysql:host=localhost;dbname=proyecto_vota;charset=utf8","root","123abc123");
    } catch(PDOException $e) {
      echo "Fallo en la conexión: " . $e->getMessage() . "\n";
    }
  }

  /*
    Descripción: elimina la conexión a la BBDD.
    Parámetros de entrada: -
    Valor de retorno: -
  */
  function desconectarBD(){
    unset($GLOBALS['conn']);
  }

  /*
    Descripción: comprueba que los datos introducidos por el usuario en el Login sean correctos.
    Parámetros de entrada: identificador de usuario (string) y contraseña (string).
    Valor de retorno: datos del usuario (si existe) o null (no existe).
  */
  function intentarLogin($usuario, $contrasena) {
    conectarBD();
    $contrasenaEncriptada = hash('sha256', hash('sha256', $contrasena));
    $query = $GLOBALS['conn']->prepare('SELECT * FROM usuarios WHERE id_usuario = :usuario AND contrasena = :contrasena');
    $query->bindParam(':usuario', $usuario);
    $query->bindParam(':contrasena', $contrasenaEncriptada);
    $query->execute();
    if($query->rowCount() != 0) {
      return $query->fetch();
    }
    return null;
  }

  /*
    Descripción: realiza una consultra a la BBDD.
    Parámetros de entrada: sentencia SQL (string).
    Valor de retorno: resultado de la consulta (string).
  */
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
  }

  /*
    Descripción: inserta un elemento a la BBDD.
    Parámetros de entrada: sentencia SQL (string).
    Valor de retorno: -
  */
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

  /*
    Descripción: guarda los datos proporcionados por el usuario en variables SESSION.
    Parámetros de entrada: identificador del usuario (string), tipo de usuario (string) y contraseña (string).
    Valor de retorno: -
  */
  function iniciarSesion($usuario, $tipoUsuario, $contrasena) {
    session_start();
    $contrasenaEncriptada = hash('sha256', $contrasena);
    $_SESSION['usuario'] = $usuario;
    $_SESSION['tipoUsuario'] = $tipoUsuario;
    $_SESSION['contrasena'] = $contrasenaEncriptada;
  }

  /*
    Descripción: elimina el contenido de la variable usuario de SESSION.
    Parámetros de entrada: -
    Valor de retorno: -
  */
  function cerrarSesion() {
    session_start();
    unset($_SESSION['usuario']);
    session_destroy();
  }

  /*
    Descripción: comprueba que el usuario haya iniciado sesión.
    Parámetros de entrada: -
    Valor de retorno: true (ha iniciado sesión) o false (no ha iniciado sesión).
  */
  function comprobarSesionIniciada() {
    session_start();
    if (isset($_SESSION['usuario'])) {
      return true;
    }
    return false;
  }

  /*
    Descripción: busca un usuario por email en BBDD.
    Parámetros de entrada: email a buscar (string).
    Valor de retorno: usuario con el email especificado (si existe) o null (no existe).
  */
  function obtenerUsuarioPorEmail($email) {
    $obtenerUsuario = realizarConsulta("SELECT * from usuarios WHERE email = '$email'");
    if($obtenerUsuario->rowCount() != 0) {
      return $obtenerUsuario->fetch();
    }
    return null;
  }

  /*
    Descripción: busca un usuario por identificador en BBDD.
    Parámetros de entrada: identificador a buscar (string).
    Valor de retorno: usuario con el identificador especificado (si existe) o null (no existe).
  */
  function obtenerUsuarioPorId($idUsuario) {
    $obtenerUsuario = realizarConsulta("SELECT * from usuarios WHERE id_usuario = '$idUsuario'");
    if($obtenerUsuario->rowCount() != 0) {
      return $obtenerUsuario->fetch();
    }
    return null;
  }

  /*
    Descripción: inserta una consulta en BBDD.
    Parámetros de entrada: consulta (string), identificador de usuario (string), fecha de inicio (dateTime) y fecha fin (dateTIme).
    Valor de retorno: -
  */
  function crearConsulta($consulta, $usuario, $fechaInicio, $fechaExpiracion){
    $crearConsulta = "INSERT INTO consultas VALUES (NULL,'$consulta','$usuario', '$fechaInicio', '$fechaExpiracion')";
    insertarElemento($crearConsulta);
  }

  /*
    Descripción: busca una consulta de BBDD por identificador de consulta.
    Parámetros de entrada: identificador de consulta (int).
    Valor de retorno: descripción de la consulta (string).
  */
  function obtenerConsulta($idConsulta) {
    $obtenerConsulta = realizarConsulta("SELECT des_pregunta from consultas WHERE id_consulta =".$idConsulta);
    $consulta = $obtenerConsulta->fetch();
    return $consulta['des_pregunta'];
  }

  /*
    Descripción: obtiene todas las consultas de la BBDD de un usuario en concreto.
    Parámetros de entrada: sentencia SQL (string).
    Valor de retorno: lista de consultas (array).
  */
  function obtenerTodasConsultas($usuario) {
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

  /*
    Descripción: obtiene las consultas pendientes de un usuario en concreto.
    Parámetros de entrada: identificador de usuario (string).
    Valor de retorno: lista de consultas (array).
  */
  function obtenerConsultasPendientes($usuario) {
    $consultas = [];
    $obtenerConsultasPendientes = realizarConsulta("SELECT * from consultas cons JOIN invitaciones inv ON cons.id_consulta = inv.id_consulta WHERE inv.email_invitado = (SELECT email FROM usuarios WHERE id_usuario = '$usuario') AND inv.pendiente = 'T';");
    $consulta = $obtenerConsultasPendientes->fetch();
    while ($consulta) {
      $consulta = [0=> $consulta['des_pregunta'], 1=>$consulta['id_usuario'], 2=>$consulta['fecha_inicio'], 3=>$consulta['fecha_final'], 4=>$consulta['id_consulta']];
      array_push($consultas, $consulta);
      $consulta = $obtenerConsultasPendientes->fetch();
    }
    return $consultas;
  }

  /*
    Descripción: comprueba si una consulta está pendiente para un usuario.
    Parámetros de entrada: identificador de usuario (string) e identificador de consulta (int).
    Valor de retorno: true (está pendiente) o false (no está pendiente).
  */
  function comprobarConsultaPendiente($usuario, $idConsulta) {
    $consulta = realizarConsulta("SELECT pendiente FROM invitaciones WHERE id_consulta = '$idConsulta' AND email_invitado = (SELECT email FROM usuarios WHERE id_usuario = '$usuario')");
    if($consulta->rowCount() != 0) {
      $consulta->fetch();
      if ($consulta == "T") {
        return true;
      }
    }
    return false;
  }

  /*
    Descripción: consulta a la BBDD qué voto había realizado un usuario.
    Parámetros de entrada: identificador de usuario (string), identificador de consulta (int) y contraseña (string).
    Valor de retorno: voto realizado (int).
  */
  function recuperarVotoRealizado($usuario, $idConsulta, $contrasena) {
    $contrasena = hash('sha256', $contrasena);
    $opcionEscogida = realizarConsulta("SELECT AES_DECRYPT(id_opcion, '$contrasena') 'id_opcion' FROM votos WHERE id_consulta = '$idConsulta' AND id_usuario = '$usuario' ORDER BY id_voto DESC");
    $resultado = $opcionEscogida->fetch();
    return $resultado['id_opcion'];
  }

  /*
    Descripción: obtiene las consultas que ya hayan sido votadas por un usuario.
    Parámetros de entrada: identificador de usuario (string).
    Valor de retorno: lista de consultas votadas (array).
  */
  function obtenerConsultasVotadas($usuario) {
    $consultas = [];
    $obtenerConsultasPendientes = realizarConsulta("SELECT * from consultas cons JOIN invitaciones inv ON cons.id_consulta = inv.id_consulta WHERE inv.email_invitado = (SELECT email FROM usuarios WHERE id_usuario = '$usuario') AND inv.pendiente = 'F';");
    $consulta = $obtenerConsultasPendientes->fetch();
    while ($consulta) {
      $consulta = [0=> $consulta['des_pregunta'], 1=>$consulta['id_usuario'], 2=>$consulta['fecha_inicio'], 3=>$consulta['fecha_final'], 4=>$consulta['id_consulta']];
      array_push($consultas, $consulta);
      $consulta = $obtenerConsultasPendientes->fetch();
    }
    return $consultas;
  }

  /*
    Descripción: cuenta los votos que tiene una opción.
    Parámetros de entrada: identificador de la opción (int).
    Valor de retorno: votos de la opción (int).
  */
  function contarVotos($idOpcion) {
    $contadorVotos = realizarConsulta("SELECT count(*) FROM votos v WHERE AES_DECRYPT(id_opcion, (SELECT CONTRASENA FROM usuarios u WHERE u.id_usuario = v.id_usuario))=".$idOpcion);
    return $contadorVotos->fetch();
  }

  /*
    Descripción: obtiene las opciones de una consulta.
    Parámetros de entrada: identificador de la consulta (int).
    Valor de retorno: lista de opciones (array).
  */
  function obtenerOpciones($idConsulta) {
    $listaOpciones = [];
    $obtenerOpciones = realizarConsulta("SELECT id_opcion, des_opcion FROM opciones WHERE id_consulta =".$idConsulta);
    $opcion = $obtenerOpciones->fetch();
    while ($opcion) {
      $opcion = [0=> $opcion['des_opcion'], 1=>$opcion['id_opcion']];
      array_push($listaOpciones, $opcion);
      $opcion = $obtenerOpciones->fetch();
    }
    return $listaOpciones;
  }

  /*
    Descripción: inserta una votación en BBDD.
    Parámetros de entrada: identificador del usuario (string), identificador de la opción (int) e identificador de la consulta (id).
    Valor de retorno: -
  */
  function realizarVotacion($usuario, $idOpcion, $idConsulta) {
    $contrasena = hash('sha256', $_SESSION['contrasena']);
    $realizarVotacion = "INSERT INTO votos VALUES(NULL, AES_ENCRYPT('$idOpcion', '".$contrasena."'), '$usuario', '$idConsulta')";
    insertarElemento($realizarVotacion);
  }

  /*
    Descripción: extrae las respuestas de la lista pasada como parámetro.
    Parámetros de entrada: lista de inputs (array).
    Valor de retorno: lista de respuestas (array).
  */
  function cojerRespuestas($array){
    $arrayRespuestas = array();
    foreach ($array as $llave => $valor) {
        if (strpos($llave, 'respuesta') !== false) {
          $arrayRespuestas[] = $valor;
      }
    }
    return ($arrayRespuestas);
  }

  /*
    Descripción: inserta las opciones en BBDD.
    Parámetros de entrada: lista de opciones (array), descripción de la pregunta (string).
    Valor de retorno: -
  */
  function anadirOpciones($arrayOpciones, $des_consulta){
    $idConsulta = realizarConsulta("SELECT id_consulta from consultas WHERE des_pregunta ='".$des_consulta."'");
    $idConsulta = $idConsulta->fetch();
    $idConsulta = $idConsulta['id_consulta'];
    for ($i=0; $i < sizeof($arrayOpciones); $i++) { 
      // Inserta tantas opciones como haya creado el usuario en BBDD
      $anadirOpciones = "INSERT INTO opciones VALUES(NULL, '$idConsulta', '".$arrayOpciones[$i]."')";
      insertarElemento($anadirOpciones);
    }
  }

  /*
    Descripción: inserta un usuario en BBDD.
    Parámetros de entrada: identificador de usuario (string), email (string), contrasena (string).
    Valor de retorno: -
  */
  function registrarUsuario($usuario, $email, $contrasena) {
    $contrasenaEncriptada = hash('sha256', hash('sha256', $contrasena));
    insertarElemento("INSERT INTO usuarios (id_usuario, email, contrasena) VALUES ('$usuario', '$email', '$contrasenaEncriptada')");
  }
?>