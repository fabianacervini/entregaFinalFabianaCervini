const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('public'));

// Configurar una ruta para obtener datos JSON
app.get('/data/ejemplos.json', (req, res) => {
  // Aquí puedes leer y enviar el contenido de ejemplos.json
  res.sendFile(__dirname + '/data/ejemplos.json');
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});



