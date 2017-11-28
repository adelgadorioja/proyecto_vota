var numRes = 0;
//con esta funcion obtengo el id de la consulta que se ha clicado y redirigo la pagina a la de votacion, pasandole el id de la consulta
function redirigirConsulta(idConsulta) {
	location.href ="realizarVotacion.php?idConsulta="+idConsulta;
}
// Viendo que necessitamos insertar varios elementos, hemos creado esta funcion llamada cada vez que añadimos un nuevo elemento.
// Más adelante vimos que solo necesitabamos insertar el formulario pero aun asi creemos 
//que esta bien tener esta funcion separada para un posible uso futuro.
function insertarElemento(tag,elemento){
	// lo que estoy haciendo es cojer el tag padre del hermano del elemento que queremos insertar, y estoy insertando el elemento a continuacion del hermano
	elemento.parentNode.insertBefore(tag, elemento.nextSibling);
}
// con esta funcion creo el formulario
// esta funcion es llamada en el onclick de un boton
function mostrarConsulta(){
	//cojo el botón que llama ésta funcion y lo desactivo para que solo se puedan crear dos consultas a la vez
	var hermano = document.getElementsByTagName("button")[0];
	hermano.disabled = true;
	
	//creo el elemento form y le añado los atributos necesarios
    var form = document.createElement("form");
    form.setAttribute("name","formulario");
    form.setAttribute("action","consultaCreada.php");
    form.setAttribute("method","post");
    form.setAttribute("id","formularioCrearConsulta");
    	// EL SIGUIENTE CODIGO ESTA INDENTADO PARA HACER MAS ENTENDIBLE QUE VA DENTRO DEL TAG FORM
    	//creo los labels y cajas de texto para añadir el titulo de la consulta y la fecha de inicio y fin,
    	//ademas de añadirles los atributos necesarios

	    var label = document.createElement("label");
	    var textoLabel = document.createTextNode("Consulta");
	    //todos los .appendChild() añaden un elemento dentro de otro (tag dentro de tag o texto dentro de tag)
	    label.appendChild(textoLabel);
	    form.appendChild(label);

	    var input = document.createElement("input");
	    input.setAttribute("type","text");
	    input.setAttribute("name","consulta");
	    //llamo a la funcion que comprueba que no esté vacío el input, y en caso afirmativo lo pone en rojo
	    input.setAttribute("onblur","comprobarInputVacio(event)");
    	form.appendChild(input);

    	var br = document.createElement("br");
    	form.appendChild(br);

    	var label2 = document.createElement("label");
	    textoLabel = document.createTextNode("Fecha de inicio");
	    label2.appendChild(textoLabel);
	    form.appendChild(label2);

	    var input2 = document.createElement("input");
	    // tipo fecha porque es el input de la fecha de inicio de la consulta
	    input2.setAttribute("type","date");
	    input2.setAttribute("name","fecInicio");
	    //llamo a la funcion que comprueba que no esté vacío el input, y en caso afirmativo lo pone en rojo
	    input2.setAttribute("onblur","comprobarInputVacio(event)");
    	form.appendChild(input2);

    	var label3 = document.createElement("label");
    	textoLabel = document.createTextNode("Fecha de expiración");
	    label3.appendChild(textoLabel);
	    form.appendChild(label3);

	    var input3 = document.createElement("input");
	    // tipo fecha porque es el input de la fecha de fin de la consulta
	    input3.setAttribute("type","date");
	    input3.setAttribute("name","fecFin");
	    //llamo a la funcion que comprueba que no esté vacío el input, y en caso afirmativo lo pone en rojo
	    input3.setAttribute("onblur","comprobarInputVacio(event)");
    	form.appendChild(input3);

    	var br2 = document.createElement("br");
    	form.appendChild(br2);

    	var button = document.createElement("button");
	    var textoButton = document.createTextNode("Añadir respuestas");
	    // establezco el "type" a "button" porque sino se envia el formulario automáticamente
	    button.setAttribute("type","button");
	    button.setAttribute("id","botonSiguiente");
    	button.appendChild(textoButton);
    	//llamo a la funcion que comprueba que todo esté rellenado y sea válido
    	// en caso afirmativo habilito el apartado para añadir las respuestas de la consulta
	    button.setAttribute("onclick","comprobarCampos()")
    	form.appendChild(button);

    	//llamo a la funcion que crea los botones para añadir/borrar respuestas
    	//es una funcion aparte porque los botones forman parte de la siguiente seccion del formulario
    	botonesRespuestas(form);
    //finalmente llamo a la funcion que inserta el formulario en la página
    insertarElemento(form,hermano);
}
// creo los botones de añadir/borrar respuestas
function botonesRespuestas(form){
	//creo el boton de añadir respuesta
    var button = document.createElement("button");
    var textoButton = document.createTextNode("Añadir respuesta");
    button.appendChild(textoButton);
    // de nuevo, el "type" lo establezco a "button" para que no se envie el formulario en el onclick
    button.setAttribute("type","button");
    // pongo el disabled a true para que el boton no sea accesible hasta que otra funcion comprueba que
    // los primeros inputs introducidos son válidos, entonces el disabled lo establezco a false
    button.disabled = true;
    button.setAttribute("onclick","anadirRespuesta(form)");
    button.setAttribute("class","botonRespuesta");
    form.appendChild(button);
    //creo el boton para borrar las respuestas, en el onclick llamara a la funcion borrarRespuestas(),
    // que es la funcion encargada de borrar los inputs y los labels
    var button2 = document.createElement("button");
    // de nuevo, el "type" lo establezco a "button" para que no se envie el formulario en el onclick
    button2.setAttribute("type","button");
    button2.setAttribute("class","botonRespuesta floatDerecha");
  	button2.setAttribute("onclick","borrarRespuestas()");
  	textoButton = document.createTextNode("Borrar respuestas");
    button2.appendChild(textoButton);
    // pongo el disabled a true para que el boton no sea accesible hasta que otra funcion comprueba que
    // los primeros inputs introducidos son válidos, entonces el disabled lo establezco a false
  	button2.disabled = true;
    form.appendChild(button2);
    //creo el boton que envia el formulario
    var input = document.createElement("input");
    input.disabled = true;
    //en este caso el "type" es "button" porque antes de enviar el formulario compruebo que ninguna respuesta esté vacía
    input.setAttribute("type","button");
    input.setAttribute("value","Finalizar");
    //aqui compruebo que ningun campo está vacío
    input.setAttribute("onclick","comprobarCampos()");
    input.setAttribute("class","botonRespuesta");
    form.appendChild(input);
}
function anadirRespuesta(form){
	//variable global para controlar el numero de respuestas
	numRes++;
	//cojo todos los inputs para luego filtrar y tener solo el ultimo
	var inputs = document.getElementsByTagName("input");
	var inputFinal = inputs[inputs.length-1];
	//creo el label de la respuesta
	var label = document.createElement("label");
	label.setAttribute("class","labelrespuesta");
	// el label contiene el string "respuesta" y la variable numRes que suma 1 a cada respuesta creada
    textoLabel = document.createTextNode("Respuesta "+numRes+":");
    label.appendChild(textoLabel);
    inputFinal.parentNode.insertBefore(label, inputFinal);
    //creo el input para escribir la respuesta
    var input = document.createElement("input");
    input.setAttribute("type","text");
    // cada respuesta tendrá un nombre diferente para poder coger cada respuesta por separado más fácilmente más adelante
    input.setAttribute("name","respuesta"+numRes);
    input.setAttribute("class","respuesta");
    input.setAttribute("onblur","comprobarInputVacio(event)");
    inputFinal.parentNode.insertBefore(input, inputFinal);
	//cojo el boton para borrar respuestas y lo habilito, ya que en este momento se que existira alguna respuesta
    var borrarRespuestas = document.getElementsByClassName("floatDerecha")[0];
    borrarRespuestas.disabled = false;
    //cuando existan dos respuestas como minimo, se habilitia el boton que envia el formulario
	if (numRes >= 2) {
		inputFinal.disabled = false;
	}
}
function borrarRespuestas(){
	// reseteo el contador con el numero de respuestas a 0 para que la siguiente respuesta que se añada sea la 1
	numRes = 0;

	//cojo las cajas de texto para las respuestas por la clase y los borro 
	var inputsRespuestas = document.getElementsByClassName("respuesta");
	for (var i = inputsRespuestas.length - 1; i >= 0; i--) {
		// con éste workaround no necesitas saber el padre ya que el .parentNode te lo da automáticamente
		inputsRespuestas[i].parentNode.removeChild(inputsRespuestas[i]);
	}
	//cojo los labels para las respuestas por la clasey los borro 
	var labelsRespuestas = document.getElementsByClassName("labelrespuesta");
	for (var i = labelsRespuestas.length - 1; i >= 0; i--) {
		labelsRespuestas[i].parentNode.removeChild(labelsRespuestas[i]);
	}
	//cojo los inputs, lo filtro para tener el ultimo (el boton finalizar), y lo inhabilito ya que 
	//en este momento se que no existe ninguna respuesta
	var inputs = document.getElementsByTagName("input");
	var inputFinal = inputs[inputs.length-1];
	inputFinal.disabled = true;
	//inhabilito el boton que borra las respuestas
	var borrarRespuestas = document.getElementsByClassName("floatDerecha")[0];
    borrarRespuestas.disabled = true;
}
// muestro las respuestas en la página para votar
function mostrarRespuestas() {
	var respuestas = document.getElementById("respuestas");
	respuestas.style.maxHeight = respuestas.scrollHeight + "px";
}
//funcion llamada en el onblur de cada input del form, para que aparezca el input en rojo y un mensaje de alerta
function comprobarInputVacio(event) {
	//cojo el input 
	input = event.currentTarget;
	dialog = document.getElementById("mensajeDialog");
	textoDialog = document.getElementById("mensajeDialog").textContent;
	if (input.value == "") {
		//si el input esta vacío lo pongo en rojo y muestro el mensaje de error
		input.style.border= "1px solid red";
		mensajeError("El campo '" + input.name + "' es obligatorio.");
	}
	else {
		//si el input esta lleno no muestro nada
		document.getElementById("mensajeDialog").textContent = "";
		dialog.style.display = "hidden";
		dialog.style.padding = "0em";
		dialog.style.marginBottom = "0em";
		input.style.border= "1px solid #333";
	}
}
//funcion llamada en muchas ocasiones (validacion de fechas, de inputs vacíos...)
function mensajeError(mensaje){
	//cojo el texto que hay en el div que utilizamos para mostrar el mensaje de error y lo vacío
	dialog = document.getElementById("mensajeDialog");
	textoDialog = document.getElementById("mensajeDialog").textContent;
	document.getElementById("mensajeDialog").textContent = "";
	//le añado al div el mensaje pasado en el parametro de la funcion
	textoDialog	= document.createTextNode(mensaje);
	dialog.appendChild(textoDialog);
	//muestro el div
	dialog.style.display = "block";
	dialog.style.padding = "0.5em";
	dialog.style.marginBottom = "1em";	
}
//funcion utilizada para comrobar que todos los campos tienen contenido
function comprobarCampos(){
	//cojo los todos inputs y los inputs de las respuestas
	var campos = document.getElementsByTagName("input");
	var respuestas = document.getElementsByClassName("respuesta");
	//este es el condicionante para que salte un aviso o todo esté correcto
	var formularioValido = true;
	//si algun campo está vacío seteamos el formulario a false
	for (var i = 0; i < campos.length; i++) {
		if (campos[i].value == "") {
			formularioValido = false;
			//llamamos a la funcion que muestra el mensaje de error que le pasamos
			mensajeError("Debes rellenar todos los campos.");
			break;
		}
	}
	//si el formulario tiene todo relleno pero no existen respuestas validamos que las fechas introducidas sean validas
	if (formularioValido == true && respuestas.length == 0) {
		validacionFechas1();
	}
	//si el formulario tiene todo relleno y existen dos respuestas lo enviamos
	if (formularioValido == true && respuestas.length>=2) {
		document.forms["formulario"].submit();
	}
}
//habilito la segunda parte del formulario
function habilitarBotones(){
	//cojo todos los botones
	var botones = document.getElementsByTagName("button");
	//los que estan inhabilitados los habilito y viceversa (menos el último que continua inhabilitado)
	for (var i = 1; i < botones.length-1; i++) {
		if(botones[i].disabled == true){
			botones[i].disabled = false;
		}else{
			botones[i].disabled = true;
		}
	}
}
//una vez pasada a la parte de añadir respuestas inhabilito los primeros botones para que no se puedan modificarp
function deshabilitarPrimerosInputs(){
	var consulta = document.forms["formulario"]["consulta"];
	var fecInicio = document.forms["formulario"]["fecInicio"];
	var fecFin = document.forms["formulario"]["fecFin"];
	//para inhabilitarlos uso el atributo readonly, ya que si usara el disabled el php no detectaria nada
	consulta.setAttribute("readonly","true");
	fecInicio.setAttribute("readonly","true");
	fecFin.setAttribute("readonly","true");
}
//esta es la funcion principal de validacion de fechas, desde aquí llamamos a las  demás funciones que validan la fecha
function validacionFechas1(){
	//cojemos la fecha de hoy para usarla mas adelante para comparar
	var hoy = new Date();
	var dia = hoy.getDate();
	var mes = hoy.getMonth() + 1;
	var año = hoy.getFullYear();
	hoy = año + "-" + mes + "-" + dia;
	//cojemos la fecha de inicio y de fin y las separamos para evaluar cada unidad por separado
	var fecInicio = document.forms["formulario"]["fecInicio"].value;
	var fecFin = document.forms["formulario"]["fecFin"].value;
	var fecInicioSeparada = fecInicio.split("-");
	var fecFinSeparada = fecFin.split("-");
	//estos ifs/else if validan que todo sea correcto, en caso afirmativo, inhabilito los primeros inputs
	// y habilito los segundos
	if (!esFechaValida(fecInicio) || !esFechaValida(fecFin)){
		mensajeError("El formato de la fecha introducida no es válido.");
	}else if(!esFechaValida2(fecInicioSeparada) || !esFechaValida2(fecFinSeparada)){
		mensajeError("La fecha introducida no existe en el calendario.");
	//a continuacion compruebo que la fecha de inicio de la consulta sea mayor o igual a la actual
	}else if(hoy>=fecInicio){
		mensajeError("La fecha inicial debe ser mayor a la fecha actual!");
	}else if (validacionFechas2()){
		mensajeError("La fecha final debe ser posterior a la fecha inicial y tener una separación mínima de un día!");
	}else{
		deshabilitarPrimerosInputs();
		habilitarBotones();
	}
}
//esta validacion comprueba que la fecha de inicio de la consulta sea menor a la de fin
function validacionFechas2() {
	//cojo los dos inputs
	var fecInicio = document.forms["formulario"]["fecInicio"].value;
	var fecFin = document.forms["formulario"]["fecFin"].value;
	//si la fecha de inicio es mayor devuelvo true para que se muestre el mensaje de error
	if (fecInicio>=fecFin) {
		return true;
	} else {
		return false;
	}
}
//esta funcion comprueba que la fecha introducida sea en el formato (yyyy-mm-dd) y que no sean letras
// o cualquier otro caracter distinto
function esFechaValida(fecha) {
    var expRegFecha = new RegExp(/(\d{4})-(\d{2})-(\d{2})/);
    if(expRegFecha.test(fecha)) {
        return true;
    }else{
    	return false;
    }
}
//aqui compruebo que la fecha introducida exista en el calendario y no sea invalida
// ej: 2017-02-30 --> febrero nunca tendrá 30 dias || 2017-20-10 --> el mes 20 no existe
function esFechaValida2(fechaSeparada){
	var meses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	//convierto el mes, año y dia de string a numero y le resto 1 al mes para que concuerde con el array
	fechaSeparada[0] = Number(fechaSeparada[0]);
	fechaSeparada[1] = Number(fechaSeparada[1])-1;
	fechaSeparada[2] = Number(fechaSeparada[2]);
	// si el año es bisiesto febrero tiene 29 dias
	if ((!(fechaSeparada[0] % 4) && fechaSeparada[0] % 100) || !(fechaSeparada[0] % 400)) {
    	meses[1] = 29;
  	}
  	//compruebo que el mes exista
	if (fechaSeparada[1]>meses.length || fechaSeparada[1] < 0){
		return false;
	//compruebo que no introduzcas dias que no existen en ese mes
	}else if(fechaSeparada[2]>meses[fechaSeparada[1]] || fechaSeparada[2]<1) {
		return false;
	}else{
		return true;
	}
}
//esta funcion comprueba que hayas escogido alguna opcion en la pagina de votacion
//la hemos hecho para evitar que siempre se envie el formulario y salte error al no votar
function debesVotar() {
	//cojo las opciones
	var opciones = document.getElementsByName("opcion");
	//creo el condicionante
	var condicion = false;
	//con este bucle comprovamos que haya algun checkbox escogido
	for (var i = 0; i < opciones.length; i++) {
		//si lo hay, el condicionante se establece a true
		if (opciones[i].checked) {
			condicion = true;
		}
	}
	//si el condicionante está en "true" es porque se ha escogido alguna opcion y se puede enviar el formulario
	if (condicion){
		document.forms[0].submit();
	}else{
		//en caso contrario mostramos un mensaje de aviso
		mensajeError("Debes escoger una opción!");
	}
}