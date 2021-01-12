/**
 * @param {string} fieldName name of field to be validated
 * @param {string} fieldValue  value of field to be validated
 * @param {object} res express.js response object
 * @returns {json} JSON response
 */
const validateField = (fieldName, fieldValue, res) => {
  if (!fieldValue) {
    return res.status(400).json({
      message: `${fieldName} is required`
    });
  }
};

/**
 *
 * @param {string} objectName name of the object to be validated
 * @param {object} objectValue the object to be validated
 * @param {object} res express.js response object
 * @returns {json} JSON response
 */
const validateObject = (objectName, objectValue, res) => {
  if (!objectValue || Object.keys(objectValue).length === 0) {
    return res.status(400).json({
      message: `${objectName} is required`
    });
  }
};

module.exports = {
  validateField,
  validateObject
};
