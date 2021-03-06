/*

    Nombre fichero: script.js
    Creador: Marc Guerra
    Fecha creación: 28/11/2017
    Funcionalidad: Controlar todas las funcionalidades hechas en JS. 
    	 		   Validación de campos y creación de formulario son las funciones que ocupan la gran parte del fichero.

*/
var numRes = 0;
/*
 - Descripcion: con esta funcion obtengo el id de la consulta que se ha clicado y redirigo la pagina a la de invitacion, pasandole el id de la consulta
 - Parametros: idConsulta, number, no opcional
 - Return: null
 */
function redirigirConsulta(idConsulta) {
    location.href = "realizarInvitacion.php?idConsulta=" + idConsulta;
}
/*
 - Descripcion: con esta funcion obtengo el id de la consulta que se ha clicado y redirigo la pagina a la de votacion, pasandole el id de la consulta
 - Parametros: idConsulta, number, no opcional
 - Return: null
 */
function redirigirConsultaVotacion(idConsulta) {
    location.href = "realizarVotacion.php?idConsulta=" + idConsulta;
}
// 
/*
 - Descripcion: Viendo que necessitamos insertar varios elementos, hemos creado esta funcion llamada cada vez que añadimos un nuevo elemento. 
                Más adelante vimos que solo necesitabamos insertar el formulario pero aun asi creemos 
                que esta bien tener esta funcion separada para un posible uso futuro.
 - Parametros: tag, object, no opcional
 			   elemento, object, no opcional
 - Return: null
 */
function insertarElemento(tag, elemento) {
    // lo que estoy haciendo es cojer el tag padre del hermano del elemento que queremos insertar, y estoy insertando el elemento a continuacion del hermano
    elemento.parentNode.insertBefore(tag, elemento.nextSibling);
}

/*
 - Descripcion: Crea un nuevo grupo de formulario (bootstrap)
 - Parametros: label, object, no opcional
 			   input, object, no opcional
 			   columnas, object, no opcional
 - Return: div creado
 */
function crearFormGroup(label, input, columnas) {
    var div = document.createElement("div");
    div.setAttribute("class", "form-group col-md-" + columnas);
    div.appendChild(label);
    input.setAttribute("class", "form-control");
    div.appendChild(input);
    return div;
}
/*
 - Descripcion: Crea un nuevo div (bootstrap)
 - Parametros: boton, object, no opcional
 			   columnas, object, no opcional
 - Return: div creado
 */
function prepararBoton(boton, columnas) {
    var div = document.createElement("div");
    div.setAttribute("class", "col-md-" + columnas);
    div.appendChild(boton);
    return div;
}
/*
 - Descripcion: Crea un nuevo div (bootstrap)
 - Parametros: elementos, object, no opcional
 - Return: div creado
 */
function crearRow(elementos) {
    var row = document.createElement("div");
    row.setAttribute("class", "row");
    for (var i = 0; i < elementos.length; i++) {
        row.appendChild(elementos[i]);
    }
    return row;
}
/*
 - Descripcion: con esta funcion creo el formulario para crear una nueva consulta. es llamada en el onclick de un boton
 - Parametros: none
 - Return: null
 */
