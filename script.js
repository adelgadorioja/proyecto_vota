function insertarElemento(tag,elemento){
	elemento.parentNode.insertBefore(tag, elemento.nextSibling);
}
function mostrarConsulta(){
	
	var hermano = document.getElementsByTagName("button")[0];
    var form = document.createElement("form");
    form.setAttribute("action","consultaCreada.php");
    form.setAttribute("method","POST");
    form.setAttribute("onsubmit","habilitarBotones()")

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

    	var input4 = document.createElement("input");
    	input4.setAttribute("type","submit");
	    input4.setAttribute("value","Crear");
    	form.appendChild(input4);    	

    insertarElemento(form,hermano);
    botonesRespuestas(); 
}
function botonesRespuestas(){
	var hermano = document.getElementsByTagName("form")[0];
    var button = document.createElement("button");
    button.disabled = false;
    button.setAttribute("value","Crear respuesta")
    insertarElemento(button,hermano);

    var hermano = document.getElementsByTagName("button")[1];
    var button2 = document.createElement("button");
    button2.disabled = false;
    button2.setAttribute("value","Borrar respuesta")
    insertarElemento(button2,hermano);
}
function habilitarBotones(){

}