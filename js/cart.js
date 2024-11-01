document.addEventListener("DOMContentLoaded", function() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const list = document.getElementById("product-list");
    const resumeList = document.getElementById("resume-list");

    if (!cart){
        resume = document.getElementById("resume");
        resume.style.display = "none";
        list.innerHTML += `
            <div class="container">
                <div class="alert alert-danger text-center" role="alert">
                    <h4 class="alert-heading">Aún no tienes productos en el carrito.</h4>
                </div>
                <div class="d-md-flex justify-content-md-center">
                    <a href="categories.html"><button class="mt-3 py-3 px-4 border rounded border-0 fs-5"
                     id="comCompra">Comenzar a comprar</button></a>
                </div>
            </div>`;
        console.error ("No hay elementos en el local storage!")
    } else {
        console.log(cart);
        cart.forEach((product) => {
            list.innerHTML += `
                <div class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-4">
                            <img src="${product.image[0]}" alt="${product.name}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between mt-2 pe-2">
                                <h4 class="mb-1">${product.name}</h4>
                                <h4>${product.currency} ${product.cost}</h4>
                            </div>
                            <p><i class="bi bi-trash"></i></p>
                            <p><i class="bi bi-heart"></i></p>
                            <small class="text-muted"></small>
                        </div>
                    </div>
                </div>`;
            resumeList.innerHTML += `
                <h5 class="fw-normal my-3">${product.name}<span class="float-end">${product.currency} ${product.cost}</span></h5>`;
        });
        calcularSubtotal(cart);
    }
});

function calcularSubtotal(cart){
    subtotal = document.getElementById("subtotal");
    subtotalUSD = document.getElementById("subtotalUSD");
    USD = (product) => (product).currency == "USD";
    UYU = (product) => (product).currency == "UYU";
    total = 0;

    if(cart.every(USD) || cart.every(UYU)){
        cart.forEach((product) => {
            total += product.cost;
            subtotal.innerHTML = product.currency + ' ' + total;
        });
    }else{
        const productsUSD = cart.filter(USD);
        const productsUYU = cart.filter(UYU);
        totalUSD = 0;
        totalUYU = 0;
        productsUSD.forEach((product) => {
            totalUYU += product.cost * 41;
            totalUSD += product.cost;
        });
        productsUYU.forEach((product) => {
            totalUYU += product.cost;
            totalUSD += Math.floor(product.cost / 41);
        });
        subtotal.innerHTML = 'UYU ' + totalUSD;
        subtotalUSD.innerHTML = 'USD ' + totalUSD;
    }
}

document.getElementById("contCompra").addEventListener("click", function() {
    window.location.href = "categories.html";
});

//document.getElementById("finCompra").addEventListener("click", function() {});