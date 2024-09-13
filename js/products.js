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

//PAUTA 2
const ORDER_ASC_BY_PRICE = "AZ";
const ORDER_DESC_BY_PRICE = "ZA";
const ORDER_BY_PROD_COUNT = "Cost";
let currentPricesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
const url = `https://japceibal.github.io/emercado-api/cats_products/${element.cost}.json`

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "products.html"
}

function showPricesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentPricesArray.length; i++){
        let category = currentPricesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))){

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
            </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}



document.addEventListener("DOMContentLoaded", function(){
    getJSONData(url).then(function(resultados){
        if (resultados.status === "ok"){
            currentPricesArray = resultados.data
            showCategoriesList()
            //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });
});