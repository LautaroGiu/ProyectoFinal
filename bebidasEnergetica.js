// Datos de productos
const gatorades = [
    { nombre: 'Uva', precio: 2000, imagen: 'https://static.wixstatic.com/media/d2b1c5_51f9ab890fc34b6baac202fd1eb4dd2d~mv2_d_1200_1200_s_2.jpg/v1/fill/w_480,h_480,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/d2b1c5_51f9ab890fc34b6baac202fd1eb4dd2d~mv2_d_1200_1200_s_2.jpg', inventario: 20 },
    { nombre: 'Blue-Berry', precio: 2100, imagen: 'https://http2.mlstatic.com/D_619084-MLA75503916174_042024-C.jpg', inventario: 18 },
    { nombre: 'Frutas Tropicales', precio: 2200, imagen: 'https://i0.wp.com/super22deoctubre.com.ar/wp-content/uploads/2020/07/Gatorade-Sabor-Frutas-Tropicales-X-500-Ml.png?fit=800%2C800&ssl=1', inventario: 15 },
    { nombre: 'Manzana', precio: 2300, imagen: 'https://elnenearg.vtexassets.com/arquivos/ids/160013-800-auto?v=637968766127470000&width=800&height=auto&aspect=true', inventario: 14 },
    { nombre: 'Lima Limón', precio: 2400, imagen: 'https://zettabebidas.com.ar/wp-content/uploads/2023/12/GATORADE-LIMA-LIMON-500ML.jpg', inventario: 16 }
]

const monsters = [
    { nombre: 'Original', precio: 2600, imagen: 'https://acdn.mitiendanube.com/stores/001/122/764/products/340851-c69574b1579eea1aa015695098355021-640-01-bdd8cfd726e738fd2e15956317448091-640-0.jpg', inventario: 15 },
    { nombre: 'Zero Ultra', precio: 2500, imagen: 'https://i5.walmartimages.com/seo/Monster-Zero-Ultra-Sugar-Free-Energy-Drink-16-fl-oz_ea5024f5-062c-4b42-bb45-a23676aa36be.d50a702be9fe5a9fe4d837a60a6b9a52.jpeg', inventario: 10 },
    { nombre: 'Green', precio: 2700, imagen: 'https://dcdn.mitiendanube.com/stores/002/246/255/products/monster-energy-verde1-61a25ad3ec346c7c3916765619101682-640-0.png', inventario: 12 },
    { nombre: 'Sandia', precio: 2100, imagen: 'https://arcordiezb2c.vteximg.com.br/arquivos/ids/173264/Bebida-Energizante-Ultra-Watermelon-Monster-473-Cc-1-12752.jpg?v=637950621777470000', inventario: 15 },
    { nombre: 'Golden Anana', precio: 2100, imagen: 'https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00007084789421L.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', inventario: 15 },
    { nombre: 'Ultra Rosa', precio: 2100, imagen: 'https://i5.walmartimages.com/seo/Monster-Ultra-Rosa-16-fl-oz_f8a7440c-cc00-4879-854d-9ad1f083103b.9b0c18dda31a5c992eac098d449cb3bf.png', inventario: 20 },
]

const speeds = [
    { nombre: 'Red Bull', precio: 2500, imagen: 'https://acdn.mitiendanube.com/stores/861/458/products/340861-ef4bc86b471fc2670315743589613643-1024-1024.jpg', inventario: 20 },
    { nombre: 'Speed Red', precio: 2600, imagen: 'https://http2.mlstatic.com/D_637650-MLU75004684097_032024-C.jpg', inventario: 18 }
]

// Estado del carrito
let carritoGatorade = JSON.parse(localStorage.getItem('carritoGatorade')) || {}
let carritoMonster = JSON.parse(localStorage.getItem('carritoMonster')) || {}
let carritoSpeed = JSON.parse(localStorage.getItem('carritoSpeed')) || {}

// Función para calcular el costo total
function calcularCosto(precio, cantidad) {
    return cantidad * precio
}

function comprarTodas(tipo, lista, carrito, mensajeId, totalId) {
    let total = 0;
    let mensaje = `Has añadido las siguientes bebidas al carrito:\n`;

    lista.forEach((item, index) => {
        const inputCantidad = document.getElementById(`cantidad-${tipo}-${index}`);
        const cantidad = parseInt(inputCantidad.value) || 0;

        // Verifica que la cantidad sea válida
        if (cantidad > 0 && cantidad <= item.inventario) {
            carrito[index] = cantidad;
            total += calcularCosto(item.precio, cantidad);
            mensaje += `${item.nombre} (${cantidad})\n`; 
        } else {
            carrito[index] = 0;
        }
    });

    localStorage.setItem(`carrito${tipo}`, JSON.stringify(carrito));
    document.getElementById(totalId).innerText = `Total: $${total}`;
    document.getElementById(mensajeId).innerText = mensaje;
}

