const promise = require('bluebird');
const axios = require('axios');

const helper = require('./helper');

const { validateField, validateObject } = helper;

const TOPICS = {};

/**
 * @class Users
 */
module.exports = class Controller {
  /**
   * @static
   * @async
   * @memberof Controller
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Json} json object returned
   */
  static async publish(req, res) {
    try {
      const { topic } = req.params;

      validateField('topic', topic, res);
      validateObject('request body', req.body, res);
      const topicUrls = TOPICS[topic] || [];

      if (topicUrls.length) {
        const data = req.body;
        await promise.map(
          topicUrls,
          async (topicUrl) => {
            await axios.post(topicUrl, { topic, data: { ...data } });
          },
          { concurrency: 1 }
        );
      }

      return res.status(200).json({ message: 'publish successful' });
    } catch (error) {
      return res.status(500).json({ errorMessage: 'internal server error' });
    }
  }

  /**
   * @static
   * @async
   * @memberof Controller
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Json} json object returned
   */
  static async subscribe(req, res) {
    try {
      const { url } = req.body;
      const { topic } = req.params;

      validateField('url', url, res);

      if (!TOPICS[topic]) TOPICS[topic] = [];
      const topicUrls = TOPICS[topic];

      if (topicUrls.length) {
        if (topicUrls.includes(url)) {
          return res.status(409).json({
            message: 'this url has already been subscribed to this topic'
          });
        }
      }

      topicUrls.push(url);
      return res.status(200).json({ url, topic });
    } catch (error) {
      return res.status(500).json({ errorMessage: 'internal server error' });
    }
  }
};
