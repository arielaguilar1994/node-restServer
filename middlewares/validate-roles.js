const { request, response } = require("express");


const isAdmin = (req = request, res = response, next) => {

    try {
        
        if ( !req.userLogged ){
            return res.status(500).json({
                msg: 'Error validated JWT, userLogged is invalid'
            });
        }

        const { role, name } = req.userLogged;

        if ( role !== 'ADMIN_ROLE' ){
            return res.status(401).json({
                msg: `${ name } is not administrador`
            });
        }

        next();
    } catch (error) {
        console.log(error);
        throw new Error('');
    }
};

// The operator ... in params join all params
const hasRole = ( ...roles ) => {
    // This function need return another function because receive the req and response
    return (req = request, res = response, next) => {
        
        if ( !req.userLogged ){
            return res.status(500).json({
                msg: 'Error validated JWT, userLogged is invalid'
            });
        }

        if ( !roles.includes(req.userLogged.role) ) {
            return res.status(401).json({
                msg: `Services require some this roles ${ roles }`
            });
        }

        
        next();        
    };
};

module.exports = {
    isAdmin,
    hasRole
}