function confirmarCompra(tipo, lista, carrito, mensajeId, totalId) {
    let total = 0
    lista.forEach((item, index) => {
        const cantidad = carrito[index] || 0
        total += calcularCosto(item.precio, cantidad)
    })

    if (total > 0) {
        document.getElementById(mensajeId).innerText = `Compra confirmada de ${tipo}. Total a pagar: $${total}`
        localStorage.removeItem(`carrito${tipo}`)
        carrito = {}
        document.getElementById(totalId).innerText = ''
        crearContenedores(tipo, lista, `${tipo.toLowerCase()}s-list`, carrito, `comprar-todas-${tipo.toLowerCase()}`, `confirmar-compra-${tipo.toLowerCase()}`, mensajeId, totalId)
    } else {
        document.getElementById(mensajeId).innerText = `No tienes ${tipo} en el carrito para confirmar la compra.`
    }
}

// Función para actualizar la cantidad de productos en el carrito
function actualizarCantidad(tipo, index, operacion) {
    const inputCantidad = document.getElementById(`cantidad-${tipo}-${index}`)
    let cantidadActual = parseInt(inputCantidad.value)

    if (operacion === 'sumar' && cantidadActual < inputCantidad.max) {
        cantidadActual++
    } else if (operacion === 'restar' && cantidadActual > 0) {
        cantidadActual--
    }

    inputCantidad.value = cantidadActual
    carrito[index] = cantidadActual
    localStorage.setItem(`carrito${tipo}`, JSON.stringify(carrito))
}

// Función para crear los contenedores de cada bebida
function crearContenedores(tipo, lista, contenedorId, carrito, comprarTodasBtnId, confirmarCompraBtnId, mensajeId, totalId) {
    const listElement = document.getElementById(contenedorId)
    listElement.innerHTML = ''

    lista.forEach((item, index) => {
        const container = document.createElement('div')
        container.className = 'bebida-container'

        const contentContainer = document.createElement('div')
        contentContainer.className = 'content-container'

        const title = document.createElement('h2')
        title.innerText = item.nombre
        contentContainer.appendChild(title)

        const img = document.createElement('img')
        img.src = item.imagen
        img.alt = item.nombre
        img.className = 'bebida-img'
        contentContainer.appendChild(img)

        const precioElement = document.createElement('p')
        precioElement.innerText = `Precio: $${item.precio}`
        contentContainer.appendChild(precioElement)

        const controlsContainer = document.createElement('div')
        controlsContainer.className = 'controls-container'

        const btnRestar = document.createElement('button')
        btnRestar.innerText = '-'
        btnRestar.addEventListener('click', () => actualizarCantidad(tipo, index, 'restar'))
        controlsContainer.appendChild(btnRestar)

        const inputCantidad = document.createElement('input')
        inputCantidad.type = 'number'
        inputCantidad.id = `cantidad-${tipo}-${index}`
        inputCantidad.min = 0
        inputCantidad.max = item.inventario
        inputCantidad.value = carrito[index] || 0
        inputCantidad.readOnly = true
        controlsContainer.appendChild(inputCantidad)

        const btnSumar = document.createElement('button')
        btnSumar.innerText = '+'
        btnSumar.addEventListener('click', () => actualizarCantidad(tipo, index, 'sumar'))
        controlsContainer.appendChild(btnSumar)

        contentContainer.appendChild(controlsContainer)
        container.appendChild(contentContainer)
        listElement.appendChild(container)
    })

    document.getElementById(comprarTodasBtnId).addEventListener('click', () => comprarTodas(tipo, lista, carrito, mensajeId, totalId))
    document.getElementById(confirmarCompraBtnId).addEventListener('click', () => confirmarCompra(tipo, lista, carrito, mensajeId, totalId))
}

// Inicialización al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    crearContenedores('Gatorade', gatorades, 'gatorades-list', carritoGatorade, 'comprar-todas-gatorade', 'confirmar-compra-gatorade', 'mensaje-gatorade', 'total-gatorade')
    crearContenedores('Monster', monsters, 'monsters-list', carritoMonster, 'comprar-todas-monster', 'confirmar-compra-monster', 'mensaje-monster', 'total-monster')
    crearContenedores('Speed', speeds, 'speeds-list', carritoSpeed, 'comprar-todas-speed', 'confirmar-compra-speed', 'mensaje-speed', 'total-speed')
})
