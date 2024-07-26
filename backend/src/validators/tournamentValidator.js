const { body } = require('express-validator');

const tournamentValidationRules = () => [
    body('tname')
      .isString()
      .trim()
      .withMessage('Tournament name must be a string')
      .isLength({ min: 1 })
      .withMessage('Tournament name cannot be empty'),
    body('tdate')
      .isISO8601()
      .toDate()
      .withMessage('A valid date is required'),
    body('nbPlayer')
      .isIn(['2', '4', '8'])
      .withMessage('Number of players must be 2, 4, or 8'),
    body('tdescription')
      .isString()
      .trim()
      .withMessage('Description must be a string')
      .isLength({ min: 1 })
      .withMessage('Description cannot be empty'),
    body('timage')
      .custom((value, { req }) => {
        if (!req.file) {
          throw new Error('Tournament image is required');
        }
        return true;
      })
  ];
  
  module.exports = {
    tournamentValidationRules,
  };