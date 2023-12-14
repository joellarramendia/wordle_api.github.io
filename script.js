const button = document.getElementById('guess-button');
const restartButton = document.getElementById('restart-button');
const input = document.getElementById('guess-input');
const alerta = document.getElementById('alerta');
const valor = input.value;
let intentos = 6;
const UrlAPI = 'https://random-word-api.herokuapp.com/word?lang=es&length=5'; //API para obtener palabras aleatorias




window.addEventListener('load', init)
function init() {
    console.log('Esto se ejecuta solo cuando se carga la pagina')
}

fetch(UrlAPI).then(response => response.json())//Obtener palabras aleatorias de la API
    .then(response => {
        palabra = response[0].toUpperCase();
        console.log("API: ",palabra);
    })
    .catch(err => {
        console.log('hubo un problema con la API >:c');
        let diccionario = ["PERRO", "CASA", "LIBRO", "COCHE", "PLAYA", "MESA", "HUEVO", "LAPIZ", "ARBOL", "TIGRE"];
        palabra = diccionario[Math.floor(Math.random() * diccionario.length)].toUpperCase();
        console.log(palabra);
    }) 


function leerIntento() {
    let intento = document.getElementById('guess-input');
    intento = intento.value;
    intento = intento.toUpperCase();
    return intento;
}

button.addEventListener('click', intentar);

function intentar() {
    const INTENTO = leerIntento();
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';

    // Verificar la longitud de la palabra ingresada
    if (INTENTO.length !== 5) {
        alerta.style.display = "block";
        GRID.style.display = "none";
        ROW.style.display = "none";
    }else{
        alerta.style.display = "none";
        GRID.style.display = "block";
        ROW.style.display = "block";
    }

    if (INTENTO == palabra) {
        terminar("<h1>GANASTE!😀</h1>")
        return
        
    }

    for (let i in palabra){
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';

        if(INTENTO[i] === palabra[i]){ //VERDE
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "#79b851";
        }else if(palabra.includes(INTENTO[i])){ //AMARILLO
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "#f3c237";
        }else{ //GRIS
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "#a4aec4";
        }

        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);

    intentos--;

    if(intentos == 0){
        terminar("<h1>PERDISTE!😖</h1>")
        return
    }
}

restartButton.addEventListener('click', reiniciarJuego);

function reiniciarJuego() {
    intentos = 6;
    fetch(UrlAPI)
        .then(response => response.json())
        .then(response => {
            palabra = response[0].toUpperCase();
            console.log("API: ", palabra);
        })
        .catch(err => {
            console.log('Hubo un problema con la API >:c');
            let diccionario = ["PERRO", "CASA", "LIBRO", "COCHE", "PLAYA", "MESA", "HUEVO", "LAPIZ", "ARBOL", "TIGRE"];
            palabra = diccionario[Math.floor(Math.random() * diccionario.length)].toUpperCase();
            console.log(palabra);
        });

    input.value = '';
    alerta.style.display = 'none';
    document.getElementById('grid').innerHTML = '';
    document.getElementById('guesses').innerHTML = '';
    input.disabled = false;
    button.disabled = false;
}


function terminar(mensaje) {
    const INPUT = document.getElementById('guess-input');
    const boton = document.getElementById('guess-button');
    INPUT.disabled = true;
    boton.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;

    if (mensaje.includes("GANASTE")) {
        contenedor.innerHTML += "<p>Palabra correcta: ";
        for (let i = 0; i < palabra.length; i++) {
            const letra = document.createElement('span');
            letra.className = 'letter';

            // Mostrar la letra adivinada en verde
            letra.innerHTML = palabra[i];
            letra.style.backgroundColor = "#79b851";
            contenedor.appendChild(letra);
        }
        contenedor.innerHTML += "</p>";
    }
   
    
}

