import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    productos: [
        {
            nombre: String,
            precio: Number,
            talla: String
        }
    ],
    total: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Order', OrderSchema);