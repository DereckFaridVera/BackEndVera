import Client from '../models/client.model.js';

export const getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener clientes" });
    }
};

export const getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);

        if (!client) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        res.json(client);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener cliente" });
    }
};

export const createClient = async (req, res) => {
    try {
        const { nombre, email } = req.body;

        if (!nombre || !email) {
            return res.status(400).json({
                message: "Nombre y email son obligatorios"
            });
        }

        const newClient = new Client({ nombre, email });
        await newClient.save();

        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({ message: "Error al crear cliente" });
    }
};

export const updateClient = async (req, res) => {
    try {
        const updated = await Client.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: 'after' }
        );

        if (!updated) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar cliente" });
    }
};

export const deleteClient = async (req, res) => {
    try {
        const deleted = await Client.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        res.json({ message: "Cliente eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar cliente" });
    }
};