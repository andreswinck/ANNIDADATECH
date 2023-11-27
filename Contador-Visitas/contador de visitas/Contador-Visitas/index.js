const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5500;

// Mapa para almacenar las direcciones IP que han visitado la pagina
const visitasPorIP = new Map();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const visitas = visitasPorIP.get(ip) || 0;

  res.send(`
    <html>
      <head>
        <title>Contador de Visitas</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin: 50px;
          }
        </style>
      </head>
      <body>
        <h1>Contador de Visitas</h1>
        <p>Visitas desde tu IP: ${visitas}</p>
        <form action="/visita" method="post">
          <button type="submit">Visita</button>
        </form>
        <h2>Lista de IPs que han visitado:</h2>
        <ul>${generarLista()}</ul>
      </body>
    </html>
  `);
});

app.post('/visita', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (visitasPorIP.has(ip)) {
    visitasPorIP.set(ip, visitasPorIP.get(ip) + 1);
  } else {
    visitasPorIP.set(ip, 1);
  }
  res.redirect('/');
});

function generarLista() {
  let listaHTML = '';
  visitasPorIP.forEach((visitas, ip) => {
    listaHTML += `<li>${ip}: ${visitas} visitas</li>`;
  });
  return listaHTML;
}

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
