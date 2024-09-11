/*document.addEventListener("DOMContentLoaded", function(){

    getJSONData(PRODUCTS_URL).then(function(resultado){

        if(resultado.status = 'ok'){
            console.log(resultado.data);
            mostrarProductos(resultado.data.products);
        }
    })
})*/

document.addEventListener("DOMContentLoaded", function() {
    const catID = localStorage.getItem("catID");

    const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

    getJSONData(url).then(function(resultado) {
        if (resultado.status === 'ok') {
            console.log(resultado.data);
            mostrarProductos(resultado.data.products);
        } else {
            console.error("Error al obtener los datos:", resultado.status);
        }
    }).catch(function(error) {
        console.error("Error en la solicitud:", error);
    });
});

function mostrarProductos(array) {
    let mostrar = document.getElementById("productos");
    array.forEach((element) => {
        mostrar.innerHTML += `
            <div class="col mb-4">
                <div class="card h-100 ">
                    <img src="${element.image}" class="card-img-top" alt="${element.name}">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${element.name}</h5>
                        <p class="card-text">${element.description}</p>
                        <h5 class="card-text fw-bold">${element.currency} ${element.cost}</h5>
                        <p class="card-text text-muted">${element.soldCount} productos vendidos</p>
                    </div>
                </div>
            </div>
        `;
    });
}
