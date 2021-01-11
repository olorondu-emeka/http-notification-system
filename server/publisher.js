require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');

const { validateField } = require('./helper');
const { publish } = require('./topics');

app.use(express.json());
app.use(cors());

const PUBLISHER_PORT = process.env.PUBLISHER_PORT;

app.post('/subscribe/:topic', async (req, res) => {
  try {
    const { topic } = req.params;
    const { url } = req.body;

    validateField('topic param', res);
    validateField('url field', res);

    const { data } = await axios.post(url, { topic });
    return res.status(200).json({ response: data });
  } catch (error) {
    console.log('subscribe error from publisher', error);
    return res.status(500).json({ error });
  }
});

app.post('/publish/:topic', (req, res) => {
  try {
    const { topic } = req.params;
    const { message } = req.body;

    validateField('topic param', res);
    validateField('url field', res);

    publish(topic, message);
    return res.status(200).json({ message: 'publish successful' });
  } catch (error) {
    console.log('publish error', error);
    return res.status(500).json({ error });
  }
});

app.listen(PUBLISHER_PORT, () => {
  console.log(`Publisher listening on port ${PUBLISHER_PORT}`);
});
