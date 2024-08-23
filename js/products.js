document.addEventListener("DOMContentLoaded", function(){
    getJSONData(PRODUCTS_URL).then(function(resultado){
        if(resultado.status = 'ok'){
            console.log(resultado.data);
            mostrarAutos(resultado.data.products);
        }
    })
})

function mostrarAutos(array){
    let mostrar = document.getElementById("productos");
    array.forEach((element) => {
        mostrar.innerHTML += `
            <div class="col">
                <div class="card h-100 producto">
                <img src="${element.image}" class="card-img-top" alt="${element.name}">
                <div class="card-body">
                    <h5 class="card-title nombreProd">${element.name}</h5>
                    <p class="card-text">${element.description}</p>
                    <h5 class="card-text">${element.currency} ${element.cost}</h5>
                    <p class="card-text vendidos">${element.soldCount} productos vendidos</p>
                </div>
                </div>
            </div>
        `;
    });
}