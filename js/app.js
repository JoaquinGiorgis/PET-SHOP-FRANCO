var Titulobjeto = document.getElementById('tituloObjeto')
var productosenModal = document.getElementById('listaProductos')
var eliminarProductos = document.getElementById('carritoEliminar')
var eliminarCarrito = document.getElementById('vaciarCarrito')
var precioProductos = document.getElementById('preciototal')
var productosCarrito = [];


fetch('https://apipetshop.herokuapp.com/api/articulos')
    .then(response => response.json())
    .then(data => {
        if (document.title == 'Pet Shop - Farmacia') {
            articulos(data, 'medicamentos', Titulobjeto)
            Titulobjeto.addEventListener('click', botonCompra)

        } else if (document.title == 'Pet Shop - Juguetes') {
            articulos(data, 'juguetes', Titulobjeto)
            Titulobjeto.addEventListener('click', botonCompra)

        } else if (document.title == 'Pet Shop - Contacto') {
            document.getElementById("envio").onclick = function() { enviar() };
        }

    })

function articulos(data, tipo, tarjetaProducto) {
    var productos = {}
    productos.juguetes = []
    productos.medicamentos = []
    for (var i = 0; i < data.response.length; i++) {
        if (data.response[i].tipo == "Juguete") { productos.juguetes.push(data.response[i]) } else if (data.response[i].tipo == "Medicamento") { productos.medicamentos.push(data.response[i]) }
    }
    for (var i = 0; i < productos[`${tipo}`].length; i++) {
        var crearElemento = document.createElement('p')

        crearElemento.innerHTML = `<div " id="margen" class="card ms-4 item" style="width: 18rem;">
    <img src="${productos[tipo][i]['imagen']}" class="card-img-top " alt="producto">
    <button type="button" id="valor" class="btn btn-success botonVerde">${"Precio: $"  + productos[tipo][i]['precio'] }</button> 
    <h3 id="tituloProducto" class="card-title ms-1"> ${productos[tipo][i]['nombre'] } </h3>
    <div class="card-body d-flex align-items-end ">
    <h6> ${"Stock disponible: " + productos[tipo][i]['stock'] + " articulos."  }</h6></div>
    <button type="button" class="btn btn-danger pocoStock">Poco Stock</button>
    <h6 class="ocultar"> ${productos[tipo][i]['_id']}</h6>
    <div id="cover" class="card-body">
    <h6 class="descripcion">${ productos[tipo][i]['descripcion'] }</h6>
    <a href="# "  id="comprar" class="btn btn-dark comprar">AGREGAR AL CARRITO</a></div>`

        tarjetaProducto.appendChild(crearElemento)

        if (productos[tipo][i]['stock'] > 5) {
            document.getElementsByClassName('pocoStock')[i].style.display = "none"
        }
    }
}


function botonCompra(e) {
    if (e.target.classList.contains('comprar')) {
        var productoElegido = e.target.parentElement.parentElement
        datosProductos(productoElegido)
    }
}

listaProductos.addEventListener('click', eliminarArticulo)
eliminarCarrito.addEventListener('click', () => {
    productosCarrito = []
    productosenModal.innerHTML = ''

})



function eliminarArticulo(e) {

    if (e.target.classList.contains('borrarProducto')) {
        var articulosId = (e.target.getAttribute('data'))


        var pruebasa = productosCarrito.filter(producto => producto.id != articulosId) // Traer todos los articulos menos el que borramos

        console.log(pruebasa)


    }


}

function datosProductos(producto) {
    var informacion = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h3').textContent,
        precio: producto.querySelector('#valor').textContent,
        id: producto.querySelector('.ocultar').textContent,
        cantidad: 1

    }


    // Repeticion de productos
    var existe = productosCarrito.some(producto => producto.id === informacion.id)

    console.log(producto)
    if (existe) {
        var mercaderia = productosCarrito.map(producto => {
            if (producto.id === informacion.id) {
                producto.cantidad++
                    return producto
            } else {
                return producto
            }
        })
        productosCarrito = [...mercaderia]

    } else {
        productosCarrito = [...productosCarrito, informacion]
    }

    console.log(productosCarrito)
    articulosHTML()
}


function articulosHTML() {

    productosenModal.innerHTML = ''

    productosCarrito.forEach(producto => {
        var div = document.createElement('div')
        div.innerHTML = `
        <div class="d-flex">
        <img class="fotoproducto" src="${producto.imagen} " width="100px"> 
        <div class="d-block">
        <h4>${producto.titulo} </h4>
        <button type="button" class="btn btn-success text-uppercase botonPrecio">${producto.precio}</button> <button type="button" class="btn btn-danger text-uppercase">${"Cantidad: " + producto.cantidad}</button> 
      </svg></button>
        </div>
        </div>
        `

        productosenModal.appendChild(div)
    })


}


document.getElementById("validarForm").addEventListener('submit', validarFormulario);

function validarFormulario() {
    var nombre = document.getElementById('inputEmail4').value;
    var apellido = document.getElementById('inputPassword4').value;
    var numero = document.getElementById('inputCity').value;

    if (nombre.length == 0) {
        alert('No has escrito tu nombre');

    } else if (apellido.length == 0) {
        alert('No has escrito tu apellido');

    } else if (numero.length == 0) {
        alert('No has escrito tu numero de celular');

    } else {
        alert('Su consulta se ha enviado correctamente')
    }

}