const { Schema, model } = require('mongoose');

 const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
        // enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
 });

 // vamos a sobreescribir la function de schema y debe ser una function comun sino no funciona por temas con el this
 // cuando se mande a llamar el toJSON por mongoose se va a ejectuar esta function que la sobreescribe a la original
 // retorna el objeto manipulado como lo estamos haciendo
 userSchema.methods.toJSON = function (){
    // de esta forma sacamos la __v y pass y con el operador obtenemos el resto de propiedades
    const { __v, password,  _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
 };

 module.exports = model( 'User', userSchema  );