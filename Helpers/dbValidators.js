const { Category, Product } = require('../models');
const Role = require('../models/role.model');
const Usuario = require('../models/usuario.model');

const isRoleValid = async(role = '') => {
    const anyRole = await Role.findOne({ role });
    if(!anyRole){
        throw new Error('Role invalid');
    }
};

const existEmail = async( email = '' ) => {
    // Check email
    const exist = await Usuario.findOne({ email });
    if( exist ){
        throw new Error(`Email ${email} already exists`);
    }
};

const existUserById = async( id = '' ) => {
    // Check email
    const exist = await Usuario.findById( id );
    if( !exist ){
        throw new Error(`Id: ${ id } is invalid`);
    }
};

/**
 * @param {*} id of category 
 * validate if existe id, if not throw error
 */

const existeCategoryById = async( id = '' ) => {
    const exist = await Category.findById( id );

    if( !exist ){
        throw new Error(`Id: ${ id } of category is invalid`);
    }
};

/**
 * @param {*} name of category
 * validate if existe name of category, if exist throw error
 */
const existCategoryByName = async( name = '' ) => {
    const exist = await Category.findOne({ name: name.toUpperCase() });

    if( exist ){
        throw new Error(`Category: ${ name } already exist`);
    }
};

/**
 * 
 * @param {*} id of product
 * if not exist id, the function throw error
 */
const existProductById = async( id = '') => {
    const exist = await Product.findById( id );
    
    if( !exist ){
        throw new Error(`Id: ${ id } of product is invalid`);
    }
}

/**
 * 
 * @param {*} name of product
 * if exist product name the function throw Error
 */
const existProductByName = async(name = '') => {
    const exist = await Product.findOne({ name: name.toUpperCase() });

    if( exist ){
        throw new Error(`Product with name ${ name } already exist`);
    }
}

/**
 * Validate allowed collection
 * @param {*} collection 
 * @param {*} array 
 */
const collectionValid = (collection = '', array = []) => {
    const exist = array.includes(collection);

    if(!exist){
        throw new Error(`The collection ${ collection } is invalid. Allowed collection ${array}`);
    }

    return true;
}

module.exports = {
    isRoleValid,
    existEmail,
    existUserById,
    existeCategoryById,
    existCategoryByName,
    existProductById,
    existProductByName,
    collectionValid
}