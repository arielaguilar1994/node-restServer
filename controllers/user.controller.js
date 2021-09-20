const { request, response } = require('express');

const getUser = (req = request, res = response) => {
    const { q, name, job } = req.query;
    res.status(200).json({
        msg: 'get API - controlador',
        q,
        name,
        job
    });
};

const putUser = (req = request, res = response) => {
    const { id } = req.params;
    res.status(200).json({
        msg: 'put API - controlador',
        id
    });
};

const postUser = (req = request, res = response) => {
    const { name, age } = req.body;

    res.status(201).json({
        msg: 'post API - controlador',
        name,
        age
    });
};

const deleteUser = (req = request, res = response) => {
    res.json({
        msg: 'delete API - controlador'
    });
}

module.exports = {
    getUser,
    putUser,
    postUser,
    deleteUser,
};