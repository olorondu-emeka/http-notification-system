require('dotenv').config();

const express = require('express');
const app = express();
const expressWS = require('express-ws')(app);
const { createSocket, validateField } = require('./helper');

app.use(express.json());

const PUBLISHER_PORT = process.env.PUBLISHER_PORT;
const TOPICS = {};

app.post('/subscribe/:topic', (req, res) => {
  try {
    const { topic } = req.params;
    const { url } = req.body;

    validateField('topic param', res);
    validateField('url field', res);

    const topicInfoArray = TOPICS[topic] || [];
    if (topicInfoArray.length) {
      const existingTopicInfo = topicInfoArray.filter(
        (topicInfo) => topicInfo.url === url
      );
      if (existingTopicInfo.length)
        res
          .status(409)
          .json({
            message: `this server has aleady been subscribed to this topic`
          });
    }

    createSocket(topic);
    return res.status(200).json({
      url,
      topic
    });
  } catch (error) {
    console.log('subscribe error', error);
    return res.status(500).json({ error });
  }
});

app.post('/publish/:topic', (req, res) => {
  try {
    const { topic } = req.params;
    const { message } = req.body;

    validateField('topic param', res);
    validateField('url field', res);

    const topicInfoArray = TOPICS[topic] || [];

    if (topicInfoArray.length) {
      for (topicInfo of topicInfoArray) {
        topicInfo.socket.send(message);
      }
    }

    return res.status(200).json({ message: 'publish successful' });
  } catch (error) {
    console.log('publish error', error);
    return res.status(500).json({ error });
  }
});

app.ws('/:topic', (socket, req) => {
  try {
    const { topic } = req.params;
    const { url } = req.body;

    if (!TOPICS[topic]) TOPICS[topic] = [];

    const topicInfoArray = TOPICS[topic];
    topicInfoArray.push({
      url,
      socket
    });

    socket.on('close', () => {
      let currentIndex,
        urlCopy = url;
      topicInfoArray.forEach((topicInfo, index) => {
        if (topicInfo.url === urlCopy) currentIndex = index;
      });
      topicInfoArray.splice(currentIndex, 1);
    });
  } catch (error) {
    console.log('websocket error: ', error);
  }
});

app.listen(PUBLISHER_PORT, () => {
  console.log(`Publisher listening on port ${PUBLISHER_PORT}`);
});
