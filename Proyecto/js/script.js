const mostrarCardEl = document.querySelector("#mostrarCard");
const tituloEl = document.querySelector("#titulo");
const catEl = document.querySelector("#categoria")

addEventListener("DOMContentLoaded", () => {
  cargarIngredientes("Vodka");
});

const cargarIngredientes = async (nombre) => {
      try {
        const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}`);
        if (resp.status === 200) {
          const datos = await resp.json();
          renderCard(datos);
        } else if (resp === 401) {
          console.log('sin Conexion');
        } else if (resp === 404) {
          console.log('No existe el personaje');
        } else {
          console.log('Error fatal');
        }
      } catch (error) {
        console.log(error);
      }
    };

function renderCard(datos) {
  tituloEl.innerHTML = "Cocteleria";
  let valor = "";
  datos.drinks.forEach(bebida => {
    valor += `
    <div class="col-3 py-5">
    <div class="card">
      <img src="${bebida.strDrinkThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h3>${bebida.strDrink}</h3>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
    </div>
    </div>
    `;
  });
  mostrarCardEl.innerHTML = valor;
}

catEl.addEventListener("click", (e) => {
  e.preventDefault()
  if(e.target && e.target.tagName=="A"){
    cargarIngredientes(e.target.name)
  }
})

