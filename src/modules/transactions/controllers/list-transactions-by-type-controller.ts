import { PrismaTransactionRepository } from '@src/infra/databases/prisma/repositories/prisma-transaction-repository';
import { Request, Response } from 'express';
import { ListTransactionsByTypeUsecase } from '../usecases';

const transactionRepository = new PrismaTransactionRepository();
const listTransactionsByTypeUsecase = new ListTransactionsByTypeUsecase(
  transactionRepository,
);

export class ListTransactionsByTypeController {
  async handle(request: Request, response: Response) {
    const { type } = request.params;
    const formattedType = Number(type);
    const result = (await listTransactionsByTypeUsecase.execute(
      formattedType,
    )) as [];
    if (!result.length) {
      return response.status(400).json({
        code: 'TRANSACTION_TYPE',
        message: 'informed type does not exists.',
      });
    }
    return response.status(200).json(result);
  }
}
