const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario.model');

const { encodeJWT } = require('../Helpers/encodeJWT');

const login = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {

        // Check exist email
        const usuario = await Usuario.findOne({ email });
        if( !usuario ){
            return res.status(400).json({
                msg: 'User/Password is invalid - email'
            });
        }

        // If user is actived
        if( !usuario.state ){
            return res.status(400).json({
                msg: 'User/Password is invalid - state: false'
            });
        }

        // Check pass
        const validPass = bcryptjs.compareSync( password, usuario.password );
        if( !validPass ){
            return res.status(400).json({
                msg: 'User/Password is invalid - password'
            });
        }
        // Gen JWT
        const token = await encodeJWT( usuario.id );

        res.json({
            msg: 'Login Ok',
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contact the admin'
        });
    }
};

module.exports = {
    login
};