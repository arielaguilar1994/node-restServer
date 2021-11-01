const { Schema, model } = require('mongoose');

const productSchema = Schema({
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
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: [true, 'Category is required']
    },
    description: { type: String },
    available: { type: Boolean, default: true }
});

productSchema.methods.toJSON = function (){
    const { __v, state, ...product } = this.toObject();
    return product;
 };

module.exports = model('Product', productSchema)