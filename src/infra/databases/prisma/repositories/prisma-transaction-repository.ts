import { TransactionProtocol } from '@src/modules/transactions/protocols/transaction-protocol';
import { TransactionRepositoryProtocol } from '@src/modules/transactions/protocols/transaction-repository-protocol';
import { randomUUID } from 'crypto';
import prismaClient from '../prisma-client';

export class PrismaTransactionRepository
  implements TransactionRepositoryProtocol
{
  async listTransactionByType(
    type: number,
  ): Promise<TransactionProtocol[] | Error | []> {
    try {
      const transactions = await prismaClient.transactions.findMany({
        where: {
          type,
        },
      });
      return transactions;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async list(): Promise<TransactionProtocol[] | [] | Error> {
    try {
      const transactionsFound = await prismaClient.transactions.findMany();
      return transactionsFound;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async insert(
    transaction: TransactionProtocol,
  ): Promise<TransactionProtocol | null | Error> {
    try {
      const transactionCreated = await prismaClient.transactions.create({
        data: {
          id: randomUUID(),
          type: Number(transaction.type),
          date: transaction.date,
          productName: transaction.productName,
          value: transaction.value,
          seller: transaction.seller,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      if (!transactionCreated) return null;

      const response = {
        type: transactionCreated.type,
        date: transactionCreated.date,
        productName: transactionCreated.productName,
        value: transactionCreated.value,
        seller: transactionCreated.seller,
      };

      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
