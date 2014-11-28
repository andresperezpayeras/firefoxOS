$(function() {

    localStorage.c = (localStorage.c || "0.0");

    localStorage.momentos_str = (localStorage.momentos_str || "");

    var t = undefined,
        cl = $("#crono"),
        momentos_ul = $("#momentos_id");

    function incr() {
        localStorage.c = +localStorage.c + 0.1;
    }

    function show_time(val) {
        var tiempo = (+val).toFixed(1);

        var horas = Math.floor(tiempo / 60 / 60);
        var minutos = Math.floor((tiempo - horas * 60 * 60) / 60);
        var segundos = Math.floor(tiempo - horas * 60 * 60 - minutos * 60);
        var dec = Math.floor((tiempo - Math.floor(tiempo)) * 10);
        if (minutos < 10) {
            z_min = "0"
        } else {
            z_min = ""
        }
        if (segundos < 10) {
            z_seg = "0"
        } else {
            z_seg = ""
        }
        return horas + ":" + z_min + minutos + "'" + z_seg + segundos + "''" + dec;
    }

    function mostrar() {
        cl.html(show_time(localStorage.c));
        momentos_ul.html(localStorage.momentos_str);
    }

    function arrancar() {
        t = setInterval(function() {
            incr();
            mostrar()
        }, 100);
    }

    function parar() {
        clearInterval(t);
        t = undefined;
        localStorage.momentos_str = "<li>" + show_time(localStorage.c) + "</li>\n" + localStorage.momentos_str;
        mostrar();
    }

    function cambiar() {
        if (!t) {
            arrancar();
        } else {
            parar();
        }
    };

    function inicializar() {

        if (t === undefined) {
            localStorage.c = "0.0";
            localStorage.momentos_str = "";

            mostrar();
        }
    }
    inicializar();
    //mostrar();

    $("#cambiar").on('click', cambiar);
    $("#inicializar").on('click', inicializar);
    $("#todo").tap(cambiar);
    $("#todo").swipe(inicializar);
});