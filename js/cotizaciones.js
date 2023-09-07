document.addEventListener('DOMContentLoaded', () => {
  const listaProductos = document.getElementById('productos');

  // Utiliza Fetch para traer los datos del archivo JSON
  fetch('../json/datos.json')
      .then(response => response.json())
      .then(data => {
          // Itera a través de los datos y crea elementos HTML para mostrarlos
          data.forEach(producto => {
              const li = document.createElement('li');
              li.classList.add('producto'); // Agrega la clase 'producto' al elemento <li>
              li.innerHTML = `
                <div class="nombre">${producto.nombre}</div>
                <div class="monto">Monto: $${producto.monto}</div>
                <div class="plazo">Plazo: ${producto.plazo} meses</div>
                <div class="cuota">Cuota: $${producto.cuota || 'N/A'}</div>
              `;
              listaProductos.appendChild(li);
          });
      })
      .catch(error => {
          console.error('Error:', error);
      });
});