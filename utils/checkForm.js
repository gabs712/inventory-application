const { body } = require('express-validator')

module.exports = [
  body('name')
    .notEmpty()
    .withMessage('Name must not be empty')
    .isLength({ max: 70 })
    .withMessage('Max length for name is 70'),
  body('type')
    .notEmpty()
    .withMessage('Type must not be empty')
    .isLength({ max: 20 })
    .withMessage('Max length for type is 20'),
  body('hp')
    .notEmpty()
    .withMessage('Hp must not be empty')
    .isInt({ gt: 0 })
    .withMessage('Hp must be a postive number'),
  body('attack')
    .notEmpty()
    .withMessage('Attack must not be empty')
    .isInt({ gt: 0 })
    .withMessage('Attack must be a postive number'),
  ,
]
