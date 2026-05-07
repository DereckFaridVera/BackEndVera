import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener productos" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener producto" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { nombre, precio, talla } = req.body;

        if (!nombre || !precio || !talla) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios"
            });
        }

        const newProduct = new Product({ nombre, precio, talla });
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error al crear producto" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: 'after' }
        );

        if (!updated) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar producto" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar producto" });
    }
};