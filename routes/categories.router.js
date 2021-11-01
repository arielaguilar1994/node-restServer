const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateInputs, isAdmin } = require('../middlewares');
const { existeCategoryById, existCategoryByName } = require('../Helpers/dbValidators');

const { getAll, getById, create, update, deleteCategory } = require('../controllers/category.controller');

const router = Router();

/**
 *  Get All categories - public
 */
router.get('/', getAll);

/**
 *  Get category by id - public
 */
router.get('/:id', [
    check('id', 'Is not mongo ID').isMongoId(),
    check('id').custom( existeCategoryById ),
    validateInputs,
], getById);

/**
 *  Create a category - private
 */
router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('name').custom( existCategoryByName ),
    validateInputs,
], create);

/**
 *  Updated category by id
 */
router.put('/:id', [
    validateJWT,
    check('id', 'Is not mongo ID').isMongoId(),
    check('id').custom( existeCategoryById ),
    // check('name', 'Name is required').not().isEmpty(),
    // check('name').custom( existCategoryByName ),
    validateInputs,
], update);

/**
 *  Delete a category, Is needed a role admin for this
 */
router.delete('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'Is not mongo ID').isMongoId(),
    check('id').custom( existeCategoryById ),
    validateInputs,
],deleteCategory);

module.exports = router;