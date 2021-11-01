const { response, request } = require('express');
const { Product } = require('../models')

// paginado - total - populate
const getAll = async(req = request, res = response) => {
    const { limit, from } = req.query;
    const query = { state: true};

    const [ total, products ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
                .populate('user', 'name')
                .populate('category', 'name')
                .skip(from)
                .limit(limit)
    ]);

    return res.status(200).json({
        total,
        products,
    });
};

const getById = async(req = request, res = response) => {
    const { id } = req.params;

    const _products = await Product.findById(id)
                                    .populate('user', 'name')
                                    .populate('category', 'name');

    return res.status(200).json({
        _products
    });
};

const create = async(req = request, res = response) => {
    const { state, user, ...body } = req.body;

    // Generate data to save
    const data = {
        ...body,
        name: req.body.name.toUpperCase(),
        user: req.userLogged._id,
    };

    const _products = new Product(data);

    await _products.save();

    return res.status(201).json({
        msg: `${ req.body.name } was successfully created`,
        _products
    });

};

const update = async(req = request, res = response) => {
    const { id } = req.params;
    const { state, user, ...body } = req.body;

    const data = {
        ...body,
        name: req.body.name.toUpperCase(),
        user: req.userLogged.id
    }

    // the last params is to return the new doc updated
    const _products = await Product.findByIdAndUpdate(id, data, { new: true });

    return res.status(200).json({
        msg: `Product with id: ${ id } was successfully updated`,
        _products
    });
};

const deleteProduct = async(req = request, res = response) => {
    const { id } = req.params;

    const _products = await Product.findByIdAndUpdate(id, { state: false }, { new: true });

    return res.status(201).json({
        msg: `Product with id: ${ id } was successfully deleted`,
        _products
    });
};


module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteProduct,
};