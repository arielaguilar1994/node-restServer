const { response, request } = require('express');
const { Category } = require('../models');

// paginado - total - populate
const getAll = async(req = request, res = response) => {
    const { limit, from } = req.query;
    const query = { state: true};

    const [ total, categories ] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
                .populate('user', 'name')
                .skip(from)
                .limit(limit)
    ]);

    return res.status(200).json({
        total,
        categories,
    });
};

const getById = async(req = request, res = response) => {
    const { id } = req.params;

    const _category = await Category.findById(id)
                                    .populate('user', 'name');

    return res.status(200).json({
        _category
    });
};

const create = async(req = request, res = response) => {
    const name = req.body.name.toUpperCase();

    // Generate data to save
    const data = {
        name,
        user: req.userLogged._id
    };

    const category = new Category(data);

    await category.save();

    return res.status(201).json({
        msg: `${ name } was successfully created`,
        category
    });

};

const update = async(req = request, res = response) => {
    const { id } = req.params;
    const { name } = req.body;

    const data = {
        name: name.toUpperCase(),
        user: req.userLogged.id
    }

    // the last params is to return the new doc updated
    const _category = await Category.findByIdAndUpdate(id, data, { new: true });

    return res.status(200).json({
        msg: `Category with id: ${ id } was successfully updated`,
        _category
    });
};

const deleteCategory = async(req = request, res = response) => {
    const { id } = req.params;

    const _category = await Category.findByIdAndUpdate(id, { state: false }, { new: true });

    return res.status(201).json({
        msg: `Category with id: ${ id } was successfully deleted`,
        _category
    });
};


module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteCategory,
};