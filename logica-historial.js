function loadTodo() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var historial = this.responseText;
            console.log(historial);
            populateTable(historial);
        }
    };
    xhttp.open("GET", "https://raw.githubusercontent.com/esbendev/datos_2v2sday/main/historial.json?_=" + new Date().getTime(), true);
    xhttp.send();
}

function separarMiembros(miembros,jugadoresUnicos) {
    // console.log(miembros);
    // if miembros[0] is not in jugadoresUnicos, add it
    // if miembros[1] is not in jugadoresUnicos, add it

    if (!jugadoresUnicos.includes(miembros[0])) {
        jugadoresUnicos.push(miembros[0]);
    }
    if (!jugadoresUnicos.includes(miembros[1])) {
        jugadoresUnicos.push(miembros[1]);
    }
    var miembrosSeparados = "<div class='miembro-equipo miembro-equipo--" + miembros[0].replace("/", "") + "' onclick=filtrarPlayers('"+miembros[0].replace("/", "")+"')>" + miembros[0] + "</div><div class='miembro-equipo miembro-equipo--" + miembros[1].replace("/", "") + "' onclick=filtrarPlayers('"+miembros[1].replace("/", "")+"')>" + miembros[1] + "</div>";
    return miembrosSeparados;
}

function generarDatosEquipo(miembros, puntaje, jugadoresUnicos) {
    var miembrosSeparados = separarMiembros(miembros,jugadoresUnicos);
    var miembrosHTML = "<div class='datos-equipo'><div class='datos-equipo--miembros'>" + miembrosSeparados + "</div><div class='datos-equipo--puntos'>" + puntaje + "</div></div>";
    return miembrosHTML;

}

function populateTable(historial) {
    var historial = JSON.parse(historial);
    var tabla = document.getElementById("tablaHistorial");
    var filtros = document.getElementById("filtros-jugadores");
    var jugadoresUnicos = [];

    // primero armo tabla
    var tablaHTML = "<div class='fila-header'><div class='fila--fecha'>Date</div><div class='datos-equipo'><img src='./medallas/1.png'></div><div class='datos-equipo'><img src='./medallas/2.png'></div><div class='datos-equipo'><img src='./medallas/3.png'></div><div class='datos-equipo'>4th</div></tr></div>";

    for (var i = 0; i < historial.length; i++) {
        var fila = historial[i];
        var color = i % 2 == 0 ? "oscuro" : "claro";
        filaFecha = "<div class='fila--fecha'>" + fila.fecha + "</div>";
        var ordenDeEquipos = [["equipo1", fila.equipo1], ["equipo2", fila.equipo2], ["equipo3", fila.equipo3], ["equipo4", fila.equipo4]];
        ordenDeEquipos.sort(function (a, b) {
            return b[1] - a[1];
        });

        filaPrimerLugar = generarDatosEquipo(eval("fila.miembrosEquipo" + ordenDeEquipos[0][0].slice(-1)), eval("fila.equipo" + ordenDeEquipos[0][0].slice(-1)), jugadoresUnicos);
        filaSegundoLugar = generarDatosEquipo(eval("fila.miembrosEquipo" + ordenDeEquipos[1][0].slice(-1)), eval("fila.equipo" + ordenDeEquipos[1][0].slice(-1)), jugadoresUnicos);
        filaTercerLugar = generarDatosEquipo(eval("fila.miembrosEquipo" + ordenDeEquipos[2][0].slice(-1)), eval("fila.equipo" + ordenDeEquipos[2][0].slice(-1)), jugadoresUnicos);
        filaCuartoLugar = generarDatosEquipo(eval("fila.miembrosEquipo" + ordenDeEquipos[3][0].slice(-1)), eval("fila.equipo" + ordenDeEquipos[3][0].slice(-1)), jugadoresUnicos);
        filaHTML = "<div class='fila " + color + "'>" + filaFecha + filaPrimerLugar + filaSegundoLugar + filaTercerLugar + filaCuartoLugar + "</div>";
        tablaHTML += filaHTML;
    }
    tabla.innerHTML = tablaHTML;

    // luego armo filtros
    for (var i = 0; i < jugadoresUnicos.length; i++) {
        var jugador = jugadoresUnicos[i];
        var jugadorHTML = "<div class='jugador-filtro miembro-equipo--"+jugador.replace("/", "")+" jugador-filtro--"+jugador.replace("/", "")+"' id='jugador-filtro--" + jugador.replace("/", "") + "' onclick=filtrarPlayers('"+jugador.replace("/", "")+"')>" + jugador + "</div>";
        filtros.innerHTML += jugadorHTML;
    }
    console.log(jugadoresUnicos);
}

function filtrarPlayers(jugador) {
    var filas = document.getElementsByClassName("fila");
    var filtros = document.getElementsByClassName("jugador-filtro");
    
    for (var i = 0; i < filas.length; i++) {
        var fila = filas[i];
        if (fila.innerHTML.includes(jugador)) {
            fila.classList.remove("fila--escondida");
            var miembros = fila.getElementsByClassName("miembro-equipo");
            for (var j = 0; j < miembros.length; j++) {
                var miembro = miembros[j];
                if (miembro.innerHTML.includes(jugador)) {
                    miembro.classList.add("jugador-filtro--seleccionado");
                } else {
                    miembro.classList.remove("jugador-filtro--seleccionado");
                }
            }
        } else {
            fila.classList.add("fila--escondida");
        }
    }

    for (var i = 0; i < filtros.length; i++) {
        var filtro = filtros[i];
        if (filtro.innerHTML.includes(jugador)) {
            filtro.classList.add("jugador-filtro--seleccionado");
        } else {
            filtro.classList.remove("jugador-filtro--seleccionado");
        }
    } 


}