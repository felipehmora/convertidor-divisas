//Obteniendo informacion del api
async function getData() {
  const url = "https://bcv-api.vercel.app/";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    const price = `<p class='text'>${json[1].replace(/\.?0+$/, "")}</p>`;
    document.querySelector("p").insertAdjacentHTML("beforeend", price);
  } catch (error) {
    console.error(error.message);
  }
}

getData();

console.log(new Date());

//Obteniendo fecha

let date = new Date();

let day = date.getDate();

let month = date.getMonth();

let year = date.getFullYear();

const completeDate = day + "/" + month + "/" + year;

const innerDate = `<div class='date-container'>${completeDate}</div>`;

console.log(innerDate);

document.getElementById("date").innerHTML = innerDate;

console.log(completeDate);
