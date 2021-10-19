const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario.model');

const { encodeJWT } = require('../Helpers/encodeJWT');
const { googleVerify } = require('../Helpers/google-verify');

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

const googleSingIn = async(req = request, res = response) => {
    const { id_token } = req.body;

    try {
        const { email, picture, name } = await googleVerify(id_token);

        let user = await Usuario.findOne({ email });

        if( !user ){
            const data = {
                name,
                email,
                password: ':P',
                img: picture,
                google: true
            };

            user = new Usuario(data);
            await user.save();
        }

        // if user in DB
        if( !user.state ){
            return res.status(401).json({
                msg: 'Talk with admin, user bloqued'
            });
        }

        // Generate JWT
        const token = await encodeJWT( user.id );

        res.status(200).json({
            user,
            token
        });   
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: 'Toke is not verify'
        });
    }
}

module.exports = {
    login,
    googleSingIn
};