function mostrarConsulta() {
    //cojo el botón que llama ésta funcion y lo desactivo para que solo se puedan crear dos consultas a la vez
    var hermano = document.getElementById("botonCrearConsulta");
    hermano.disabled = true;

    //creo el elemento form y le añado los atributos necesarios
    var form = document.createElement("form");
    form.setAttribute("name", "formulario");
    form.setAttribute("action", "consultaCreada.php");
    form.setAttribute("class", "container");
    form.setAttribute("method", "post");
    form.setAttribute("id", "formularioCrearConsulta");
    // EL SIGUIENTE CODIGO ESTA INDENTADO PARA HACER MAS ENTENDIBLE QUE VA DENTRO DEL TAG FORM
    //creo los labels y cajas de texto para añadir el titulo de la consulta y la fecha de inicio y fin,
    //ademas de añadirles los atributos necesarios

        var label = document.createElement("label");
        var textoLabel = document.createTextNode("Consulta");
        //todos los .appendChild() añaden un elemento dentro de otro (tag dentro de tag o texto dentro de tag)
        label.appendChild(textoLabel);

        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("name", "consulta");
        //llamo a la funcion que comprueba que no esté vacío el input, y en caso afirmativo lo pone en rojo
        input.setAttribute("onblur", "comprobarInputVacio(event)");

        grupoFormulario = crearFormGroup(label, input, 12);
        row = crearRow([grupoFormulario]);
        form.appendChild(row);

        label = document.createElement("label");
        textoLabel = document.createTextNode("Fecha de inicio");
        label.appendChild(textoLabel);

        input = document.createElement("input");
        // tipo fecha porque es el input de la fecha de inicio de la consulta
        input.setAttribute("type", "datetime");
        input.setAttribute("name", "fecInicio");
        input.setAttribute("placeholder","yyyy-mm-dd-hh");
        //llamo a la funcion que comprueba que no esté vacío el input, y en caso afirmativo lo pone en rojo
        input.setAttribute("onblur", "comprobarInputVacio(event)");

        grupoFormulario = crearFormGroup(label, input, 6);

        label = document.createElement("label");
        textoLabel = document.createTextNode("Fecha de expiración");
        label.appendChild(textoLabel);

        input = document.createElement("input");
        // tipo fecha porque es el input de la fecha de fin de la consulta
        input.setAttribute("type", "datetime");
        input.setAttribute("name", "fecFin");
        input.setAttribute("placeholder","yyyy-mm-dd-hh");
        //llamo a la funcion que comprueba que no esté vacío el input, y en caso afirmativo lo pone en rojo
        input.setAttribute("onblur", "comprobarInputVacio(event)");

        grupoFormulario2 = crearFormGroup(label, input, 6);
        row = crearRow([grupoFormulario, grupoFormulario2]);
        form.appendChild(row);

        var button = document.createElement("button");
        var textoButton = document.createTextNode("Añadir respuestas");
        // establezco el "type" a "button" porque sino se envia el formulario automáticamente
        button.setAttribute("type", "button");
        button.setAttribute("id", "botonSiguiente");
        button.setAttribute("class", "btn mg-bottom col-md-12");
        button.appendChild(textoButton);
        //llamo a la funcion que comprueba que todo esté rellenado y sea válido
        // en caso afirmativo habilito el apartado para añadir las respuestas de la consulta
        button.setAttribute("onclick", "comprobarCampos()");
        form.appendChild(button);

        //llamo a la funcion que crea los botones para añadir/borrar respuestas
        //es una funcion aparte porque los botones forman parte de la siguiente seccion del formulario
        botonesRespuestas(form);
    //finalmente llamo a la funcion que inserta el formulario en la página
    insertarElemento(form, hermano);
}
/*
 - Descripcion: creo los botones de añadir/borrar respuestas
 - Parametros: form, object, no opcional
 - Return: null
 */
function botonesRespuestas(form) {
    //creo el boton de añadir respuesta
    var button = document.createElement("button");
    var textoButton = document.createTextNode("Añadir respuesta");
    button.appendChild(textoButton);
    // de nuevo, el "type" lo establezco a "button" para que no se envie el formulario en el onclick
    button.setAttribute("type", "button");
    // pongo el disabled a true para que el boton no sea accesible hasta que otra funcion comprueba que
    // los primeros inputs introducidos son válidos, entonces el disabled lo establezco a false
    button.disabled = true;
    button.setAttribute("onclick", "anadirRespuesta()");
    button.setAttribute("class", "btn mg-bottom disabled-nd col-md-12");

    button = prepararBoton(button, 6);

    //creo el boton para borrar las respuestas, en el onclick llamara a la funcion borrarRespuestas(),
    // que es la funcion encargada de borrar los inputs y los labels
    var button2 = document.createElement("button");
    // de nuevo, el "type" lo establezco a "button" para que no se envie el formulario en el onclick
    button2.setAttribute("type", "button");
    button2.setAttribute("name", "borrarRespuestas");
    button2.setAttribute("class", "btn mg-bottom disabled-nd col-md-12");
    button2.setAttribute("onclick", "borrarTodasRespuestas()");
    textoButton = document.createTextNode("Borrar respuestas");
    button2.appendChild(textoButton);
    // pongo el disabled a true para que el boton no sea accesible hasta que otra funcion comprueba que
    // los primeros inputs introducidos son válidos, entonces el disabled lo establezco a false
    button2.disabled = true;

    button2 = prepararBoton(button2, 6);
    row = crearRow([button, button2]);
    form.appendChild(row);

    //creo el boton que envia el formulario
    var input = document.createElement("input");
    input.disabled = true;
    //en este caso el "type" es "button" porque antes de enviar el formulario compruebo que ninguna respuesta esté vacía
    input.setAttribute("type", "button");
    input.setAttribute("value", "Finalizar");
    //aqui compruebo que ningun campo está vacío
    input.setAttribute("onclick", "comprobarCampos()");
    input.setAttribute("class", "btn disabled-nd col-md-12");
    form.appendChild(input);
}
/*
 - Descripcion: creo los botones de subir/bajar/borrar respuesta
 - Parametros: urlIcono, string, no opcional
 - Return: el botón de subir/bajar/borrar respuesta, según el parametro de entrada
 */
