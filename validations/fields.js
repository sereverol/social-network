const { check, validationResult } = require('express-validator');

const signUpFields = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('phone', 'Please enter your phone number').not().isEmpty(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
];

const logInFields = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
];

module.exports = { signUpFields, logInFields };
