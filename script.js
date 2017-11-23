function mostrarConsulta(){
	
	var hermano = document.getElementsByTagName("button")[0];
    var form = document.createElement("form");
    form.setAttribute("action","consultaCreada.php");
    form.setAttribute("method","POST");

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
}

function insertarElemento(tag,elemento){
	elemento.parentNode.insertBefore(tag, elemento.nextSibling);
}