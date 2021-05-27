const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.send(`<h1>I am running in port ${PORT}!</h1>`);
});

const PORT = 3000;

app.listen(PORT);
