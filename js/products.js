let cost = [];
let products = [];
let arrProducts =[];

document.addEventListener("DOMContentLoaded", function() {
    const catID = localStorage.getItem("catID");
    const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
 

    getJSONData(url).then(function(resultado) {
        if (resultado.status === 'ok') {
            console.log(resultado.data);
            products = resultado.data.products;
            arrProducts = resultado.data.products;
            mostrarProductos(products);
            habilitarFiltro(products); 
        } else {
            console.error("Error al obtener los datos:", resultado.status);
        }
    }).catch(function(error) {
        console.error("Error en la solicitud:", error);
    });
});

function mostrarProductos(array) {
    let mostrar = document.getElementById("productos");
    mostrar.innerHTML = "";
    array.forEach((element) => {
            cost.push(element.cost);
            mostrar.innerHTML += `
                <div onclick="setProdID(${element.id})" class="col mb-4">
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
        })
    }

function habilitarFiltro(array) {
     buscarInput = document.getElementById("buscarInput");
     productosContainer = document.getElementById("productos");

    buscarInput.addEventListener("input", function(e) {
        searchValue = e.target.value.toLowerCase();
        productosFiltrados = array.filter(producto => {
             titulo = producto.name.toLowerCase();
             descripcion = producto.description.toLowerCase();
            return titulo.includes(searchValue) || descripcion.includes(searchValue);
        });

        productosContainer.innerHTML = ""; 
        mostrarProductos(productosFiltrados); 
    });
}

//PAUTA 2
const ORDER_ASC_BY_PRICE = 'ascendente';
const ORDER_DESC_BY_PRICE = 'descendente';
const ORDER_BY_PROD_COUNT = 'relevancia';
let currentPricesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortProducts(criteria, array){
    let result = [];

    if (criteria === ORDER_ASC_BY_PRICE){ 
       result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
          
            if ( (a).cost > (b).cost ){ return -1; }
            if ( (a).cost < (b).cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = (a.soldCount);
            let bCount = (b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }
    mostrarProductos(result);
}

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

function showPricesList(){
    
    let htmlContentToAppend = "";
    for(let i = 0; i < currentPricesArray.length; i++){
        let cost = currentPricesArray[cost]; 

        if (((minCount == undefined) || (minCount != undefined && (products.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && (products.cost) <= maxCount))){

            htmlContentToAppend += `
            <div onclick="setCatID(${element.cost})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${element.imgSrc}" alt="${element.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${element.name}</h4>
                            <small class="text-muted">${element.productCount} artículos</small>
                        </div>
                        <p class="mb-1">${element.description}</p>
                    </div>
                </div>
            </div>`
        }
        document.getElementById("price-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, pricesArray){
    currentSortCriteria = sortCriteria;

    if(pricesArray != undefined){
        currentPricesArray = pricesArray;
    }
    currentPricesArray = sortPrices(currentSortCriteria, currentPricesArray);
    showPricesList();
}

document.addEventListener("DOMContentLoaded", function(){

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortProducts('ascendente', products)
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortProducts('descendente', products)
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortProducts('relevancia', products)
    });

    //Limpiar
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;
        mostrarProductos(arrProducts);
        products = arrProducts;
        showPricesList();
    });

    //Filtrar
    document.getElementById("rangeFilterCount").addEventListener("click", function(){        
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if(minCount === '' && maxCount === ''){
           mostrarProductos(arrProducts);
        }
        if (minCount !== '') {
            const minFiltered = products.filter((product) => product.cost >= minCount);
            products = minFiltered;
            mostrarProductos(minFiltered);
            console.log('minResult', minFiltered);
        }
        if(maxCount !== ''){
            const maxFiltered = products.filter((product) => product.cost <= maxCount);
            products = maxFiltered;
            mostrarProductos(maxFiltered);
            console.log('maxResult ', maxFiltered);
        }
        if(minCount !== '' && maxCount !== '') {
            const rangeFiltered = products.filter((product) => product.cost >= minCount && product.cost <= maxCount);
            products = rangeFiltered;
            mostrarProductos(rangeFiltered);
            console.log('range', rangeFiltered);
        }
        showPricesList();
    });
});
console.log(products, cost)