document.addEventListener('DOMContentLoaded', () => {
  const listaProductos = document.getElementById('productos');

  // Utiliza Fetch para obtener los datos del archivo JSON
  fetch('https://fabianacervini.github.io/entregaFinalFabianaCervini/json/datos.json')
      .then(response => response.json())
      .then(data => {
          // Itera a través de los datos y crea elementos HTML para mostrarlos
          data.forEach(producto => {
              const li = document.createElement('li');
              li.textContent = `${producto.nombre}: $${producto.precio}`;
              listaProductos.appendChild(li);
          });
      })
      .catch(error => {
          console.error('Error:', error);
      });
});