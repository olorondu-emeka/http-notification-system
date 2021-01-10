require('dotenv').config();

const express = require('express');
const app = express();
const expressWS = require('express-ws')(app);
const { createSocket, validateField } = require('./helper');

const PUBLISHER_PORT = process.env.PUBLISHER_PORT;

const TOPICS = {};

app.ws('/:topic', (socket, req) => {});

app.post('/subscribe/:topic', (req, res) => {
  try {
    const { topic } = req.params;
    const { url } = req.body;

    validateField('topic param', res);
    validateField('url field', res);

    createSocket(topic);
    return res.status(200).json({
      url,
      topic
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({ error });
  }
});

app.post('/publish/:topic', (req, res) => {
  try {
    const { topic } = req.params;
    const { message } = req.body;
    const topicArray = socket;
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({ error });
  }
});

app.ws('/:topic', (socket, req) => {
  const { topic } = req.params;
  const { url } = req.body;
  const topicInfo = TOPICS[topic] || [];
  topicInfo.push({
    url,
    socket
  });
});
