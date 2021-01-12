/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const Controller = require('./controller');

const app = express();

app.use(express.json());

app.post('/publish/:topic', Controller.publish);

app.use('*', (request, response) => {
  response.status(404).send({ message: 'Not Found' });
});

const { PUBLISHER_PORT } = process.env;

app.listen(PUBLISHER_PORT, () => {
  console.log(`Publisher listening on port ${PUBLISHER_PORT}`);
});

module.exports = app;
