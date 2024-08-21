const gaseosas = [
    { nombre: 'Coca-Cola', precio: 2500, imagen: 'https://www.coca-cola.com/content/dam/onexp/sv/es/brands/coca-cola/7840058006509.png', inventario: 20 },
    { nombre: 'Coca-Cola', precio: 2600, imagen: 'https://acdn.mitiendanube.com/stores/001/144/141/products/whatsapp-image-2021-08-25-at-10-58-521-0f25c3ffe2f988f61416299000066804-640-0.jpeg', inventario: 15 },
    { nombre: 'Coca-cola Light', precio: 2300, imagen:  'https://elnenearg.vtexassets.com/arquivos/ids/155871/COCA-COLA-LIGHT-X500ML-1-442.jpg?v=637914117681300000', inventario: 18},
    { nombre: 'Fanta', precio: 2400, imagen: 'https://superlago.com.ar/wp-content/uploads/2022/04/Fanta-500Ml..png', inventario: 25 },
    { nombre: 'Sprite', precio: 2300, imagen: 'https://carrefourar.vtexassets.com/arquivos/ids/368783/7790895001000_E02.jpg?v=638290817054030000', inventario: 30 },
    { nombre: 'Pepsi', precio: 2500, imagen: 'https://i5.walmartimages.com/seo/Pepsi-Soda-20oz-Bottles-Quantity-of-10_9af5129c-41a1-4d94-aa05-5a2040e522bd.f06a25921e9db5d97d7ce50b467fb61b.jpeg', inventario: 20 },
    { nombre: 'Pepsi Zero', precio: 2600, imagen: 'https://unimarc.vtexassets.com/arquivos/ids/228281/000000000000661486-UN-01.jpg?v=637944376902800000', inventario: 18 },
    { nombre: 'SevenUp', precio: 2600, imagen: 'https://chedrauimx.vtexassets.com/arquivos/ids/32040445-800-auto?v=638558942146930000&width=800&height=auto&aspect=true', inventario: 18 },
];

let carritoGaseosa = {}

function calcularCosto(precio, cantidad) {
    return cantidad * precio
}

function actualizarCantidad(index, operacion) {
    const inputCantidad = document.getElementById(`cantidad-gaseosa-${index}`)
    let cantidadActual = parseInt(inputCantidad.value) || 0

    if (operacion === 'sumar' && cantidadActual < inputCantidad.max) {
        cantidadActual++
    } else if (operacion === 'restar' && cantidadActual > 0) {
        cantidadActual--
    }

    inputCantidad.value = cantidadActual
    carritoGaseosa[index] = cantidadActual
}

function crearContenedores(lista, contenedorId, comprarTodasBtnId, confirmarCompraBtnId, mensajeId, totalId) {
    const listElement = document.getElementById(contenedorId)
    listElement.innerHTML = ''

    lista.forEach((item, index) => {
        const container = document.createElement('div')
        container.className = 'list-container'

        // Nombre de la bebida
        const title = document.createElement('h2')
        title.innerText = `${item.nombre}`
        title.className = 'h2-title'
        container.appendChild(title)

        
        const img = document.createElement('img')
        img.src = item.imagen
        img.alt = item.nombre
        img.className = 'images'
        container.appendChild(img)

        
        const controlsContainer = document.createElement('div')
        controlsContainer.className = 'controls-container'

        const btnRestar = document.createElement('button')
        btnRestar.innerText = '-'
        btnRestar.addEventListener('click', () => actualizarCantidad(index, 'restar'))
        controlsContainer.appendChild(btnRestar)

        const inputCantidad = document.createElement('input')
        inputCantidad.type = 'number'
        inputCantidad.id = `cantidad-gaseosa-${index}`
        inputCantidad.min = 0
        inputCantidad.max = item.inventario
        inputCantidad.value = carritoGaseosa[index] || 0
        inputCantidad.readOnly = true
        controlsContainer.appendChild(inputCantidad)

        const btnSumar = document.createElement('button')
        btnSumar.innerText = '+'
        btnSumar.addEventListener('click', () => actualizarCantidad(index, 'sumar'))
        controlsContainer.appendChild(btnSumar)

        container.appendChild(controlsContainer)
        listElement.appendChild(container)
    });

    document.getElementById(comprarTodasBtnId).addEventListener('click', () => comprarTodas(lista, carritoGaseosa, mensajeId, totalId))
    document.getElementById(confirmarCompraBtnId).addEventListener('click', () => confirmarCompra(lista, carritoGaseosa, mensajeId, totalId))
}
function comprarTodas(lista, carrito, mensajeId, totalId) {
    let total = 0
    let mensaje = `Has añadido las siguientes bebidas al carrito:\n`

    lista.forEach((item, index) => {
        const inputCantidad = document.getElementById(`cantidad-gaseosa-${index}`)
        const cantidad = parseInt(inputCantidad.value) || 0

        if (cantidad > 0 && cantidad <= item.inventario) {
            carrito[index] = cantidad
            total += calcularCosto(item.precio, cantidad)
            mensaje += `- ${item.nombre} (${cantidad})\n`
        } else {
            carrito[index] = 0
        }
    });

    document.getElementById(totalId).innerText = `Total: $${total}`
}

function confirmarCompra(lista, carrito, mensajeId, totalId) {
    let mensaje = ''
    let total = 0

    lista.forEach((item, index) => {
        const cantidad = carrito[index] || 0

        if (cantidad > 0) {
            total += calcularCosto(item.precio, cantidad)
            mensaje += `- ${item.nombre} (${cantidad} unidades)\n`
        }
    });

    document.getElementById(totalId).innerText = `Total: $${total}`
    Swal.fire({
        title: 'Compra Confirmada',
        text: `Has confirmado la compra de las siguientes bebidas:\n${mensaje}`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    })
}

document.addEventListener('DOMContentLoaded', () => {
    crearContenedores(gaseosas, 'gaseosas-list', 'comprar-todas-gaseosas', 'confirmar-compra-gaseosas', 'mensaje', 'total');
});


document.addEventListener('DOMContentLoaded', () => {
    const contactButtons = document.querySelectorAll('.contact-redirect')

    const faqButtons = document.querySelectorAll('.faq-redirect')


    const footer = document.getElementById('footer')

    const faqSection = document.getElementById('faq-section')

    contactButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            footer.scrollIntoView({ behavior: 'smooth' })
        })
    })

    faqButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            faqSection.scrollIntoView({ behavior: 'smooth' })
        })
    })
    const hamburgerMenu = document.getElementById('hamburger-menu')
    const navMenu = document.getElementById('nav-menu')

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('is-active')
        navMenu.classList.toggle('is_active')
    })
})