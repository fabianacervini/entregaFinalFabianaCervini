// Función para cargar el historial desde el servidor
async function cargarHistorial() {
  try {
    const response = await fetch('URL_DEL_ENDPOINT_DEL_HISTORIAL'); // Reemplaza con la URL real
    const data = await response.json();

    // Referencia al elemento de la lista en el DOM
    const listaPrestamos = document.querySelector('.lista-prestamos');

    // Limpiar contenido anterior
    listaPrestamos.innerHTML = '';

    // Iterar sobre los datos y agregar elementos a la lista
    data.forEach(prestamo => {
      const listItem = document.createElement('li');
      listItem.textContent = `Monto: ${prestamo.montoPrestamo} - Plazo: ${prestamo.plazoPrestamo} meses - Tasa: ${prestamo.tasaInteres * 100}% - Cuota: ${prestamo.pagoMensual}`;
      listaPrestamos.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error al cargar el historial:', error);
  }
}

// Invocar la función para cargar el historial al cargar la página
document.addEventListener('DOMContentLoaded', cargarHistorial);