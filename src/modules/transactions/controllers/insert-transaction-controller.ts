import { PrismaTransactionRepository } from '@src/infra/databases/prisma/repositories/prisma-transaction-repository';
import { InsertTransactionsUsecase } from '@src/modules/transactions/usecases/insert-transactions-usecase';
import { NormalizeFileUsecase } from '@src/modules/transactions/usecases/normalize-file-usecase';
import { Request, Response } from 'express';

const normalizeFileUsecase = new NormalizeFileUsecase();
const transactionRepository = new PrismaTransactionRepository();
const insertTransactionsUsecase = new InsertTransactionsUsecase(
  transactionRepository,
);

export class InsertTransactionController {
  async handle(request: Request, response: Response) {
    try {
      if (!request.file)
        return response
          .status(400)
          .json({ code: 'INPUT_FILE', message: 'file is required.' });
      const normalizedTransactions = await normalizeFileUsecase.execute(
        request.file.filename,
      );
      await insertTransactionsUsecase.execute(normalizedTransactions);
      return response.status(201).json(normalizedTransactions);
    } catch {
      return response
        .status(500)
        .json({ code: 'INTERNAL', message: 'internal server error.' });
    }
  }
}
