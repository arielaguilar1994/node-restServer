const { Router } = require('express');
const { check } = require('express-validator');

const { validateInputs } = require('../middlewares/validate-inputs');

const { login, googleSingIn } = require('../controllers/auth.controller');

const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
    validateInputs
], login);

router.post('/google', [
    check('id_token', 'Token from google is required').notEmpty(),
    validateInputs
], googleSingIn);

module.exports = router;