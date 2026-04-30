import {Router} from 'express';
import {getAllEjemplos, getEjemplobyId, postEjemplo, putEjemplo, deleteEjemplo} from '../controllers/ejemplo.controllers.js';


const ejemplo = Router();

ejemplo.get('/', getAllEjemplos);

ejemplo.get('/:id', getEjemplobyId);

ejemplo.put('/:id', putEjemplo);

ejemplo.post('/', postEjemplo);

ejemplo.delete('/:id', deleteEjemplo);


export default ejemplo;