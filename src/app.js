const express = require('express');

const app = express();

app.get('/health-check', (req, res) => {
  res.send('Server up and running');
});

module.exports = app;
