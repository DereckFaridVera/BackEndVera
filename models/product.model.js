import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    talla: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Product', ProductSchema);