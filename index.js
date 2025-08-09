// URL de la API
const url = "https://backcvbgtmdesa.azurewebsites.net/api/productos";
const contenedor = document.getElementById("contenedorProductos");
const contadorCarrito = document.getElementById("contadorCarrito");
let carrito = 0;

// Función para formatear el precio
function formatearPrecio(precio) {
    return parseFloat(precio).toFixed(2);
}

// Función para crear el HTML de un producto
function crearProductoHTML(producto) {
    let precioHTML = "";

    if (producto.EnOferta && producto.PrecioOferta != null) {
        precioHTML = `
            <span class="text-danger">$${formatearPrecio(producto.PrecioOferta)}</span>
            <small class="text-muted text-decoration-line-through">$${formatearPrecio(producto.Precio)}</small>
        `;
    } else {
        precioHTML = `$${formatearPrecio(producto.Precio)}`;
    }

    return `
        <div class="col-sm-12 col-md-10 mb-10">
            <div class="card product-card h-100">
                <img src="${producto.Imagen}" class="card-img-top" alt="${producto.Nombre}" onerror="this.src='https://via.placeholder.com/400x300?text=Imagen+no+disponible'">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.Nombre}</h5>
                    <p class="card-text text-muted small">${producto.Descripcion}</p>
                    <p class="fw-bold mt-2">${precioHTML}</p>
                    <button class="btn btn-primary mt-auto agregarCarrito">Añadir al carrito</button>
                </div>
            </div>
        </div>
    `;
}

// Función para manejar el evento de añadir al carrito
function manejarClickCarrito(event) {
    event.preventDefault();
    carrito++;
    contadorCarrito.textContent = carrito;
}

// Función principal para cargar los productos
async function cargarProductos() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al cargar los productos');
        }
        const productos = await response.json();
        
        contenedor.innerHTML = ''; // Limpiar el contenedor antes de agregar productos
        
        productos.forEach(producto => {
            const col = document.createElement("div");
            col.className = "col-sm-12 col-md-4 mb-4";
            col.innerHTML = crearProductoHTML(producto);
            
            // Agregar evento al botón de añadir al carrito
            col.querySelector(".agregarCarrito").addEventListener("click", manejarClickCarrito);
            
            contenedor.appendChild(col);
        });
    } catch (error) {
        console.error("Error al cargar productos:", error);
        contenedor.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger">No se pudieron cargar los productos. Por favor, intente nuevamente más tarde.</div>
            </div>
        `;
    }
}

// Cargar los productos cuando la página esté lista
document.addEventListener('DOMContentLoaded', cargarProductos);