class PromoFriday {
    constructor(aliados, descuento) {
        this.aliados = aliados;
        this.promocion = descuento;
    }

    mostrarInfo() {
        return `${this.aliados} ${(this.promocion * 100)}%`;
    }
}

class Plantas {
    constructor(nombre, sigla) {
        this.nombre = nombre;
        this.sigla = sigla;
    }
    
    mostrarInfo() {
        return `${this.nombre} (${this.sigla})`;
    }
}

const generarListaDePlantas = (listaDeespeciees) => {
    let mensajeDelMenu = 'Menu:';
    let opcion = 0;
    const copiaDeLista = listaDeespeciees;
    copiaDeLista.forEach(especie => {
        opcion++;
        mensajeDelMenu += '\nOpcion ' + opcion + ': '+ especie.mostrarInfo();
    })
    return mensajeDelMenu;
};

const generarMenuPromociones = (listaDePromociones) => {
    let mensajeDelMenu = 'Tenemos las siguientes promociones bancarias:';
    let opcion = 0;
    const copiaDeLista = listaDePromociones;
    copiaDeLista.forEach(promo => {
        opcion++;
        mensajeDelMenu += '\nOpcion ' + opcion + ': '+ promo.mostrarInfo();
    })
    return mensajeDelMenu;
};

const precioUnidad = 9000;
const descuentoMediaDocena = 0.10;
const descuentoDocena = 0.15;
const cantidadDeOpciones = 6;

const listaPlantas = [
    new Plantas('Suculenta Granizo Gris B10', 'SG10'),
    new Plantas('Suculenta Sedum Estrellita B10', 'SS10'),
    new Plantas('Suculenta Echeveria Motosa B10', 'SE10'),
    new Plantas('Suculenta Camándula B8', 'SC8'),
    new Plantas('Suculenta Jade Chuec B10', 'SJ10'),
    new Plantas('Suculenta Sabilón Enano B10', 'SSB10'),
];

const promocionesAliados = [
    new PromoFriday('Museo del Oro', 0.15),
    new PromoFriday('SATENA', 0.05),
    new PromoFriday('Tarjeta Joven', 0.05),
    new PromoFriday('Mercado Pago', 0.10),
];

const mensajeBienvenida = `¡Bienvenido a Plantas Online!

Precios:
- Por unidad $${precioUnidad}.
- Llevando 6 o más ${descuentoMediaDocena * 100}% off.
- Llevando 12 o más ${descuentoDocena * 100}% off.

Selecciona a continuación la cantidad y los especiees.`;

const mensajeMenu = generarListaDePlantas(listaPlantas);

const mensajeSolicitarPlantas = `${mensajeMenu}

Ingresa el número de opción elegida:`;

const mensajePago = `Modalidad de pago:
- Opción 1: Efectivo
- Opción 2: Crédito`;

const mensajePromos = generarMenuPromociones(promocionesAliados);

const saludarUsuario = () => {
    alert (mensajeBienvenida);
};

const mostrarMenu = () => {
    alert (mensajeMenu);
};

const ingresarCantidad = () => {
    const cantidad = Number(parseInt(prompt('Ingresa la cantidad de Plantas que vas a llevar:')));
    return cantidad;
};

const verificarCantidadIngresada = (cantidad) => {
    return (cantidad <= 0 || cantidad === null || isNaN(cantidad)) ? 
        false : 
        true;
};

const solicitarCantidad = () => {
    let cantidad = ingresarCantidad();
    while (!verificarCantidadIngresada(cantidad)) {
        cantidad = ingresarCantidad();
    }
    return cantidad;
};

const solicitarOpcion = (mensaje, cantidad) => {
    let opcion = Number(parseInt(prompt(`${mensaje}`)));
    while (!verificarOpcion(opcion, cantidad)) {
        opcion = Number(parseInt(prompt(`${mensaje}`)));
    }
    return opcion;
};

const verificarOpcion = (opcion, cantidadDeOpciones) => {
    return (opcion > 0 && opcion <= cantidadDeOpciones && opcion !== null && !isNaN(opcion)) ?
        true :
        false;
};

let pedidoUsuario = [];

const mostrarPedidoEnConsola = (pedido) => {
    let mensaje = 'Los especiees elegidos son:';
    pedido.forEach(item => {
        mensaje += '\n- ' + item;
    })
    console.log(mensaje);
};

const agregarOpcionAlPedido = (opcion) => {
    // necesita restar 1 porque los indices del array empiezan en 0
    // y las cantidades fisicas las contamos desde 1 unidad en adelante
    const indice = opcion - 1;
    pedidoUsuario.push(listaPlantas[indice].nombre);
};

const solicitarEspeciees = (cantidad) => {
    for (let i = 0; i < cantidad; i++) {
        let opcion = solicitarOpcion(mensajeSolicitarPlantas, cantidadDeOpciones);
        agregarOpcionAlPedido(opcion);
    }
};

const calcularTotal = (cantidad) => {
    return cantidad * precioUnidad;
};

const aplicarDescuento = (total, promocion) => {
    const descuento = total * promocion;
    return total - descuento;
};

const calcularDescuentoCantidad = (cantidad, total) => {
    let totalAPagar = total;
    if (cantidad >= 6 && cantidad < 12) {
        totalAPagar = aplicarDescuento(total, descuentoMediaDocena);
    } else if (cantidad >= 12) {
        totalAPagar = aplicarDescuento(total, descuentoDocena);
    }
    return totalAPagar;
};

const mostrarTotal = (cantidad) => {
    const total = calcularTotal(cantidad);
    alert(`Tu total es: $${total}. A continuación Selecciona tu opción de pago.`);
};

const procesarPagoEfectivo = (total) => {
    alert(`Pago completo, tu total fue de $${total}`);
    console.log(`El pago final fue de: ${total}`);
};

const calcularDescuentoBancario = (opcion, total) => {
    let resultado;
    if (opcion === 1) {
        resultado = aplicarDescuento(total, promocionesAliados[0].promocion);
    } else if (opcion === 2) {
        resultado = aplicarDescuento(total, promocionesAliados[1].promocion);
    } else if (opcion === 3) {
        resultado = aplicarDescuento(total, promocionesAliados[2].promocion);
    } else if (opcion === 4) {
        resultado = aplicarDescuento(total, promocionesAliados[3].promocion);
    }
    return resultado;
};

const procesarPagoTarjeta = (opcion, total) => {
    const pago = calcularDescuentoBancario(opcion, total);
    alert(`Pago completo, tu total fue de $${pago}`);
    console.log(`El pago final fue de: ${pago}`);
};

const procesarPago = (total) => {
    const pagoElegido = solicitarOpcion(mensajePago, 2);
    if (pagoElegido === 1) {
        procesarPagoEfectivo(total);
    } else {
        const promoElegida = solicitarOpcion(mensajePromos, 4);
        procesarPagoTarjeta(promoElegida, total);
    }    
};

const finalizarPedido = () => {
    alert('¡Gracias por tu compra!')
};

const resetearPedido = () => {
    pedidoUsuario = [];
};
