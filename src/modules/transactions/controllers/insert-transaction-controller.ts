import { PrismaTransactionRepository } from '@src/infra/databases/prisma/repositories/prisma-transaction-repository';
import {
  InsertTransactionsUsecase,
  NormalizeFileUsecase,
} from '@src/modules/transactions/usecases';
import { Request, Response } from 'express';

const normalizeFileUsecase = new NormalizeFileUsecase();
const transactionRepository = new PrismaTransactionRepository();
const insertTransactionsUsecase = new InsertTransactionsUsecase(
  transactionRepository,
);

export class InsertTransactionController {
  async handle(request: Request, response: Response) {
    if (!request.file) {
      return response
        .status(400)
        .json({ code: 'INPUT_FILE', message: 'file is required.' });
    }
    const result = await normalizeFileUsecase.execute(
      request.file.filename,
      request.file.mimetype,
    );

    if (!result) {
      return response.status(400).json({
        code: 'EXTENSION_FILE',
        message: 'only txt extension is allowed.',
      });
    }
    await insertTransactionsUsecase.execute(result);
    return response.status(201).json(result);
  }
}
