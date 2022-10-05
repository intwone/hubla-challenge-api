import { multerConfig } from '@src/config';
import {
  InsertTransactionController,
  ListTransactionsByTypeController,
  ListTransactionsController,
} from '@src/modules/transactions/controllers';
import express from 'express';
import multer from 'multer';

const router = express.Router();
const upload = multer(multerConfig);

const insertTransactionController = new InsertTransactionController();
const listTransactionsController = new ListTransactionsController();
const listTransactionsByTypeController = new ListTransactionsByTypeController();

router.post(
  '/',
  upload.single('transactions'),
  insertTransactionController.handle,
);

router.get('/', listTransactionsController.handle);
router.get('/:type', listTransactionsByTypeController.handle);

export default router;
