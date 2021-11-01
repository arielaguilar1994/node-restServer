const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario.model');

const getUser = async(req = request, res = response) => {
    
    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    // como el await es bloqueante en vez de usar dos el cual una no depende de la otra
    // utilizo promise all para que se ejecuten simultaneamente, si una falla, fallan todas
    const [ total, users ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
                .skip(Number(from))
                .limit(Number(limit))
    ]);

    res.status(200).json({
        msg: 'get API - controlador',
        total,
        users
    });
};

const putUser = async(req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, google, ...remainder } = req.body;

    // TODO: validate in the database
    if( password ){
        const salt = bcryptjs.genSaltSync();
        remainder.password = bcryptjs.hashSync(password, salt);
    }

    const user = await Usuario.findByIdAndUpdate(id, remainder, { new: true });

    res.status(200).json({
        msg: 'put API - controlador',
        user
    });
};

const postUser = async(req = request, res = response) => {

    const { name, email, password, role } = req.body;
    const usuario = new Usuario( { name, email, password, role } );

    // Encrypt pass
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Save DB
    await usuario.save();

    res.status(201).json({
        msg: 'post API - controlador',
        usuario
    });
};

const deleteUser = async(req = request, res = response) => {

    const { id } = req.params;

    // Fisic delete
    // const user = await Usuario.findByIdAndDelete(id);
    
    // Logic delete
    const user = await Usuario.findByIdAndUpdate(id, { state: false });

    res.json({
        msg: 'delete API - controlador',
        user
    });
}

module.exports = {
    getUser,
    putUser,
    postUser,
    deleteUser,
};