function crearBotonInput(urlIcono) {
    var elemento = document.createElement("span");
    elemento.setAttribute("class", "input-group-btn");
    var boton = document.createElement("button");
    boton.setAttribute("type", "button");
    if (urlIcono == "../IMG/x.svg") {
        boton.setAttribute("class", "bg-333 btn btn-secondary");
        boton.setAttribute("onclick","borrarUnaRespuesta(event)");
    }else if(urlIcono == "../IMG/chevron-bottom.svg"){
        boton.setAttribute("class", "btn btn-secondary");
        boton.setAttribute("onclick","bajaRespuesta(event)");
    }else{
    	boton.setAttribute("class", "btn btn-secondary");
    	boton.setAttribute("onclick","subeRespuesta(event)");
    }
    var icono = document.createElement("img");
    icono.setAttribute("src", urlIcono);
    icono.setAttribute("class", "img-fluid");
    icono.setAttribute("alt", "Responsive image");
    boton.appendChild(icono);
    elemento.appendChild(boton);
    return elemento;
}
/*
 - Descripcion: creo el label y el input para añadir una respuesta
 - Parametros: none
 - Return: null
 */
function anadirRespuesta() {
    //variable global para controlar el numero de respuestas
    numRes++;
    //cojo todos los inputs para luego filtrar y tener solo el ultimo
    var inputs = document.getElementsByTagName("input");
    var inputFinal = inputs[inputs.length - 1];
    //creo el label de la respuesta
    var label = document.createElement("label");
    // el label contiene el string "respuesta" y la variable numRes que suma 1 a cada respuesta creada
    textoLabel = document.createTextNode("Respuesta " + numRes + ":");
    label.appendChild(textoLabel);
    //creo el input para escribir la respuesta
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    // cada respuesta tendrá un nombre diferente para poder coger cada respuesta por separado más fácilmente más adelante
    input.setAttribute("name", "respuesta" + numRes);
    input.setAttribute("onblur", "comprobarInputVacio(event)");
    input.setAttribute("class", "form-control");

    var botonAbajo = crearBotonInput("../IMG/chevron-bottom.svg");
    var botonArriba = crearBotonInput("../IMG/chevron-top.svg");
    var botonEliminar = crearBotonInput("../IMG/x.svg");

    var grupoInput = document.createElement("div");
    grupoInput.appendChild(input);
    grupoInput.appendChild(botonAbajo);
    grupoInput.appendChild(botonArriba);
    grupoInput.appendChild(botonEliminar);

    grupoFormulario = crearFormGroup(label, grupoInput, 12);
    grupoInput.removeAttribute("class", "form-control");
    grupoInput.setAttribute("class", "input-group");
    row = crearRow([grupoFormulario]);
    row.classList.add("respuesta");
    inputFinal.parentNode.insertBefore(row, inputFinal);

    //cojo el boton para borrar respuestas y lo habilito, ya que en este momento se que existira alguna respuesta
    var borrarRespuestas = document.querySelector("button[name='borrarRespuestas']");
    borrarRespuestas.disabled = false;
    //cuando existan dos respuestas como minimo, se habilitia el boton que envia el formulario
    if (numRes >= 2) {
        inputFinal.disabled = false;
    }
}
/*
 - Descripcion: borra todas las respuestas
 - Parametros: none
 - Return: null
 */
function borrarTodasRespuestas() {
    // reseteo el contador con el numero de respuestas a 0 para que la siguiente respuesta que se añada sea la 1
    numRes = 0;
    //cojo las respuestas y las borro 
    var respuestas = document.getElementsByClassName("respuesta");
    for (var i = respuestas.length - 1; i >= 0; i--) {
        // con éste workaround no necesitas saber el padre ya que el .parentNode te lo da automáticamente
        respuestas[i].parentNode.removeChild(respuestas[i]);
    }
    checkNumRespuestas();
}
/*
 - Descripcion: borra una respuesta
 - Parametros: event, evento, no opcional
 - Return: null
 */
