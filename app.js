const app = document.getElementById('app');
const boton = document.getElementById('boton-iniciar');
const menu = document.getElementById('menu');

function ejecutarPrograma() {

    saludarUsuario();
    mostrarMenu();
    const cantidad = solicitarCantidad();
    console.log('La cantidad ingresada fue de: ' + cantidad);

    solicitarEspeciees(cantidad);
    mostrarPedidoEnConsola(pedidoUsuario);

    const totalSinDescuentos = calcularTotal(cantidad);
    console.log('El total sin descuentos es: ' + totalSinDescuentos);
    const totalSegunCantidad = calcularDescuentoCantidad(cantidad, totalSinDescuentos);
    console.log('El total según la cantidad de productos es: ' + totalSegunCantidad);
    mostrarTotal(cantidad);
    procesarPago(totalSegunCantidad);

    finalizarPedido();
    resetearPedido();
}

boton.onclick = ejecutarPrograma;
menu.onclick = mostrarMenu;
