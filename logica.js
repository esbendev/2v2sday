var equipo1_stream1 = "";
var equipo1_stream2 = "";
var equipo2_stream1 = "";
var equipo2_stream2 = "";
var equipo3_stream1 = "";
var equipo3_stream2 = "";
var equipo4_stream1 = "";
var equipo4_stream2 = "";

function cargarDatos() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var datos = JSON.parse(this.responseText);
            console.log(datos);
            document.getElementById("equipo1-jugador1-nombre").innerHTML = datos[0].equipo1_jugador1;
            document.getElementById("equipo1-jugador2-nombre").innerHTML = datos[0].equipo1_jugador2;
            document.getElementById("equipo2-jugador1-nombre").innerHTML = datos[0].equipo2_jugador1;
            document.getElementById("equipo2-jugador2-nombre").innerHTML = datos[0].equipo2_jugador2;
            document.getElementById("equipo3-jugador1-nombre").innerHTML = datos[0].equipo3_jugador1;
            document.getElementById("equipo3-jugador2-nombre").innerHTML = datos[0].equipo3_jugador2;
            document.getElementById("equipo4-jugador1-nombre").innerHTML = datos[0].equipo4_jugador1;
            document.getElementById("equipo4-jugador2-nombre").innerHTML = datos[0].equipo4_jugador2;
            equipo1_stream1 = datos[0].equipo1_stream1;
            equipo1_stream2 = datos[0].equipo1_stream2;
            equipo2_stream1 = datos[0].equipo2_stream1;
            equipo2_stream2 = datos[0].equipo2_stream2;
            equipo3_stream1 = datos[0].equipo3_stream1;
            equipo3_stream2 = datos[0].equipo3_stream2;
            equipo4_stream1 = datos[0].equipo4_stream1;
            equipo4_stream2 = datos[0].equipo4_stream2;
        }
    };
    xhttp.open("GET", "https://raw.githubusercontent.com/esbendev/datos_2v2sday/main/datos.json", true);
    xhttp.send();
    var containerPrincipal = document.getElementById("container-principal");
    containerPrincipal.classList.remove("cargando");
}

function cargarStream(streamNumber, equipoNumber, urlStream) {
    idStream = "stream-container-equipo" + equipoNumber + "-stream" + streamNumber;
    console.log(idStream);
    var container = document.getElementById(idStream);
    // create an iframe inside container
    var stream = document.createElement("iframe");
    stream.setAttribute("src", urlStream);
    stream.setAttribute("width", "100%");
    stream.setAttribute("height", "100%");
    stream.setAttribute("frameborder", "0");
    stream.setAttribute("scrolling", "no");
    stream.setAttribute("allowfullscreen", "true");
    stream.setAttribute("allow", "autoplay");
    container.append(stream);
}

function ocultarStreams(equipoNumber) {
    var streams = document.getElementsByClassName("streams-equipo");
    for (var i = 0; i < streams.length; i++) {
        streams[i].classList.add("ocultar");
    }
    var streamContainers = document.getElementsByClassName("stream-container");
    for (var i = 0; i < streamContainers.length; i++) {
        streamContainers[i].innerHTML = "";
    }
    document.getElementById("streams-equipo" + equipoNumber).classList.remove("ocultar");
}

function elegirTabCorrecta(equipoNumber) {
    var puntajes = document.getElementsByClassName("puntaje-equipo");
    for (var i = 0; i < puntajes.length; i++) {
        puntajes[i].classList.remove("seleccionado");
    }
    document.getElementById("puntaje-equipo" + equipoNumber).classList.add("seleccionado");
}

function switchTo(equipoNumber) {
    ocultarStreams(equipoNumber);
    elegirTabCorrecta(equipoNumber);
    if (equipoNumber == 1) {
        cargarStream(1, equipoNumber, equipo1_stream1);
        cargarStream(2, equipoNumber, equipo1_stream2);
    } else if (equipoNumber == 2) {
        cargarStream(1, equipoNumber, equipo2_stream1);
        cargarStream(2, equipoNumber, equipo2_stream2);
    } else if (equipoNumber == 3) {
        cargarStream(1, equipoNumber, equipo3_stream1);
        cargarStream(2, equipoNumber, equipo3_stream2);
    } else if (equipoNumber == 4) {
        cargarStream(1, equipoNumber, equipo4_stream1);
        cargarStream(2, equipoNumber, equipo4_stream2);
    }
}

function actualizarPuntajes() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var puntajes = this.responseText;
            // separate the string into an array
            puntajes = puntajes.split(",");

            console.log(puntajes);
            document.getElementById("p_puntaje-equipo1").innerHTML = puntajes[0];
            document.getElementById("p_puntaje-equipo2").innerHTML = puntajes[1];
            document.getElementById("p_puntaje-equipo3").innerHTML = puntajes[2];
            document.getElementById("p_puntaje-equipo4").innerHTML = puntajes[3];
        }
    };
    xhttp.open("GET", "https://raw.githubusercontent.com/esbendev/datos_2v2sday/main/puntajes.txt", true);
    xhttp.send();
}

function actualizarJuego() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var juego = this.responseText.trim();
            // separate the string into an array

            console.log(juego);
            document.getElementById("nombre-juego").innerHTML = juego;
        }
    };
    xhttp.open("GET", "https://raw.githubusercontent.com/esbendev/datos_2v2sday/main/juego.txt", true);
    xhttp.send();
}

function inicializarPagina() {
    cargarDatos();
    actualizarPuntajes();
    actualizarJuego();
    setInterval(function () {
        actualizarPuntajes();
    }, 300000);
    setInterval(function () {
        actualizarJuego();
    }, 300000);
    // wait 1 second
    setTimeout(function () {
        switchTo(1);
    }, 1000);
}