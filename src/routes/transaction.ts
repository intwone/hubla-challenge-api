import { multerConfig } from '@src/config';
import { InsertTransactionController } from '@src/modules/transactions/controllers/insert-transaction-controller';
import { ListTransactionsController } from '@src/modules/transactions/controllers/list-transactions-controller';
import express from 'express';
import multer from 'multer';

const router = express.Router();
const upload = multer(multerConfig);

const insertTransactionController = new InsertTransactionController();
const listTransactionsController = new ListTransactionsController();

router.post(
  '/',
  upload.single('transactions'),
  insertTransactionController.handle,
);

router.get('/', listTransactionsController.handle);

export default router;
