const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateInputs, isAdmin } = require('../middlewares');
const { existProductById, existeCategoryById, existProductByName } = require('../Helpers/dbValidators');

const { getAll, getById, create, update, deleteProduct } = require('../controllers/products.controller');

const router = Router();

/**
 *  Get All products - public
 */
router.get('/', getAll);

/**
 *  Get products by id - public
 */
router.get('/:id', [
    check('id', 'Is not mongo ID').isMongoId(),
    check('id').custom( existProductById ),
    validateInputs,
], getById);

/**
 *  Create a products - private
 */
router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('name').custom( existProductByName ),
    check('category', 'Category is required').not().isEmpty(),
    check('category').isMongoId(),
    check('category').custom( existeCategoryById ),
    validateInputs,
], create);

/**
 *  Updated products by id
 */
router.put('/:id', [
    validateJWT,
    check('id', 'Is not mongo ID').isMongoId(),
    // check('name', 'Name is required').not().isEmpty(),
    // check('name').custom( existProductByName ),
    check('category', 'Category is required').not().isEmpty(),
    check('category').isMongoId(),
    check('category').custom( existeCategoryById ),
    validateInputs,
], update);

/**
 *  Delete a products, Is needed a role admin for this
 */
router.delete('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'Is not mongo ID').isMongoId(),
    validateInputs,
], deleteProduct);

module.exports = router;