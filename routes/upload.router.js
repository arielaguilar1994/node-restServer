const { Router } = require('express');
const { check } = require('express-validator');

const { save, uploadFile, getImage, uploadFileCloudinary } = require('../controllers/upload.controller');
const { collectionValid } = require('../helpers');
const { validateInputs, existsFile } = require('../middlewares');

const router = Router();

router.post('/',existsFile , save);

router.put('/:collection/:id', [
    check('id', 'Is not mongoId').isMongoId(),
    check('collection').custom( c => collectionValid( c, ['users', 'products']) ),
    existsFile,
    validateInputs
// ], uploadFile);
], uploadFileCloudinary);

router.get('/:collection/:id', [
    check('id', 'Is not mongoId').isMongoId(),
    check('collection').custom( c => collectionValid( c, ['users', 'products']) ),
    validateInputs
], getImage );

module.exports = router;