import mongoose from 'mongoose';

let isConected = false;

const conectarMongoDB = async () => {
    if (isConected) {
        console.log('Ya estás conectado a MongoDB'.green);
        return;
        }
        try {
            await mongoose.connect(process.env.MONGO_URI);
            isConected = true;
            console.log('Conexión a MongoDB exitosa'.green);
        } catch (error) {
            console.error('Error al conectar a MongoDB'.red, error);
        }
}
const db = mongoose.connection;
db.on('error', (error) =>{ 
    isConected = false;
    console.error('Error en la conexión a MongoDB'.red, error); 
}
);
db.once('open', () => {
    isConected = true;
})
db.on('disconnected', () => {
    isConected = false;
    console.warn('Conexión a MongoDB perdida'.yellow);
})
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Desconectado de MongoDB'.yellow);
    process.exit(0);
})
export { conectarMongoDB, isConected };