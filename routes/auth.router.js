const { Router } = require('express');
const { check } = require('express-validator');

const { validateInputs } = require('../middlewares/validate-inputs');

const { login } = require('../controllers/auth.controller');

const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
    validateInputs
], login);

module.exports = router;