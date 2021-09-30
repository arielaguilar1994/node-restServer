const { validationResult } = require('express-validator');

const validateInputs = ( req, res, next ) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    // es llamado si el middleware pasa
    next();
}

module.exports = {
    validateInputs
}