function borrarUnaRespuesta(event){
	numRes--;
	var aBorrar = event.currentTarget.parentNode.parentNode.parentNode.parentNode;
	var proximoLabel = aBorrar.firstChild.firstChild.textContent;
	var proximoNameAtt = aBorrar.firstChild.firstChild.nextSibling.firstChild.getAttribute("name");
	var elementoActual = aBorrar.nextSibling;
	aBorrar.parentNode.removeChild(aBorrar);
	recolocarRespuestas(elementoActual,proximoLabel,proximoNameAtt);
}
/*
 - Descripcion: coloco bien las respuestas despues de borrar una en concreto
 - Parametros: elementoActual, object, no opcional
 			   proximoLabel, string, no opcional
 			   proximoNameAtt,string,no opcional
 - Return: null
 */
function recolocarRespuestas(elementoActual,proximoLabel,proximoNameAtt){
    var anteriorLabel = "";
    var anteriorNameAtt = "";
    while(elementoActual.nodeName != "INPUT"){
    	anteriorLabel = elementoActual.firstChild.firstChild.textContent;
    	anteriorNameAtt = elementoActual.firstChild.firstChild.nextSibling.firstChild.getAttribute("name");
    	elementoActual.firstChild.firstChild.textContent = proximoLabel;
    	elementoActual.firstChild.firstChild.nextSibling.firstChild.setAttribute("name",proximoNameAtt);
    	elementoActual = elementoActual.nextSibling;
    	proximoLabel = anteriorLabel;
    	proximoNameAtt = anteriorNameAtt;
    }
    checkNumRespuestas();
}
/*
 - Descripcion: compruebo cuantas respuestas (inputs) hay creados, y en funcion de las que hay deshabilito algunos botones
 - Parametros: none
 - Return: null
 */
function checkNumRespuestas(){
	if (numRes<1) {
    	//inhabilito el boton que borra las respuestas
    	var borrarRespuestas = document.querySelector("button[name='borrarRespuestas']");
    	borrarRespuestas.disabled = true;
    	//cojo los inputs, lo filtro para tener el ultimo (el boton finalizar)
    	var inputs = document.getElementsByTagName("input");
    	var inputFinal = inputs[inputs.length - 1];
    	inputFinal.disabled = true;
    }else if (numRes<2) {
	    //cojo los inputs, lo filtro para tener el ultimo (el boton finalizar)
    	var inputs = document.getElementsByTagName("input");
    	var inputFinal = inputs[inputs.length - 1];
    	inputFinal.disabled = true;
	}
}
/*
 - Descripcion: bajo la respuesta
 - Parametros: event, evento, no opcional
 - Return: null
 */
function bajaRespuesta(event){
	var valorActual = event.currentTarget.parentNode.previousSibling;
	var respuestActual = event.currentTarget.parentNode.parentNode.parentNode.parentNode;
	if(respuestActual.nextSibling.nodeName == "INPUT"){
		mensajeError("No se puede bajar esta respuesta.")
	}
	var valorProximo = respuestActual.nextSibling.firstChild.firstChild.nextSibling.firstChild;
	var valor2 = valorProximo.value;
	valorProximo.value = valorActual.value;
	valorActual.value = valor2; 
}
/*
 - Descripcion: subo la respuesta
 - Parametros: event, evento, no opcional
 - Return: null
 */
function subeRespuesta(event){
	var valorActual = event.currentTarget.parentNode.previousSibling.previousSibling;
	var respuestActual = event.currentTarget.parentNode.parentNode.parentNode.parentNode;
	if(respuestActual.previousSibling.firstChild.firstChild.nodeName == "BUTTON"){
		mensajeError("No se puede subir esta respuesta.");
	}
	var valorAnterior = respuestActual.previousSibling.firstChild.firstChild.nextSibling.firstChild;
	var valor2 = valorAnterior.value;
	valorAnterior.value = valorActual.value;
	valorActual.value = valor2; 
}
/*
 - Descripcion: muestro las respuestas en la página para votar
 - Parametros: none
 - Return: null
 */
