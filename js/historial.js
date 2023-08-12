document.addEventListener('DOMContentLoaded', function () {
    // Obtener el elemento de la lista de préstamos
    const listaPrestamos = document.querySelector('.lista-prestamos');
  
    // Cargar historial de préstamos almacenados en LocalStorage al cargar la página
    const historialPrestamos = JSON.parse(localStorage.getItem('historialPrestamos'));
    if (historialPrestamos) {
      // Agregar los préstamos al historial
      historialPrestamos.forEach((prestamo) => {
        agregarPrestamoAlHistorial(prestamo);
      });
    }
  
    // Función para agregar un préstamo al historial
    function agregarPrestamoAlHistorial(prestamo) {
      const prestamoElement = document.createElement('li');
      prestamoElement.classList.add('prestamo');
  
      const prestamoInfo = document.createElement('div');
      prestamoInfo.classList.add('prestamo-info');
  
      const titulo = document.createElement('h3');
      titulo.textContent = `Monto: $${prestamo.montoPrestamo.toFixed(2)} - Cuota: $${prestamo.pagoMensual.toFixed(2)}`;
  
      const detalles = document.createElement('span');
      detalles.textContent = `Plazo: ${prestamo.plazoPrestamo} meses - Tasa: ${prestamo.tasaInteres * 100}%`;
  
      prestamoInfo.appendChild(titulo);
      prestamoInfo.appendChild(detalles);
      prestamoElement.appendChild(prestamoInfo);
  
      listaPrestamos.appendChild(prestamoElement);
    }
  });