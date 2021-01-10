const TOPICS = {};

const setTopicInfo = (topic, topicInfo) => {
  if (!TOPICS[topic]) TOPICS[topic] = [];

  const topicInfoArray = TOPICS[topic];
  topicInfoArray.push(topicInfo);
};

const publish = (topic, message) => {
  const topicInfoArray = TOPICS[topic] || [];

  if (topicInfoArray.length) {
    for (topicInfo of topicInfoArray) {
      topicInfo.socket.send(message);
    }
  }
};

const subscribe = (topic, res) => {
  const topicInfoArray = TOPICS[topic] || [];

  if (topicInfoArray.length) {
    const existingTopicInfo = topicInfoArray.filter(
      (topicInfo) => topicInfo.url === url
    );
    if (existingTopicInfo.length)
      res.status(409).json({
        message: `this server has aleady been subscribed to this topic`
      });
  }

  const socket = createSocket(topic);
  socket.on('message', (data) => {
    const dataObject = JSON.parse(data);
    printMessage(dataObject);
  });
};

module.exports = { setTopicInfo, publish, subscribe };
