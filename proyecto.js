let bebidas = {
    aquariusManzana: { precio: 2100, inventario: 10, imagen: 'https://kikimarket.com.ar/wp-content/uploads/2023/02/aquarius-manzana-500-ml-kiki-market-tienda-natural-dietetica-herboristeria-villa-carlos-paz-min.jpg' },
    aquariusNaranja: { precio: 2100, inventario: 12, imagen: 'https://dcdn.mitiendanube.com/stores/001/714/239/products/chaban-2-201-2ca850a33b1c3b7bca16233566930960-1024-1024.png' },
    aquariusLimon: { precio: 2100, inventario: 15, imagen: 'https://granjaya.com.ar/Admin/Imagenes/Items/30.png' },
    aquariusPomelo: { precio: 2100, inventario: 8, imagen: 'https://superlago.com.ar/wp-content/uploads/2022/08/7790895003295_02_nuevopack.jpg'},
    citricNaranja: { precio: 2500, inventario: 20, imagen: 'https://f2h.shop/media/catalog/product/cache/ab45d104292f1bb63d093e6be8310c97/c/i/citiric_nr_1.jpg' },
    citricPomelo: { precio: 2500, inventario: 18, imagen: 'https://jumboargentina.vtexassets.com/arquivos/ids/684672/Jugo-Citric-Pomelo-1l-1-883113.jpg?v=637780305783900000' },
    citricLimon: { precio: 2500, inventario: 16, imagen: 'https://carrefourar.vtexassets.com/arquivos/ids/267690/7798085681582_02.jpg?v=638066285676470000' },
    citricManzana: { precio: 2500, inventario: 14, imagen: 'https://gidfood.com.ar/wp-content/uploads/4028.jpg' },
    baggioNaranja: { precio: 2300, inventario: 25, imagen: 'https://elnenearg.vtexassets.com/arquivos/ids/166094/BAGGIO-PRONTO-NARANJA-1L-1-11430.jpg?v=638104413732970000' },
    baggioDurazno: { precio: 2300, inventario: 22, imagen: 'https://dulcilandia.com.ar/wp-content/uploads/2020/04/13712720.png' },
    baggioManzana: { precio: 2300, inventario: 20, imagen: 'https://masonlineprod.vtexassets.com/arquivos/ids/244916-800-auto?v=637873080914800000&width=800&height=auto&aspect=true' },
    baggioMultifruta: { precio: 2300, inventario: 18, imagen: 'https://acdn.mitiendanube.com/stores/001/157/846/products/el-granero-141-ed55ae6938d339d71816624915194813-1024-1024.png' },
    delValleNaranja: { precio: 2400, inventario: 15, imagen: 'https://acdn.mitiendanube.com/stores/002/483/999/products/cepita-del-valle-naranja-tentacion-lt1-4c1345a4a99dfdf67116870101957767-480-0.png' },
    delValleDurazno: { precio: 2400, inventario: 12, imagen: 'https://blowmax.com.ar/wp-content/uploads/2022/08/5-1.png' },
    delValleManzana: { precio: 2400, inventario: 10, imagen: 'https://www.rimoldimayorista.com.ar/datos/uploads/mod_catalogo/31308/cepita-manzana-1l-6063432490276_thumbnail.png?t=1617117988' },
    delValleMultifruta: { precio: 2400, inventario: 8, imagen: 'https://http2.mlstatic.com/D_NQ_NP_705073-MLA54201535717_032023-O.webp' }
}


let carrito = JSON.parse(localStorage.getItem('carrito')) || {}

function calcularCosto(bebida, precio, cantidad) {
    return cantidad * precio
}

