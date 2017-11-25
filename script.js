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

	    var label = document.createElement("label");
	    var textoLabel = document.createTextNode("Nombre de la consulta:");
	    label.appendChild(textoLabel);
	    form.appendChild(label);

	    var input = document.createElement("input");
	    input.setAttribute("type","text");
	    input.setAttribute("name","consulta");
    	form.appendChild(input);

    	var label2 = document.createElement("label");
	    textoLabel = document.createTextNode("Fecha de inicio:");
	    label2.appendChild(textoLabel);
	    form.appendChild(label2);

	    var input2 = document.createElement("input");
	    input2.setAttribute("type","date");
	    input2.setAttribute("name","fecInicio");
    	form.appendChild(input2);

    	var label3 = document.createElement("label");
    	textoLabel = document.createTextNode("Fecha de expiración:");
	    label3.appendChild(textoLabel);
	    form.appendChild(label3);

	    var input3 = document.createElement("input");
	    input3.setAttribute("type","date");
	    input3.setAttribute("name","fecFin");
    	form.appendChild(input3);

    	var button = document.createElement("button");
	    var textoButton = document.createTextNode("Siguiente:");
	    button.setAttribute("type","button");
    	button.appendChild(textoButton);
	    button.setAttribute("onclick","consultaNoVacia()")
    	form.appendChild(button);

    	botonesRespuestas(form);

    insertarElemento(form,hermano);
}
function botonesRespuestas(form){
    var button = document.createElement("button");
    var textoButton = document.createTextNode("Añadir respuesta");
    button.setAttribute("type","button");
    button.appendChild(textoButton);
    button.disabled = true;
    button.setAttribute("onclick","anadirRespuesta(form)")
    form.appendChild(button);

    var button2 = document.createElement("button");
    textoButton = document.createTextNode("Borrar respuestas");
    button2.setAttribute("type","button");
    button2.appendChild(textoButton);
    button2.disabled = true;
  	button2.setAttribute("onclick","borrarRespuestas()");
    form.appendChild(button2);

    var input = document.createElement("input");
    input.setAttribute("value","Finalizar");
    input.disabled = true;
    input.setAttribute("type","submit");
    form.appendChild(input);
}
function habilitarBotones(){
	var botones = document.getElementsByTagName("button");
	for (var i = 1; i < botones.length; i++) {
		if(botones[i].disabled == true){
			botones[i].disabled = false;
		}else{
			botones[i].disabled = true;
		}
	}
}
function consultaNoVacia(){
	var titulo = document.forms["formulario"]["consulta"].value;
	var fecInicio = document.forms["formulario"]["fecInicio"].value;
	var fecFin = document.forms["formulario"]["fecFin"].value;
	if (titulo == null || titulo == "" || fecInicio == null || fecInicio == "" || fecFin == null || fecFin == ""){
		alert("Debes rellenar todos los campos para continuar!");
	}else{
		habilitarBotones();
	}
}
function anadirRespuesta(form){
	numRes++;
	var inputFinal = document.getElementsByTagName("input");
	inputFinal = inputFinal[inputFinal.length-1];

	var label = document.createElement("label");
    textoLabel = document.createTextNode("Respuesta "+numRes+":");
    label.appendChild(textoLabel);
    inputFinal.parentNode.insertBefore(label, inputFinal);

    var input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("name","respuesta");
    input.required = true;
    inputFinal.parentNode.insertBefore(input, inputFinal);

	if (numRes == 2) {
		inputFinal.disabled = false;
	}
}
function borrarRespuestas(){
	var inputs = document.getElementsByTagName("input");
	var respuestas = inputs.querySelectorAll('input[name="respuesta"]');
	for (var i = 0; i < respuestas.length; i++) {
		respuestas[i].parentNode.removeChild(respuestas[i]);
	}
}