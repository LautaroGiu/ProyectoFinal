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

function comprarBebida() {
    let total = 0
    let seguirComprando = true

    while (seguirComprando) {
        let bebida = prompt("¿Qué bebida desea comprar? (CocaCola, Sprite, Pepsi, Fanta, Aquarius, Agua)").toLowerCase()
        
        if (bebidas[bebida]) {
            let cantidad = Number(prompt(`Ingrese la cantidad de ${bebida} que desea comprar (disponibles: ${bebidas[bebida].inventario}):`))
            
            if (cantidad <= bebidas[bebida].inventario) {
                total += calcularCosto(bebida, bebidas[bebida].precio, cantidad)
                bebidas[bebida].inventario -= cantidad
            } else {
                document.getElementById('mensaje').innerText = `No hay suficiente inventario de ${bebida}. Disponible: ${bebidas[bebida].inventario}`;
            }
        } else {
            document.getElementById('mensaje').innerText = "Bebida no disponible.";
        }

        let respuesta = prompt("¿Desea comprar otra bebida? (sí/no)").toLowerCase()
        if (respuesta !== 'sí' && respuesta !== 'si') {
            seguirComprando = false
        }
    }

    document.getElementById('total').innerText = `Total a pagar: $${total}`;
}

comprarBebida();