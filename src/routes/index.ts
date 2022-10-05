import { Router } from 'express';
import transactionRouter from './transaction';

const routes = Router();

routes.use('/transaction', transactionRouter);

export default routes;
