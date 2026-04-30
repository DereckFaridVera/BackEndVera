import Ejemplo from '../models/ejemplo.model.js';
import mongoose from 'mongoose';
import express from 'express';

export const getAllEjemplos = async (req, res) => {
    console.log('Obtiene todos los ejemplos');
    try {
        const ejemplos = await Ejemplo.find({}, { __v: 0 });
        if (ejemplos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron ejemplos' });
        }
        res.status(200).json({ ejemplos });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los ejemplos', error });
    }
};

export const getEjemplobyId = async (req, res) => {
    console.log('Obtiene un ejemplo por ID');
    const id= req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID no válido' });
        }
        const ejemplo = await Ejemplo.findById(id, { __v: 0 });
        if (!ejemplo) {
            return res.status(404).json({ message: 'Ejemplo no encontrado' });
        }
        return res.status(200).json({ ejemplo });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el ejemplo', error });
        }
    }

    export const postEjemplo = async (req, res) => {
        console.log('POST ejemplo');
        const body = req.body;
        const ejemplo = new Ejemplo(body);
        try {
            const validationError = ejemplo.validateSync();
            if (validationError) {
                const errorMessages = Object.values(validationError.errors).map(error => error.message);
                return res.status(400).json({ message: 'Error de validación', errors: errorMessages });
            }
            await ejemplo.save();
            return res.status(201).json({ message: 'Ejemplo creado exitosamente', ejemplo });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el ejemplo', error });
        }
    };

export const putEjemplo = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID no válido' });
        }
        const ejemplo = await Ejemplo.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!ejemplo) {
            return res.status(404).json({ message: 'Ejemplo no encontrado' });
             }
             return res.status(200).json({ message: 'Ejemplo actualizado exitosamente', ejemplo });
        }
        catch (error) {
            res.status(500).json({ message: 'Error al actualizar el ejemplo', error });
            }
};

export const deleteEjemplo = async (req, res) => {
    console.log('DELETE ejemplo');
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID no válido' });
        }
        const ejemplo = await Ejemplo.findByIdAndDelete(id);
        if (!ejemplo) {
            return res.status(404).json({ message: 'Ejemplo no encontrado' });
        }
        return res.status(200).json({ message: 'Ejemplo eliminado exitosamente', ejemplo });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el ejemplo', error });
        }
    };