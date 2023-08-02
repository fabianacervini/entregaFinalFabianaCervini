// Hacemos referencia al botón de "calcular cuota mensual"
const calcularBtn = document.getElementById('calcularBtn')

// Declaramos las variables 
const montoPrestamoInput = document.getElementById('montoPrestamo')
const tasaInteresInput = document.getElementById('tasaInteres')
const plazoPrestamoInput = document.getElementById('plazoPrestamo')
const pagoMensualResult = document.getElementById('pagoMensual')

// Agregamos un evento para realizar cálculo y guardar datos en el LocalStorage
calcularBtn.addEventListener('click', function() {
  // Obtenemos valores ingresados en el formulario
  const montoPrestamo = parseFloat(montoPrestamoInput.value)
  const tasaInteres = parseFloat(tasaInteresInput.value)
  const plazoPrestamoMeses = parseInt(plazoPrestamoInput.value)

  // Verificamos si los valores ingresados son válidos
  if (isNaN(montoPrestamo) || isNaN(tasaInteres) || isNaN(plazoPrestamoMeses)) {
    // Si no, mostramos una alerta y detenemos la ejecución
    alert('Por favor, ingresa valores válidos.')
    return
  }

  // Convertimos la tasa de interés a decimal 
  const tasaInteresDecimal = tasaInteres / 100

  // Calculamos la cuota del préstamo y redondeamos a un valor entero
  const cuotaMensual = Math.floor((montoPrestamo * tasaInteresDecimal) / (1 - Math.pow(1 + tasaInteresDecimal, -plazoPrestamoMeses)))

  // Mostramos la cuota mensual calculada en el elemento "pagoMensualResult"
  pagoMensualResult.textContent = cuotaMensual

  // Guardamos los datos del préstamo en LocalStorage como JSON
  const datosPrestamo = {
    montoPrestamo,
    tasaInteres: tasaInteresDecimal,
    plazoPrestamo: plazoPrestamoMeses,
    pagoMensual: cuotaMensual
  }
  localStorage.setItem('datosPrestamo', JSON.stringify(datosPrestamo))
})

// Cargamos datos del préstamo almacenados en LocalStorage al recargar la página
  const datosPrestamoGuardados = JSON.parse(localStorage.getItem('datosPrestamo'))
    if (datosPrestamoGuardados) {
  // Asignamos los datos guardados
  montoPrestamoInput.value = datosPrestamoGuardados.montoPrestamo
  // Convertimos la tasa de interés a porcentaje para mostrarla en el input
  tasaInteresInput.value = datosPrestamoGuardados.tasaInteres * 100
  plazoPrestamoInput.value = datosPrestamoGuardados.plazoPrestamo
  pagoMensualResult.textContent = datosPrestamoGuardados.pagoMensual
}

