require('dotenv').config();

const WebSocket = require('ws');

const PUBLISHER_PORT = process.env.PUBLISHER_PORT;
const SUBSCRIBER_PORT = process.env.SUBSCRIBER_PORT;

const createSocket = async (topic) => {
  return new WebSocket(`ws://localhost:${PUBLISHER_PORT}/${topic}`);
};

const printMessage = () => {};

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