function mostrarRespuestas() {
    var respuestas = document.getElementById("respuestas");
    respuestas.style.maxHeight = respuestas.scrollHeight + "px";
}
/*
 - Descripcion: funcion llamada en el onblur de cada input del form, para que aparezca el input en rojo y un mensaje de alerta
 - Parametros: event, evento, no opcional
 - Return: null
 */
function comprobarInputVacio(event) {
    //cojo el input 
    input = event.currentTarget;
    dialog = document.getElementById("mensajeDialog");
    textoDialog = document.getElementById("mensajeDialog").textContent;
    if (input.value == "") {
        //si el input esta vacío lo pongo en rojo y muestro el mensaje de error
        input.style.border = "1px solid #dc3545";
        dialog.classList.remove("d-none");
        dialog.classList.add("d-block");
        mensajeError("El campo '" + input.name + "' es obligatorio.");
    } else {
        //si el input esta lleno no muestro nada
        document.getElementById("mensajeDialog").textContent = "";
        dialog.classList.remove("d-block");
        dialog.classList.add("d-none");
        input.style.border = "1px solid #333";
    }
}
/*
 - Descripcion: funcion llamada en muchas ocasiones (validacion de fechas, de inputs vacíos...), para mostrar mensaje de error
 - Parametros: mensaje, string, no opcional
 - Return: null
 */
function mensajeError(mensaje) {
    //cojo el texto que hay en el div que utilizamos para mostrar el mensaje de error y lo vacío
    dialog = document.getElementById("mensajeDialog");
    textoDialog = document.getElementById("mensajeDialog").textContent;
    document.getElementById("mensajeDialog").textContent = "";
    //le añado al div el mensaje pasado en el parametro de la funcion
    textoDialog = document.createTextNode(mensaje);
    dialog.appendChild(textoDialog);
    //muestro el div
    dialog.classList.remove("d-none");
    dialog.classList.add("d-block");
}
/*
 - Descripcion: funcion utilizada para comrobar que todos los campos tienen contenido
 - Parametros: none
 - Return: null
 */
function comprobarCampos() {
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
    if (formularioValido == true && respuestas.length >= 2) {
        document.forms["formulario"].submit();
    }
}
/*
 - Descripcion: habilito la segunda parte del formulario
 - Parametros: none
 - Return: null
 */
function habilitarBotones() {
    //cojo todos los botones
    var botones = document.getElementsByTagName("button");
    //los que estan inhabilitados los habilito y viceversa (menos el último que continua inhabilitado)
    for (var i = 1; i < botones.length - 1; i++) {
        if (botones[i].disabled == true && botones[i].id != "botonCrearConsulta") {
            botones[i].disabled = false;
        } else {
            botones[i].disabled = true;
        }
    }
}
/*
 - Descripcion: una vez pasada a la parte de añadir respuestas inhabilito los primeros botones para que no se puedan modificar
 - Parametros: none
 - Return: null
 */
function deshabilitarPrimerosInputs() {
    var consulta = document.forms["formulario"]["consulta"];
    var fecInicio = document.forms["formulario"]["fecInicio"];
    var fecFin = document.forms["formulario"]["fecFin"];
    //para inhabilitarlos uso el atributo readonly, ya que si usara el disabled el php no detectaria nada
    consulta.setAttribute("readonly", "true");
    fecInicio.setAttribute("readonly", "true");
    fecFin.setAttribute("readonly", "true");
}
/*
 - Descripcion: esta es la funcion principal de validacion de fechas, desde aquí llamamos a las  demás funciones que validan la fecha
 - Parametros: none
 - Return: null
 */
