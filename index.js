import { apiKey } from "./apikey.js";
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/USD/VES`;
const money = document.getElementById("money-container");
const currency1 = document.getElementById("currency1");
const convert = document.getElementById("convert");
const number = document.getElementById("number");
let dolar = [];

window.onload = fetchDolar();

function fetchDolar() {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }
      return response.json();
    })
    .then((data) => {
      let innerDolar = data.conversion_rate;
      dolar.push(innerDolar);
      money.innerHTML = innerDolar;
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
}

//Obteniendo fecha

let date = new Date();

let day = date.getDate();

let month = date.getMonth() + 1;

let year = date.getFullYear();

const completeDate = day + "/" + month + "/" + year;

const innerDate = `<div class='date-container'>${completeDate}</div>`;

document.getElementById("date").innerHTML = innerDate;

//Metodo para realizar conversion monetaria
function bolivaresADolares() {
  const value1 = dolar;
  const value2 = currency1.value;

  const operacion = Number(value1) * Number(value2);

  number.innerHTML = operacion;
}

function dolaresABolivares() {
  const value1 = parseFloat(dolar); // Valor del dólar
  const value2 = parseFloat(currency1.value); // Cantidad de dólares que deseas convertir

  if (isNaN(value1) || isNaN(value2) || value2 === 0) {
    console.error("Valores no válidos");
    return;
  }

  const operacion = value2 / value1; // Multiplica el valor del dólar por la cantidad de dólares

  number.innerHTML = Math.round(operacion);
}

function llamadoAModal() {
  Swal.fire({
    title: "¿Qué transformación quieres realizar?",
    showDenyButton: true,
    confirmButtonText: "Dólares a bolívares",
    confirmButtonColor: "#3085d6", // Cambia el color del botón de confirmación
    denyButtonText: `Bolívares a dólares`,
    denyButtonColor: "#28a745",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      bolivaresADolares();
    } else if (result.isDenied) {
      dolaresABolivares();
    }
  });
}

convert.addEventListener("click", (event) => {
  event.preventDefault(); // Previene el comportamiento por defecto del botón
  llamadoAModal(); // Llama a la función que muestra la modal
});
