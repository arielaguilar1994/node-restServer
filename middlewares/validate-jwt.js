const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuario.model');

const validateJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'Token is required'
        });
    }

    try {
        // if this instructions is not valid throw new Error
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const userLogged = await usuarioModel.findById(uid);

        if( !userLogged ){
            return res.status(401).json({
                msg: 'Token is invalid - User not exist'
            });
        }

        if( !userLogged.state ){
            return res.status(401).json({
                msg: 'Token is invalid - Incative user'
            });
        }

        // JS is for references, insert uid like new property
        req.userLogged = userLogged;
        next();

    } catch (error) {
        return res.status(401).json({
            msg: 'Token is invalid'
        });
    }

};

module.exports = {
    validateJWT
};