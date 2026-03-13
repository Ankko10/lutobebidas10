// ===== CARRITO DE COMPRAS =====
let carrito = [];

// Productos disponibles
const productos = [
    {
        id: 1,
        nombre: "Cerveza",
        precio: 2500,
        descripcion: "Cerveza fría y refrescante"
    },
    {
        id: 2,
        nombre: "Vodka",
        precio: 6000,
        descripcion: "Vodka premium importado"
    },
    {
        id: 3,
        nombre: "Fernet",
        precio: 7000,
        descripcion: "Fernet Branca de alta calidad"
    }
];

// Inicializar cuando el DOM está listo
document.addEventListener("DOMContentLoaded", function() {
    inicializarBotones();
    cargarCarritoDelLocalStorage();
});

// Inicializar los botones de agregar
function inicializarBotones() {
    document.querySelectorAll(".card button").forEach((boton, index) => {
        boton.addEventListener("click", () => {
            agregarAlCarrito(index);
        });
    });
}

// Agregar producto al carrito
function agregarAlCarrito(indice) {
    const producto = productos[indice];
    const productoEnCarrito = carrito.find(p => p.id === producto.id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    guardarCarritoEnLocalStorage();
    mostrarNotificacion(`${producto.nombre} agregado al carrito`);
}

// Guardar carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Cargar carrito desde localStorage
function cargarCarritoDelLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

// Mostrar notificación al usuario
function mostrarNotificacion(mensaje) {
    // Crear elemento de notificación
    const notificacion = document.createElement("div");
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #25d366;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    // Remover después de 2 segundos
    setTimeout(() => {
        notificacion.style.animation = "slideOut 0.3s ease";
        setTimeout(() => notificacion.remove(), 300);
    }, 2000);
}

// Agregar animaciones de notificación
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Obtener información del carrito
function obtenerInfoCarrito() {
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const cantidad = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    
    return {
        items: carrito,
        total: total,
        cantidad: cantidad
    };
}

// Log del carrito (para debugging)
console.log("Script de Luto Bebidas cargado correctamente");
