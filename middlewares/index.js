const validateInputs = require('../middlewares/validate-inputs');
const validateJWT = require('../middlewares/validate-jwt'); 
const validateRole = require('../middlewares/validate-roles');
const validateFiles = require('../middlewares/validate-files');


module.exports = {
    ...validateInputs,
    ...validateJWT,
    ...validateRole,
    ...validateFiles,
}