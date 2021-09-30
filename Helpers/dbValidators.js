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

module.exports = {
    isRoleValid,
    existEmail,
    existUserById
}