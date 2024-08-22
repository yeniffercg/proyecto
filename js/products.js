document.addEventListener("DOMContentLoaded", function(){
    getJSONData(PRODUCTS_URL).then(function(resultado){
        if(resultado.status = 'ok'){
            console.log(resultado.data);
            mostrarAutos(resultado.data.products);
        }
    })
})

function mostrarAutos(array){
    let mostrar = document.getElementById("autitos");
    array.forEach((element) => {
        mostrar.innerHTML += `
            <div class="col">
                <div class="card h-100">
                <img src="${element.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">${element.description}</p>
                </div>
                </div>
            </div>
        `;
    });
}