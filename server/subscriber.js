require('dotenv').config();

const express = require('express');
const app = express();
const expressWS = require('express-ws')(app);
const cors = require('cors');
const { createSocket, printMessage } = require('./helper');
const { subscribe, setTopicInfo, getTopicInfo } = require('./topics');

app.use(express.json());
app.use(cors());

const SUBSCRIBER_PORT = process.env.SUBSCRIBER_PORT;

app.post('/test1', (req, res) => {
  try {
    // console.log('hello from test1');

    const { topic } = req.body;
    const url = `http://localhost:${SUBSCRIBER_PORT}/test1`;

    let topics = subscribe(topic, url, res);

    return res.status(200).json({
      url,
      topic,
      topics
    });
  } catch (error) {
    console.log('subscribe error from subscriber', error);
    return res.status(500).json({ error });
  }
});

app.post('/test2', (req, res) => {
  try {
    // console.log('hello from test2');

    const { topic } = req.body;
    const url = `http://localhost:${SUBSCRIBER_PORT}/test2`;

    let topics = subscribe(topic, url, res);
    return res.status(200).json({
      url,
      topic,
      topics
    });
  } catch (error) {
    console.log('subscribe error from subscriber', error);
    return res.status(500).json({ error });
  }
});

// app.ws('/:topic', (socket, req) => {
//   // possible error here
//   try {
//     const { topic } = req.params;
//     const { url } = req.query;

//     TOPIC_INFO = setTopicInfo(topic, { url, socket });
//     // console.log('TOPIC_INFO', TOPIC_INFO);

//     socket.on('close', () => {
//       let currentIndex;
//       const urlCopy = url;

//       // error here...missing topicInfoArray parameter
//       topicInfoArray.forEach((topicInfo, index) => {
//         if (topicInfo.url === urlCopy) currentIndex = index;
//       });
//       topicInfoArray.splice(currentIndex, 1);
//     });

//     console.log('done from web socket');
//   } catch (error) {
//     console.log('websocket error: ', error);
//   }
// });

app.listen(SUBSCRIBER_PORT, () => {
  console.log(`Subscriber listening on port ${SUBSCRIBER_PORT}`);
});
