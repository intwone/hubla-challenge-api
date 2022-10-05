import { multerConfig } from '@src/config';
import { InsertTransactionController } from '@src/modules/transactions/controllers/insert-transaction-controller';
import express from 'express';
import multer from 'multer';

const router = express.Router();
const upload = multer(multerConfig);
const insertTransactionController = new InsertTransactionController();

router.post(
  '/',
  upload.single('transactions'),
  insertTransactionController.handle,
);

export default router;
