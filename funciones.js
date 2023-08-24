const factores = [];
let valoresAnuale = [];
let valoresMensuales = [];
let valorDisc = 0

function linea_Recta(vL, vR, vU, a) {
    let anual = (vL - vR) / vU;
    document.getElementById('dA').value = anual;
    let mensual = anual / 12;
    document.getElementById('dM').value = mensual;

}

function determinarFactor(anio, vL, vR) {
    let divisor = 0;
    let contador = 1;
    for (let i = 0; i <= anio; i++) {
        divisor += i;
    }

    anio++;
    while (contador < anio) {
        const factor = contador / divisor;
        factores.push(factor);
        contador++;
    }

    console.log(factores);
    valorBase(vL, vR);
}

function valorBase(vL, vR) {
    valorDisc = vL - vR;
    console.log(valorDisc);
    depresiacion_Anual();
}

function depresiacion_Anual() {
    for (let i = 0; i < factores.length; i++) {
        let valores = factores[i] * valorDisc;
        valoresAnuale.push(valores);
    }
    console.log(valoresAnuale);
    depresiacion_Mensual();
}

function depresiacion_Mensual() {
    for (let i = 0; i < valoresAnuale.length; i++) {
        let valores = valoresAnuale[i] / 12;
        valoresMensuales.push(valores);
    }
    console.log(valoresMensuales);
    comprobacion();
}

function alerta(mensaje){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: mensaje,
        showConfirmButton: false,
        timer: 1500
      })
}

function comprobacion() {
    let valores = 0;
    for (let i = 0; i < valoresAnuale.length; i++) {
        valores += valoresAnuale[i];
    }
    if (valores == valorDisc) {
        alerta("Felicidades los asientos cerraron con EXITO!!!");  
        getAll();
        return true;

    } else {
        alert("Hay algo mal :(");
        return false;
    }
  
}

function getAll() {
    year = 1;
    const tabla = document.getElementById('response');
    const tag = '<table id="myTable" class="display"></table>';
    tabla.innerHTML = tag;

    $("#myTable").append('<thead>' + '<tr>' +
        '<th style="width: 80px">Año</th>' +
        '<th style="width: 150px">Factor</th>' +
        '<th style="width: 150px">Base</th>' +
        '<th style="width: 80px">DP Anual</th>' +
        '<th style="width: 80px">DP Mensual</th>' +
        '</tr>' + '</thead>' + '<tbody>');

    for (let i = factores.length-1; i >= 0; i--) {

            $('#myTable').append('<tr>' +
                '<td>' + year + '</td>' +
                '<td>' + factores[i] + '</td>' +
                '<td>' + valorDisc + '</td>' +
                '<td>' + valoresAnuale[i] + '</td>' +
                '<td>' + valoresMensuales[i] + '</td>' +
                '</tr>');

        $('#myTable').append('</tbody>');
        year++;
    }
    $(document).ready(function () {
        $('#myTable').DataTable({
            responsive: true
        });
    });
}

