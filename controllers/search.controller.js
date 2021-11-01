const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { User, Category, Product } = require('../models');

const collectionsAllowed = [
    'users',
    'categories',
    'products',
    'roles',
];

const searchUser = async( keyWord = '', res = response ) => {
    const isIdMongo = ObjectId.isValid( keyWord );

    if( isIdMongo ){
        const user = await User.findById( keyWord );

        return res.json({
            result: ( user ) ? [ user ] : []
        });
    }

    const regExp = new RegExp(keyWord, 'i');

    const users = await User.find({
        $or: [ { name: regExp }, { email: regExp } ],
        $and: [ { state: true } ]
    });

    res.json({
        result: users
    });
};

const searchCategory = async( keyWord = '', res = response ) => {
    const isIdMongo = ObjectId.isValid( keyWord );

    if( isIdMongo ){
        const category = await Category.findById( keyWord );

        return res.json({
            result: ( category ) ? [ category ] : []
        });
    }

    const regExp = new RegExp(keyWord, 'i');

    const categories = await Category.find({ name: regExp, state: true });

    res.json({
        result: categories
    });
};

const searchProduct = async( keyWord = '', res = response ) => {
    const isIdMongo = ObjectId.isValid( keyWord );

    if( isIdMongo ){
        const product = await Product.findById( keyWord ).populate('category', 'name');

        return res.json({
            result: ( product ) ? [ product ] : []
        });
    }

    const regExp = new RegExp(keyWord, 'i');

    const products = await Product.find({ name: regExp, state: true})
                                  .populate('category', 'name');

    res.json({
        result: products
    });
};

const searchObject = ( req = request, res = response ) => {

    const { collection, word } = req.params;

    if( !collectionsAllowed.includes( collection ) ){
        return res.status(400).json({
            msg: `The collection allowed is ${ collectionsAllowed }`
        });
    }

    switch (collection) {
        case 'users':
            searchUser(word, res);
        break;
        case 'categories':
            searchCategory(word, res);
        break;
        case 'products':
            searchProduct(word, res);
        break;
        default:
            return res.status(500).json({
                msg: 'I forgot to do this search'
            });
    }
}

module.exports = {
    searchObject,
}