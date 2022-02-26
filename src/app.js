const express = require('express');

const app = express();

app.get('/health-check', (req, res) => {
  res.send('Server up and running');
});

app.get('/*', (req, res) => {
  res.status(404).json({ message: 'Page not found' });
});

app.use((err, req, res) => {});

module.exports = app;
