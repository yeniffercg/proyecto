document.addEventListener("DOMContentLoaded", function() {
    const prodID = localStorage.getItem("prodID");

    const url = `https://japceibal.github.io/emercado-api/products//${prodID}.json`;

    getJSONData(url).then(function(resultado) {
        if (resultado.status === 'ok') {
            console.log(resultado.data);
            mostrarProductos();
        } else {
            console.error("Error al obtener los datos:", resultado.status);
        }
    }).catch(function(error) {
        console.error("Error en la solicitud:", error);
    });
});

function mostrarProductos() {
    let divi = document.getElementById("producto-info");
        divi.innerHTML += `
            <p> jhhhhhh
            </p>
        `;
    };