function validacionFechas1() {
    //cojemos la fecha de hoy para usarla mas adelante para comparar
    var hoy = new Date();
    var dia = hoy.getDate();
    var mes = hoy.getMonth() + 1;
    var ano = hoy.getFullYear();
    var hora = hoy.getHours();
    //cojemos la fecha de inicio y de fin y las separamos para evaluar cada unidad por separado
    var fecInicio = document.forms["formulario"]["fecInicio"].value;
    var fecFin = document.forms["formulario"]["fecFin"].value;
    var fecInicioSeparada = fecInicio.split("-");
    var fecFinSeparada = fecFin.split("-");
    //estos ifs/else if validan que todo sea correcto, en caso afirmativo, inhabilito los primeros inputs
    // y habilito los segundos
    if (!esFechaValida(fecInicio)) {
        mensajeError("El formato de la fecha de inicio no es válido.");
    }else if(!esFechaValida(fecFin)){
        mensajeError("El formato de la fecha de expiración no es válido");
    }else if(!esFechaValida2(fecInicioSeparada) || !esFechaValida2(fecFinSeparada)){
        mensajeError("La fecha introducida no existe en el calendario.");
    //a continuacion compruebo que la fecha de inicio de la consulta sea mayor o igual a la actual
    }else if (validacionFechas2(ano, mes, dia, hora,fecInicioSeparada)) {
        mensajeError("La fecha inicial debe ser mayor a la fecha actual!");
    } else if (validacionFechas3(fecInicioSeparada,fecFinSeparada)) {
        mensajeError("La fecha final debe ser posterior a la fecha inicial y tener una separación mínima de 4 horas!");
    }else {
        deshabilitarPrimerosInputs();
        habilitarBotones();
    }
}
/*
 - Descripcion: esta validacion comprueba que la fecha de inicio de la consulta sea mayor a la actual
 - Parametros: anoActual, string, no opcional
 			   mesActual, string, no opcional
 			   diaActual, string, no opcional
 			   horaActual, string, no opcional
 			   fecInicioSeparada, array, no opcional
 - Return: boolean, en función de si la fecha es válida o no
 */
function validacionFechas2(anoActual, mesActual, diaActual, horaActual,fecInicioSeparada) {
    //Lo que hago es comprobar uno a uno, si el año actual es menor o mayor al introducido,
    //el mes actual es menor o mayor al introducido, el dia actual es mayor o menor al introducido, y si el
    //dia actual es mayor, menor, o igual al introducido
    if (anoActual < fecInicioSeparada[0]) {
        return false;
    } else if (anoActual > fecInicioSeparada[0]) {
        return true;
    } else if (mesActual < fecInicioSeparada[1]) {
        return false;
    } else if (mesActual > fecInicioSeparada[1]) {
        return true;
    } else if (diaActual < fecInicioSeparada[2]) {
        return false;
    } else if (diaActual > fecInicioSeparada[2]) {
        return true;
    } else if (horaActual < fecInicioSeparada[3]) {
        return false;
    } else if (horaActual >= fecInicioSeparada[3]) {
        return true;
    }
}
/*
 - Descripcion: esta validacion comprueba que la fecha de inicio de la consulta sea menor a la de fin
 - Parametros: fecFinSeparada, array, no opcional
 			   fecInicioSeparada, array, no opcional
 - Return: boolean, en función de si la fecha es válida o no
 */
function validacionFechas3(fecInicioSeparada,fecFinSeparada) {
    if (fecInicioSeparada[0]<fecFinSeparada[0]) {
        if (fecInicioSeparada[0] == (fecFinSeparada[0]-1)) {
    		if (fecInicioSeparada[1] == 12 && fecFinSeparada[1] == 1) {
    			if (fecFinSeparada[2] == 1 && fecInicioSeparada[2] == ultimoDiaMensual(fecInicioSeparada[1],fecInicioSeparada[0])) {
    				return minimo4EntreDias(fecInicioSeparada[3],fecFinSeparada[3]);
    			}
    		}
    	}
    } else if(fecInicioSeparada[0]>fecFinSeparada[0]){
        return true;
    } else if(fecInicioSeparada[1]<fecFinSeparada[1]){
    	if (fecInicioSeparada[1] == (fecFinSeparada[1]-1)) {
    		if (fecFinSeparada[2] == 1 && fecInicioSeparada[2] == ultimoDiaMensual(fecInicioSeparada[1],fecInicioSeparada[0])) {
    			return minimo4EntreDias(fecInicioSeparada[3],fecFinSeparada[3]);
    		}
    	}
    } else if(fecInicioSeparada[1]>fecFinSeparada[1]){
        return true;
    } else if(fecInicioSeparada[2]<fecFinSeparada[2]){
    	if ((fecFinSeparada[2]-1) == fecInicioSeparada[2]){
    		return minimo4EntreDias(fecInicioSeparada[3],fecFinSeparada[3]);
    	}else{
    		return false;
    	}
    } else if(fecInicioSeparada[2]>fecFinSeparada[2]){
        return true;
    } else if(fecInicioSeparada[3]>(fecFinSeparada[3]-4)){
        return true;
    }else{
        return false;
    }
}
/*
 - Descripcion: esta funcion comprueba que la fecha introducida sea en el formato (yyyy-mm-dd-hh) y que no sean letras o cualquier otro caracter distinto
 - Parametros: fecha, string, no opcional
 - Return: boolean, en función de si la fecha es válida o no
 */
