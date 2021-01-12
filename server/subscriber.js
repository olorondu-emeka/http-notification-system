/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const Controller = require('./controller');

const app = express();

app.use(express.json());

app.post('/test1', Controller.printMessage);
app.post('/test2', Controller.printMessage);

app.use('*', (request, response) => {
  response.status(404).send({ message: 'Not Found' });
});

const PORT = process.env.SUBSCRIBER_PORT || 9000;

app.listen(PORT, () => {
  console.log(`Subscriber listening on port ${PORT}`);
});

module.exports = app;
