const validateInputs = require('../middlewares/validate-inputs');
const validateJWT = require('../middlewares/validate-jwt'); 
const validateRole = require('../middlewares/validate-roles');


module.exports = {
    ...validateInputs,
    ...validateJWT,
    ...validateRole,
}