function esFechaValida(fecha) {
    var expRegFecha = new RegExp(/(\d{4})-(\d{2})-(\d{2})-(\d{2})/);
    if (expRegFecha.test(fecha)) {
        return true;
    } else {
        return false;
    }
}
/*
 - Descripcion: aqui compruebo que la fecha introducida exista en el calendario y no sea invalida
                ej: 2017-02-30 --> febrero nunca tendrá 30 dias || 2017-20-10 --> el mes 20 no existe
 - Parametros: fechaSeparada, array, no opcional
 - Return: boolean, en función de si la fecha es válida o no
 */
function esFechaValida2(fechaSeparada) {
    var meses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //convierto el mes, ano, dia y hora de string a numero
    fechaSeparada[0] = Number(fechaSeparada[0]);
    fechaSeparada[1] = Number(fechaSeparada[1]);
    fechaSeparada[2] = Number(fechaSeparada[2]);
    fechaSeparada[3] = Number(fechaSeparada[3]);
    // si el ano es bisiesto febrero tiene 29 dias
    if ((!(fechaSeparada[0] % 4) && fechaSeparada[0] % 100) || !(fechaSeparada[0] % 400)) {
        meses[1] = 29;
    }
    //compruebo que el mes exista
    if (fechaSeparada[1] > meses.length || fechaSeparada[1] < 1) {
        return false;
        //compruebo que no introduzcas dias que no existen en ese mes
    } else if (fechaSeparada[2] > meses[fechaSeparada[1] - 1] || fechaSeparada[2] < 1) {
        return false;
    } else if(fechaSeparada[3]>23){
    	return false;
    }else {
        return true;
    }
}
/*
 - Descripcion: compruebo que haya un mínimo de 4 horas entre el inicio y el fin de la consulta
 - Parametros: horaInicio, string, no opcional
 			   horaFin, string, no opcional
 - Return: boolean, en función de si la fecha es válida o no
 */
function minimo4EntreDias(horaInicio,horaFin){
	if (horaInicio == 21 && horaFin < 1 ){
    	return true;
    }else if (horaInicio == 22 && horaFin < 2){
    	return true;
    }else if(horaInicio == 23 && horaFin < 3){
    	return true;
    }else{
    	return false;
    }
}
/*
 - Descripcion: funcion que me devuelve el ultimo dia del mes del mes del año que le paso
 - Parametros: mes, string, no opcional
 			   año, string, no opcional
 - Return: number, ultimo dia del mes que le paso
 */
function ultimoDiaMensual(mes,año){
	var meses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if ((!(año % 4) && año % 100) || !(año % 400)) {
        meses[1] = 29;
    }
    return meses[mes-1];
}
/*
 - Descripcion: esta funcion comprueba que hayas escogido alguna opcion en la pagina de votacion
 			    la hemos hecho para evitar que siempre se envie el formulario y salte error al no votar
 - Parametros: none
 - Return: null
 */
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
    if (condicion) {
        document.forms[0].submit();
    } else {
        //en caso contrario mostramos un mensaje de aviso
        mensajeError("Debes escoger una opción!");
    }
}
/*
 - Descripcion: envio el formulario de invitación, la funcionalidad aun no esta implementada
 - Parametros: none
 - Return: null
 */
function comprobarEmail() {
    formulario = document.getElementById("formularioInvitacion");
    formulario.submit();
}
/*
 - Descripcion: validar que los campos sean correctos (ningun campo vacio, primera y segunda contraseña iguales...). 
 				si todo es correcto, se acepta el registro (envio de formulario)
 - Parametros: none
 - Return: null
 */
function validarFormularioRegistro() {
    var formulario = document.querySelector("#formularioRegistro");
    var usuario = document.querySelector("#usuarioRegistro").value;
    var email = document.querySelector("#emailRegistro").value;
    var password1 = document.querySelector("#pass1Registro").value;
    var password2 = document.querySelector("#pass2Registro").value;
    var error = false;
    if (usuario == "" || email == "" || password1 == "" || password2 == "") {
        mensajeError("Todos los campos son obligatorios.");
        error = true;
    }
    if (password1 != password2) {
        mensajeError("Ambas contraseñas deben ser iguales.");
        error = true;
    }
    if (!error) {
        formulario.submit();
    }
}