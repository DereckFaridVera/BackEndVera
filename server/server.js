import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import indexRoutes from '../routes/index.routes.js';

export default class Server {
    constructor() {
       this.app = express();
       this.port = '3000';
       this.generalRoutes = '/api/';
       //Middleware
       this.middleware();
       //Rutas
       this.routes();
    }
    middleware() {
        //cors
        this.app.use(cors());
        //lectura y parseo del body
        this.app.use(bodyParser.json());
        //directorio publico
        this.app.use(express.static('public'));
    } 
    routes() {
        //localhost:3000/api/ejemplo
        this.app.use(this.generalRoutes, indexRoutes);
    }  
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    } 
}       
