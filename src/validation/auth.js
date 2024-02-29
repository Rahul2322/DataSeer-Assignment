const {body} = require("express-validator")

exports.userVal = [
  body('email')
    .exists().withMessage('Email address is required')
    .notEmpty().withMessage('Email address cannot be empty')
    .normalizeEmail().isEmail().withMessage('Enter vaild email address'),
]
