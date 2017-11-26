var numRes = 0;
function redirigirConsulta(idConsulta) {
	location.href ="realizarVotacion.php?idConsulta="+idConsulta;
}
function insertarElemento(tag,elemento){
	elemento.parentNode.insertBefore(tag, elemento.nextSibling);
}
function mostrarConsulta(){
	var creacionConsulta = document.getElementsByTagName("button")[0];
	creacionConsulta.disabled = true;
	
	var hermano = document.getElementsByTagName("button")[0];
    var form = document.createElement("form");

    form.setAttribute("name","formulario");
    form.setAttribute("action","consultaCreada.php");
    form.setAttribute("method","post");
    form.setAttribute("id","formularioCrearConsulta");

	    var label = document.createElement("label");
	    var textoLabel = document.createTextNode("Consulta");
	    label.appendChild(textoLabel);
	    form.appendChild(label);

	    var input = document.createElement("input");
	    input.setAttribute("type","text");
	    input.setAttribute("name","consulta");
	    input.setAttribute("onblur","comprobarInputVacio(event)");
    	form.appendChild(input);

    	var br = document.createElement("br");
    	form.appendChild(br);

    	var label2 = document.createElement("label");
	    textoLabel = document.createTextNode("Fecha de inicio");
	    label2.appendChild(textoLabel);
	    form.appendChild(label2);

	    var input2 = document.createElement("input");
	    input2.setAttribute("type","date");
	    input2.setAttribute("name","fecInicio");
	    input2.setAttribute("onblur","comprobarInputVacio(event)");
    	form.appendChild(input2);

    	var label3 = document.createElement("label");
    	textoLabel = document.createTextNode("Fecha de expiración");
	    label3.appendChild(textoLabel);
	    form.appendChild(label3);

	    var input3 = document.createElement("input");
	    input3.setAttribute("type","date");
	    input3.setAttribute("name","fecFin");
	    input3.setAttribute("onblur","comprobarInputVacio(event)");
    	form.appendChild(input3);

    	var br2 = document.createElement("br");
    	form.appendChild(br2);

    	var button = document.createElement("button");
	    var textoButton = document.createTextNode("Añadir respuestas");
	    button.setAttribute("type","button");
	    button.setAttribute("id","botonSiguiente");
    	button.appendChild(textoButton);
	    button.setAttribute("onclick","consultaNoVacia()")
    	form.appendChild(button);

    	botonesRespuestas(form);

    insertarElemento(form,hermano);
}
function botonesRespuestas(form){
    var button = document.createElement("button");
    var textoButton = document.createTextNode("Añadir respuesta");
    button.appendChild(textoButton);
    button.setAttribute("type","button");
    button.disabled = true;
    button.setAttribute("onclick","anadirRespuesta(form)");
    button.setAttribute("class","botonRespuesta");
    form.appendChild(button);

    var button2 = document.createElement("button");
    button2.setAttribute("type","button");
    button2.setAttribute("class","botonRespuesta floatDerecha");
  	button2.setAttribute("onclick","borrarRespuestas()");
  	textoButton = document.createTextNode("Borrar respuestas");
    button2.appendChild(textoButton);
  	button2.disabled = true;
    form.appendChild(button2);

    var input = document.createElement("input");
    input.disabled = true;
    input.setAttribute("type","submit");
    input.setAttribute("value","Finalizar");
    input.setAttribute("class","botonRespuesta");
    form.appendChild(input);
}
function consultaNoVacia(){
	var titulo = document.forms["formulario"]["consulta"].value;
	var fecInicio = document.forms["formulario"]["fecInicio"].value;
	var fecFin = document.forms["formulario"]["fecFin"].value;
	if (titulo == null || titulo == "" || fecInicio == null || fecInicio == "" || fecFin == null || fecFin == ""){
		alert("Debes rellenar todos los campos!");
	}else{
		habilitarBotones();
	}
}
function habilitarBotones(){
	var botones = document.getElementsByTagName("button");
	for (var i = 1; i < botones.length-1; i++) {
		if(botones[i].disabled == true){
			botones[i].disabled = false;
		}else{
			botones[i].disabled = true;
		}
	}
}
function anadirRespuesta(form){
	numRes++;
	var inputs = document.getElementsByTagName("input");
	var inputFinal = inputs[inputs.length-1];

	var label = document.createElement("label");
	label.setAttribute("class","labelrespuesta");
    textoLabel = document.createTextNode("Respuesta "+numRes+":");
    label.appendChild(textoLabel);
    inputFinal.parentNode.insertBefore(label, inputFinal);

    var input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("name","respuesta"+numRes);
    input.setAttribute("class","respuesta");
    input.setAttribute("onblur","comprobarInputVacio(event)");
    input.required = true;
    inputFinal.parentNode.insertBefore(input, inputFinal);
	
    var borrarRespuestas = document.getElementsByClassName("floatDerecha")[0];
    borrarRespuestas.disabled = false;

	if (numRes >= 2) {
		inputFinal.disabled = false;
	}
}
function borrarRespuestas(){
	numRes = 0;

	var inputsRespuestas = document.getElementsByName("respuesta");
	for (var i = inputsRespuestas.length - 1; i >= 0; i--) {
		inputsRespuestas[i].parentNode.removeChild(inputsRespuestas[i]);
	}
	
	var labelsRespuestas = document.getElementsByName("labelrespuesta");
	for (var i = labelsRespuestas.length - 1; i >= 0; i--) {
		labelsRespuestas[i].parentNode.removeChild(labelsRespuestas[i]);
	}

	var inputs = document.getElementsByTagName("input");
	var inputFinal = inputs[inputs.length-1];
	inputFinal.disabled = true;

	var borrarRespuestas = document.getElementsByClassName("floatDerecha")[0];
    borrarRespuestas.disabled = true;
}
function mostrarRespuestas() {
	var respuestas = document.getElementById("respuestas");
	respuestas.style.maxHeight = respuestas.scrollHeight + "px";
}
function comprobarInputVacio(event) {
	input = event.currentTarget;
	dialog = document.getElementById("mensajeDialog");
	textoDialog = document.getElementById("mensajeDialog").textContent;
	if (input.value == "") {
		input.style.border= "1px solid red";
		if (textoDialog == "") {
			textoDialog	= document.createTextNode("El campo '" + input.name + "' es obligatorio.");
			dialog.appendChild(textoDialog);
			dialog.style.display = "block";
			dialog.style.padding = "0.5em";
			dialog.style.marginBottom = "1em";
		}
		else {
			document.getElementById("mensajeDialog").textContent = "El campo '" + input.name + "' es obligatorio.";
		}
	}
	else {
		document.getElementById("mensajeDialog").textContent = "";
		dialog.style.display = "hidden";
		dialog.style.padding = "0em";
		dialog.style.marginBottom = "0em";
		input.style.border= "1px solid #333";
	}
}