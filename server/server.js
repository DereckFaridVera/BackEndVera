import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import indexRoutes from '../routes/index.routes.js';
import * as db from '../db/cnn_mongodb.js';

export default class Server {
    constructor() {
       this.app = express();
       this.port = process.env.PORT || 3000;
       this.generalRoutes = '/api/';
       this.conectarDB(); 
       this.middleware();
       this.routes();
    }

    async conectarDB() {
        if (!db.isConected) {
            await db.conectarMongoDB();
        }
    }

    middleware() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(express.static('public'));
    } 
    routes() {
        this.app.use(this.generalRoutes, indexRoutes);
        this.app.use((req, res) => {
            res.status(404).send('Página no encontrada');
        });
    }  
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port.yellow);
        });
    } 
}       
