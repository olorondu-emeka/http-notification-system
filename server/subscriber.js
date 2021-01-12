/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const Controller = require('./controller');

const app = express();

app.use(express.json());

app.post('/', Controller.printMessage);

app.use('*', (request, response) => {
  response.status(404).send({ message: 'Not Found' });
});

const { SUBSCRIBER_PORT } = process.env;

app.listen(SUBSCRIBER_PORT, () => {
  console.log(`Subscriber listening on port ${SUBSCRIBER_PORT}`);
});

module.exports = app;
