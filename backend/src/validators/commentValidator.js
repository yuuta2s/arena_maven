const { body } = require('express-validator');

const commentValidationRules = () => [
  body('content')
    .isString()
    .trim()
    .withMessage('Comment text must be a string')
    .isLength({ min: 1 })
    .withMessage('Comment text cannot be empty'),
  body('user_id')
    .isInt()
    .withMessage('User ID must be an integer'),
  body('tournament_id')
    .isInt()
    .withMessage('Tournament ID must be an integer'),
];

module.exports = {
  commentValidationRules,
};
