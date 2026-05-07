import Order from '../models/order.model.js';

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('cliente');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener pedidos" });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('cliente');

        if (!order) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener pedido" });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { cliente, productos, total } = req.body;

        if (!cliente || !productos || !total) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios"
            });
        }

        const newOrder = new Order({ cliente, productos, total });
        await newOrder.save();

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: "Error al crear pedido" });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const updated = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: 'after' }
        );

        if (!updated) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar pedido" });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const deleted = await Order.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        res.json({ message: "Pedido eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar pedido" });
    }
};