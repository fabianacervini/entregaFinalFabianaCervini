document.addEventListener('DOMContentLoaded', function () {
  const listaPrestamos = document.querySelector('.lista-prestamos');

  // Función para cargar y mostrar el historial de préstamos
  async function cargarHistorial() {
    // Limpiar la lista de préstamos
    listaPrestamos.innerHTML = '';

    try {
      // Obtener el historial de préstamos desde el servidor utilizando fetch
      const response = await fetch('URL_DEL_ENDPOINT_DEL_HISTORIAL');
      const historial = await response.json();

      // Recorrer el historial y crear elementos de lista para cada préstamo
      historial.forEach((prestamo, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Préstamo ${index + 1}: Monto: $${prestamo.montoPrestamo}, Plazo: ${prestamo.plazoPrestamo} meses, Tasa: ${prestamo.tasaInteres * 100}%, Cuota: $${prestamo.pagoMensual}`;
        listaPrestamos.appendChild(listItem);
      });
    } catch (error) {
      console.error('Error al cargar el historial:', error);
    }
  }

  // Cargar y mostrar el historial al cargar la página
  cargarHistorial();
});
