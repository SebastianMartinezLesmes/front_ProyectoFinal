const express = require('express');
const app = express();

let envio = require('../controller/controllerCorreos');

app.post('/envio',envio.envioCorreo);

module.exports = app