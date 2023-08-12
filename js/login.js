document.addEventListener('DOMContentLoaded', function () {
    const enviarBtn = document.getElementById('enviarBtn');
    
    enviarBtn.addEventListener('click', function () {
      // Obtener los valores ingresados por el usuario
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
      const tipoEmpleo = document.getElementById('tipoEmpleo').value;
      const motivoCredito = document.getElementById('motivoCredito').value;
      
      // Validar que los campos no estén vacíos
      if (nombre === '' || apellido === '' || motivoCredito === '') {
        alert('Por favor, completa todos los campos.');
        return;
      }
      
      // Mostrar una alerta SweetAlert de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Tu formulario ha sido enviado con éxito.',
        confirmButtonText: 'Ok'
      });
      
      // Limpiar los campos del formulario
      document.getElementById('nombre').value = '';
      document.getElementById('apellido').value = '';
      document.getElementById('tipoEmpleo').value = 'dependencia';
      document.getElementById('motivoCredito').value = '';
    });
  });