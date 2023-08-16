// Hacemos referencia al botón de "calcular cuota mensual"
const calcularBtn = document.getElementById('calcularBtn')
const borrarHistorialBtn = document.getElementById('borrarHistorialBtn')

// Declaramos variables 
const montoPrestamoInput = document.getElementById('montoPrestamo')
const tasaInteresInput = document.getElementById('tasaInteres')
const plazoPrestamoInput = document.getElementById('plazoPrestamo')
const pagoMensualResultado = document.getElementById('pagoMensual')

// Variables para almacenar los valores ingresados en el formulario
let montoPrestamo
let tasaInteres
let plazoPrestamoMeses
let cuotaMensual

// Función para agregar un préstamo al historial en el almacenamiento
function agregarPrestamoAlHistorial(prestamo) {
  const historial = obtenerHistorial()
  historial.push(prestamo)
  localStorage.setItem('historial', JSON.stringify(historial))
}

// Función para obtener el historial del almacenamiento local
function obtenerHistorial() {
  const historialString = localStorage.getItem('historial')
  return historialString ? JSON.parse(historialString) : []
}

// Función para cargar el historial desde el almacenamiento local
function cargarHistorial() {
  const historial = obtenerHistorial()
  const listaPrestamos = document.querySelector('.lista-prestamos')

  // Limpiar contenido anterior
  listaPrestamos.innerHTML = ''

  // Iterar sobre los datos y agregar elementos a la lista
  historial.forEach(prestamo => {
    const listItem = document.createElement('li')
    listItem.textContent = `Monto: ${prestamo.montoPrestamo} - Plazo: ${prestamo.plazoPrestamo} meses - Tasa: ${prestamo.tasaInteres * 100}% - Cuota: ${prestamo.pagoMensual}`
    listaPrestamos.appendChild(listItem)
  })
}

// Función para borrar el historial de cotizaciones
function borrarHistorial() {
  localStorage.removeItem('historial')
  cargarHistorial() // Cargar historial actualizado
}

// Invoca la función para cargar el historial al cargar la página
document.addEventListener('DOMContentLoaded', cargarHistorial)

// Agregamos un evento para borrar el historial al hacer clic en el botón
borrarHistorialBtn.addEventListener('click', borrarHistorial)

// Agregamos un evento para realizar cálculo y guardar datos en el LocalStorage
calcularBtn.addEventListener('click', function() {
  // Obtenemos valores ingresados en el formulario
  montoPrestamo = parseFloat(montoPrestamoInput.value)
  tasaInteres = parseFloat(tasaInteresInput.value)
  plazoPrestamoMeses = parseInt(plazoPrestamoInput.value)

  // Verificamos si los valores ingresados son válidos
  if (isNaN(montoPrestamo) || isNaN(tasaInteres) || isNaN(plazoPrestamoMeses) || montoPrestamo < 0 || tasaInteres < 0 || plazoPrestamoMeses < 0) {
    // Si no, mostramos una alerta de error y detenemos la ejecución
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, ingresa valores válidos y no negativos.',
      confirmButtonText: 'Cerrar'
    })
    return
  }

  // Convertimos la tasa de interés a decimal 
  tasaInteresDecimal = tasaInteres / 100

  // Calculamos la cuota del préstamo y redondeamos a un valor entero
  cuotaMensual = Math.floor((montoPrestamo * tasaInteresDecimal) / (1 - Math.pow(1 + tasaInteresDecimal, -plazoPrestamoMeses)))

  // Mostramos un mensaje de "calculando préstamo" usando SweetAlert
  Swal.fire({
    icon: 'info',
    title: 'Estamos calculando tu préstamo',
    showConfirmButton: false
  })

  // Agregamos un retardo de 2 segundos para simular el cálculo
  setTimeout(function() {
    // Mostramos la cuota mensual calculada en un SweetAlert
    Swal.fire({
      icon: 'success',
      title: 'Resultado del cálculo',
      text: `El monto a pagar mensualmente es de: ${cuotaMensual}`,
      confirmButtonText: 'Cerrar'
    })

    // Guardamos los datos del préstamo en LocalStorage como JSON
    const datosPrestamo = {
      montoPrestamo,
      tasaInteres: tasaInteresDecimal,
      plazoPrestamo: plazoPrestamoMeses,
      pagoMensual: cuotaMensual
    }
    agregarPrestamoAlHistorial(datosPrestamo)// Agrega al historial
    cargarHistorial() // Carga historial actualizado

  }, 2000) // Retardo de 2 segundos (2000 milisegundos)
})