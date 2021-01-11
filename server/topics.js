const { createSocket, printMessage } = require('./helper');

const TOPICS = {};

const getTopicInfo = (topic) => TOPICS;

const setTopicInfo = (topic, topicInfo) => {
  if (!TOPICS[topic]) TOPICS[topic] = [];

  const topicInfoArray = TOPICS[topic];
  topicInfoArray.push(topicInfo);
};

const publish = (topicInfoArray, message) => {
  const localTopicInfoArray = topicInfoArray || [];

  if (localTopicInfoArray.length) {
    console.log('yo');
    for (topicInfo of topicInfoArray) {
      const { socket } = topicInfo;
      console.log('topicInfo', socket);
      socket.send(message);
    }
  }
};

const subscribe = (topic, url, res) => {
  const topicInfoArray = TOPICS[topic] || [];

  if (topicInfoArray.length) {
    const existingTopicInfo = topicInfoArray.filter(
      (topicInfo) => topicInfo.url === url
    );
    if (existingTopicInfo.length)
      return res.status(409).json({
        message: `this server has aleady been subscribed to this topic`
      });
  }

  const socket = createSocket(topic, url);
  setTopicInfo(topic, { url, socket });

  socket.on('message', (data) => {
    const dataObject = JSON.parse(data, url);
    printMessage(dataObject);
  });

  socket.on('close', () => {
    let currentIndex;
    const urlCopy = url;

    // error here...missing topicInfoArray parameter
    topicInfoArray.forEach((topicInfo, index) => {
      if (topicInfo.url === urlCopy) currentIndex = index;
    });
    topicInfoArray.splice(currentIndex, 1);
  });

  return TOPICS;
};

module.exports = { setTopicInfo, publish, subscribe, getTopicInfo };
