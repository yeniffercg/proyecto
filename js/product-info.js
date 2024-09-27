document.addEventListener("DOMContentLoaded", function() {
    const prodID = localStorage.getItem("prodID");

    const url = `https://japceibal.github.io/emercado-api/products//${prodID}.json`;

    getJSONData(url).then(function(resultado) {
        if (resultado.status === 'ok') {
            console.log(resultado.data);
            mostrarProducto(resultado.data);
            productosRelacionados(resultado.data.relatedProducts);

        } else {
            console.error("Error al obtener los datos:", resultado.status);
        }
    }).catch(function(error) {
        console.error("Error en la solicitud:", error);
    });
});

function mostrarProducto(p) {
    let cat = document.getElementById("category");
    let des = document.getElementById("descripcion");

    cat.innerHTML += `<a href="index.html" class="ms-2 text-decoration-none">Inicio</a> >
                        <a href="products.html" class="text-decoration-none">${p.category}</a>`;

    imagenes(p.images);

    des.innerHTML += `<h1 class="fw-bold fs-1 mb-4">${p.name}</h1>
                    <p class="fs-5 mb-4">${p.description}</p>
                    <p class="fw-bold fs-2 mb-5">${p.currency} ${p.cost}</p>
                    <p class="text-muted fs-6">${p.soldCount} productos vendidos.</p>`
}

function imagenes(array) {
    let carrusel = document.getElementById("imgcarrusel");
    let left = document.getElementById("imgleft");
    array.forEach((element) => {
        if (element === array[0]){
            carrusel.innerHTML += `
            <div class="carousel-item active">
            <img src="${element}" class="d-block w-100 my-3 rounded" alt="">
            </div>`}
        else {
            carrusel.innerHTML += `
            <div class="carousel-item">
            <img src="${element}" class="d-block w-100 my-3 rounded" alt="">
            </div>`}
    });
    array.forEach((element) => {
        left.innerHTML += `<img src="${element}" class="w-100 my-2 rounded">`
    });
}

