document.addEventListener('DOMContentLoaded', () => {
    const resultado = document.getElementById('resultado');
  
    fetch('./data/ejemplos.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        resultado.innerHTML = `
          <h2>${data.nombre}</h2>
          <p>${data.descripcion}</p>
          <p>Valor: ${data.valor}</p>
        `;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });