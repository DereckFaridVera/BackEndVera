import { Router } from 'express';

import ejemplo from './ejemplo.routes.js';
import productRoutes from './product.routes.js';
import clientRoutes from './client.routes.js';
import orderRoutes from './order.routes.js';

const indexRoutes = Router();


indexRoutes.use('/ejemplo', ejemplo);


indexRoutes.use('/products', productRoutes);
indexRoutes.use('/clients', clientRoutes);
indexRoutes.use('/orders', orderRoutes);

export default indexRoutes;