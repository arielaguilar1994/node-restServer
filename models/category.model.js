const { Schema, model } = require('mongoose');

const categorySchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        require: [true, 'State is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: [true, 'User is required']
    }
});

categorySchema.methods.toJSON = function (){
    // de esta forma sacamos la __v y pass y con el operador obtenemos el resto de propiedades
    const { __v, state, ...category } = this.toObject();
    return category;
 };

module.exports = model('Category', categorySchema)