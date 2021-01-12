/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const Controller = require('./controller');

const app = express();

app.use(express.json());

app.post('/publish/:topic', Controller.publish);
app.post('/subscribe/:topic', Controller.subscribe);

app.use('*', (request, response) => {
  response.status(404).send({ message: 'Not Found' });
});

const PORT = process.env.PUBLISHER_PORT || 8000;

app.listen(PORT, () => {
  console.log(`Publisher listening on port ${PORT}`);
});

module.exports = app;
