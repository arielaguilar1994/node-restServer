const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const { isRoleValid, existEmail, existUserById } = require('../Helpers/dbValidators');
const { validateJWT, validateInputs, isAdmin, hasRole } = require('../middlewares');

const { getUser,
        putUser,
        postUser,
        deleteUser } = require('../controllers/user.controller');

// const router = Router();

router.get( '/', getUser );

router.put( '/:id', [
    check('id', 'Id invalid').isMongoId(),
    check('id').custom( existUserById ),
    check('role').custom( isRoleValid ),
    validateInputs
],putUser );

router.post('/', [
    check('name', 'Name is required').notEmpty(),
    check('email', 'This email is not valid').isEmail(),
    check('password', 'Password to containt 6 characters min').isLength({ min: 6 }),
    check('email').custom( existEmail ),
    // check('role', 'Rol is invalid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isRoleValid ), // se puede obviar la funcion de flecha porque toma el primer argumento y se lo pasa
    validateInputs
],postUser );

router.delete('/:id', [
    validateJWT,
    // isAdmin,
    hasRole('ADMIN_ROLE', 'SALE_ROLE'),
    check('id', 'Id invalid').isMongoId(),
    check('id').custom( existUserById ),
    validateInputs
], deleteUser );

module.exports = router;