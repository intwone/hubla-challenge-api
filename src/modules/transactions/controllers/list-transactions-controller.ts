import { PrismaTransactionRepository } from '@src/infra/databases/prisma/repositories/prisma-transaction-repository';
import { Request, Response } from 'express';
import { ListTransactionsUsecase } from '../usecases';

const transactionRepository = new PrismaTransactionRepository();
const listTransactionsUsecase = new ListTransactionsUsecase(
  transactionRepository,
);

export class ListTransactionsController {
  async handle(_: Request, response: Response) {
    try {
      const transactions = await listTransactionsUsecase.execute();
      return response.status(200).json(transactions);
    } catch {
      return response
        .status(500)
        .json({ code: 'INTERNAL', message: 'internal server error.' });
    }
  }
}
