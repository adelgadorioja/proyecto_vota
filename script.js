var peticionHTTP;

function inicializarXHR() {
	// Prepara un objeto de peticion HTTP según el navegador
	if (window.XMLHttpRequest) peticionHTTP = new XMLHttpRequest();
	else peticionHTTP = new ActiveXObject("Microsoft.XMLHTTP");
}

function realizarPeticion(url, metodo, funcion) {
	// Define la acción
	peticionHTTP.onreadystatechange = funcion;
	// Realiza la petición
	peticionHTTP.open(metodo, url, true);
	peticionHTTP.send(null);
}