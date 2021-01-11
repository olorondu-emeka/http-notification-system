require('dotenv').config();

const WebSocket = require('ws');

const PUBLISHER_PORT = process.env.PUBLISHER_PORT;
const SUBSCRIBER_PORT = process.env.SUBSCRIBER_PORT;

const createSocket = (topic, url) => {
  return new WebSocket(`ws://localhost:${SUBSCRIBER_PORT}/${topic}?url=${url}`);
};

const printMessage = (dataObject, url) => {
  console.log(`WELCOME MESSAGE FROM ${url}`);
  // for(let key in dataObject){

  // }
};

const validateField = (field, res) => {
  if (!field) {
    return res.status(400).json({
      message: `${field} is required`
    });
  }
};

module.exports = {
  createSocket,
  printMessage,
  validateField
};
