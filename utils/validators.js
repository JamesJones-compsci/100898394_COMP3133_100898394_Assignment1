const { body } = require('express-validator');

exports.signupValidation = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars')
];

exports.employeeValidation = [
    body('first_name').notEmpty().withMessage('First name required'),
    body('last_name').notEmpty().withMessage('Last name required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('designation').notEmpty().withMessage('Designation required'),
    body('salary').isFloat({ min: 1000 }).withMessage('Salary >= 1000 required'),
    body('date_of_joining').notEmpty().withMessage('Joining date required'),
    body('department').notEmpty().withMessage('Department required')
];