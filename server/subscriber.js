require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const { createSocket, printMessage } = require('./helper');
const { subscribe, setTopicInfo } = require('./topics');

app.use(express.json());
app.use(cors());

const SUBSCRIBER_PORT = process.env.SUBSCRIBER_PORT;

app.post('/test1', (req, res) => {
  const { topic } = req.body;
  const url = `http://localhost:${SUBSCRIBER_PORT}/test1`;
  req.url = url;

  subscribe(topic, url, res);
  return res.status(200).json({
    url,
    topic
  });
});

app.post('/test2', (req, res) => {
  const { topic } = req.body;
  const url = `http://localhost:${SUBSCRIBER_PORT}/test2`;
  req.url = url;

  subscribe(topic, url, res);
  return res.status(200).json({
    url,
    topic
  });
});

app.ws('/:topic', (socket, req) => {
  // possible error here
  try {
    const { topic } = req.params;
    const { url } = req;

    setTopicInfo(topic, { url, socket });

    socket.on('close', () => {
      let currentIndex;
      const urlCopy = url;

      topicInfoArray.forEach((topicInfo, index) => {
        if (topicInfo.url === urlCopy) currentIndex = index;
      });
      topicInfoArray.splice(currentIndex, 1);
    });
  } catch (error) {
    console.log('websocket error: ', error);
  }
});

app.listen(SUBSCRIBER_PORT, () => {
  console.log(`Publisher listening on port ${PUBLISHER_PORT}`);
});
