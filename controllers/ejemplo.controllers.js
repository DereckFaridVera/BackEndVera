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