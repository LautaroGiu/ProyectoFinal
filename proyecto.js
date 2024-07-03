let bebidas = {
    cocacola: 2400,
    sprite: 2300,
    pepsi: 2300,
    fanta: 1900,
    aquarius: 2000,
    agua: 1500
}

function calcularCosto(bebida, precio) {
    let cantidad = Number(prompt(`Ingrese la cantidad de ${bebida} que desea comprar:`))
    let costo = cantidad * precio;

    console.log(`Ha comprado ${cantidad} unidades de ${bebida}. Total a pagar: $${costo}`)
    return costo;
}

function comprarBebida() {

    let bebida = prompt("¿Qué bebida desea comprar? (CocaCola, Sprite, Pepsi, Fanta, Aquarius, Agua)").toLowerCase()
    let total = 0;

    switch (bebida) {
        case 'cocacola':
            total = calcularCosto('cocacola', bebidas.cocacola)
            break;
        case 'sprite':
            total = calcularCosto('sprite', bebidas.sprite)
            break;
        case 'pepsi':
            total = calcularCosto('pepsi', bebidas.pepsi)
            break;
        case 'fanta':
            total = calcularCosto('fanta', bebidas.fanta)
            break;
        case 'aquarius':
            total = calcularCosto('aquarius', bebidas.aquarius)
            break;
        case 'agua':
            total = calcularCosto('agua', bebidas.agua)
            break;
        default :
        console.log("bebida no disponible.");
    }

    if (bebida != bebidas) {
        
    }else {
        console.log(`Total a pagar: $${total}`);
    }
}

comprarBebida();