function crearContenedores() {
    const bebidasList = document.getElementById('bebidas-list')
    bebidasList.innerHTML = ''

    for (let bebida in bebidas) {
        const container = document.createElement('div')
        container.className = 'bebida-container'

        
        const contentContainer = document.createElement('div')
        contentContainer.className = 'content-container'

        
        const title = document.createElement('h2')
        title.innerText = bebida.charAt(0).toUpperCase() + bebida.slice(1)
        contentContainer.appendChild(title)

        
        const img = document.createElement('img')
        img.src = bebidas[bebida].imagen
        img.alt = bebida;
        img.className = 'bebida-img'
        img.onerror = () => {
            console.error(`Error al cargar la imagen de ${bebida}: ${bebidas[bebida].imagen}`)
            img.alt = 'Imagen no disponible'
        };
        contentContainer.appendChild(img)

        
        contentContainer.innerHTML += `<p>Precio: $${bebidas[bebida].precio}</p>`

        
        const btnContainer = document.createElement('div')
        btnContainer.className = 'btn-container'

        const minusButton = document.createElement('button')
        minusButton.innerText = '-';
        minusButton.className = 'minus-btn'
        minusButton.addEventListener('click', () => updateQuantity(bebida, -1))

        const btnDisplay = document.createElement('span')
        btnDisplay.id = `cantidad-${bebida}`
        btnDisplay.innerText = carrito[bebida] || 0

        const plusButton = document.createElement('button')
        plusButton.innerText = '+'
        plusButton.className = 'plus-btn'
        plusButton.addEventListener('click', () => updateQuantity(bebida, 1))

        btnContainer.appendChild(minusButton)
        btnContainer.appendChild(btnDisplay)
        btnContainer.appendChild(plusButton)

        contentContainer.appendChild(btnContainer)
        container.appendChild(contentContainer)
        bebidasList.appendChild(container)
    }

    document.getElementById('comprar-todas').addEventListener('click', comprarTodas)
    document.getElementById('confirmar-compra').addEventListener('click', confirmarCompra)
}

function updateQuantity(bebida, delta) {
    const cantidadElement = document.getElementById(`cantidad-${bebida}`)
    let cantidad = parseInt(cantidadElement.innerText)
    cantidad = Math.max(0, cantidad + delta)

    if (cantidad <= bebidas[bebida].inventario) {
        cantidadElement.innerText = cantidad
        carrito[bebida] = cantidad
    }
}

function comprarTodas() {
    let mensaje = document.getElementById('mensaje')
    let totalElement = document.getElementById('total')
    let total = 0

    mensaje.innerText = ''
    totalElement.innerText = ''

    carrito = {}

    for (let bebida in bebidas) {
        let cantidad = parseInt(document.getElementById(`cantidad-${bebida}`).innerText)

        if (cantidad > 0 && cantidad <= bebidas[bebida].inventario) {
            total += calcularCosto(bebida, bebidas[bebida].precio, cantidad)
            carrito[bebida] = cantidad;
            mensaje.innerText += `Ha añadido ${cantidad} unidades de ${bebida} al carrito.\n`
        } else if (cantidad > bebidas[bebida].inventario) {
            mensaje.innerText += `No hay suficiente inventario de ${bebida}. Disponible: ${bebidas[bebida].inventario}\n`
        }
    }
    document.getElementById(totalId).innerText = `Total: $${total}`
    Swal.fire({
        title: 'Compra Realizada',
        text: mensaje,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
    totalElement.innerText = `Total a pagar: $${total}`
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

function confirmarCompra() {
    let mensaje = document.getElementById('mensaje')
    let totalElement = document.getElementById('total')
    let total = 0

    mensaje.innerText = ''
    totalElement.innerText = ''

    for (let bebida in carrito) {
        if (carrito[bebida] <= bebidas[bebida].inventario) {
            total += calcularCosto(bebida, bebidas[bebida].precio, carrito[bebida])
            bebidas[bebida].inventario -= carrito[bebida]
            mensaje.innerText += `Ha comprado ${carrito[bebida]} unidades de ${bebida}.\n`
        } else {
            mensaje.innerText += `No hay suficiente inventario de ${bebida}. Disponible: ${bebidas[bebida].inventario}\n`
        }
    }

    totalElement.innerText = `Total a pagar: $${total}`
    carrito = {}
    localStorage.removeItem('carrito')
    crearContenedores()
}

crearContenedores()


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