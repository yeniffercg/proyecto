    const itemCart = JSON.parse(localStorage.getItem('itemCart'));
    if (!itemCart){
        console.error ("No hay elementos en el local storage!")
    }

    const list = document.getElementById("product-list");
    console.log(itemCart);
    list.innerHTML += `<div class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-4">
                            <img src="" alt="${itemCart.description}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${itemCart.name}</h4>
                                <h4>${itemCart.currency} ${itemCart.cost}</h4>
                            </div>
                            <i class="bi bi-trash"></i>
                            <small class="text-muted"></small>
                        </div>
                    </div>
                </div>`;


document.getElementById("contCompra").addEventListener("click", function() {
    window.location.href = "categories.html";
});

document.getElementById("finCompra").addEventListener("click", function() {

});