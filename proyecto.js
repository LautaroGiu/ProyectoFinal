let bebidas = {
    cocacola: { precio: 2400, inventario: 15 },
    sprite: { precio: 2300, inventario: 20 },
    pepsi: { precio: 2300, inventario: 7 },
    fanta: { precio: 1900, inventario: 19 },
    aquarius: { precio: 2000, inventario: 15 },
    agua: { precio: 1500, inventario: 10 }
}

function calcularCosto(bebida, precio, cantidad) {
    let costo = cantidad * precio
    console.log(`Ha comprado ${cantidad} unidades de ${bebida}. Total a pagar: $${costo}`)
    return costo
}

function crearContenedores() {
    const bebidasList = document.getElementById('bebidas-list')
    let total = 0

    for (let bebida in bebidas) {
        const container = document.createElement('div')
        container.className = 'bebida-container'
        container.innerHTML = `
            <h2>${bebida.charAt(0).toUpperCase() + bebida.slice(1)}</h2>
            <p>Precio: $${bebidas[bebida].precio}</p>
            <p>Inventario: ${bebidas[bebida].inventario}</p>
            <input type="number" id="cantidad-${bebida}" min="1" max="${bebidas[bebida].inventario}" placeholder="Cantidad">
            <button onclick="comprarIndividual('${bebida}')">Comprar</button>
        `;
        bebidasList.appendChild(container)
    }

    document.getElementById('comprar-todas').addEventListener('click', comprarTodas)
}

function comprarIndividual(bebida) {
    let cantidad = Number(document.getElementById(`cantidad-${bebida}`).value);
    let mensaje = document.getElementById('mensaje')
    let totalElement = document.getElementById('total')
    let total = 0;

    mensaje.innerText = ''
    totalElement.innerText = ''

    if (cantidad > 0 && cantidad <= bebidas[bebida].inventario) {
        total += calcularCosto(bebida, bebidas[bebida].precio, cantidad)
        bebidas[bebida].inventario -= cantidad;
        mensaje.innerText = `Ha comprado ${cantidad} unidades de ${bebida}.`
    } else if (cantidad > bebidas[bebida].inventario) {
        mensaje.innerText = `No hay suficiente inventario de ${bebida}. Disponible: ${bebidas[bebida].inventario}`
    }

    totalElement.innerText = `Total a pagar: $${total}`
    actualizarInventario()
}

function comprarTodas() {
    let mensaje = document.getElementById('mensaje')
    let totalElement = document.getElementById('total')
    let total = 0;

    mensaje.innerText = ''
    totalElement.innerText = ''

    for (let bebida in bebidas) {
        let cantidad = Number(document.getElementById(`cantidad-${bebida}`).value)

        if (cantidad > 0 && cantidad <= bebidas[bebida].inventario) {
            total += calcularCosto(bebida, bebidas[bebida].precio, cantidad)
            bebidas[bebida].inventario -= cantidad;
            mensaje.innerText += `Ha comprado ${cantidad} unidades de ${bebida}.\n`
        } else if (cantidad > bebidas[bebida].inventario) {
            mensaje.innerText += `No hay suficiente inventario de ${bebida}. Disponible: ${bebidas[bebida].inventario}\n`
        }
    }

    totalElement.innerText = `Total a pagar: $${total}`
    actualizarInventario()
}

function actualizarInventario() {
    const bebidasList = document.getElementById('bebidas-list');
    bebidasList.innerHTML = ''
    crearContenedores()
}

crearContenedores()
