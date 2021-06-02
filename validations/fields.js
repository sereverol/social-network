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

const createOrUpdateProfileFields = [
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skills is required').not().isEmpty(),
];

const addExperienceFields = [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty(),
];

const addEducationFields = [
  check('school', 'School is required').not().isEmpty(),
  check('degree', 'Degree is required').not().isEmpty(),
  check('fieldofstudy', 'Field of study date is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty(),
];

module.exports = {
  signUpFields,
  logInFields,
  createOrUpdateProfileFields,
  addExperienceFields,
  addEducationFields,
};
