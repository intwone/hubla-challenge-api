import { TransactionProtocol } from '@src/modules/transactions/protocols';
import { TransactionRepositoryProtocol } from '@src/modules/transactions/protocols/transaction-repository-protocol';
import { randomUUID } from 'crypto';

export default class MemoryTransactionRepository
  implements TransactionRepositoryProtocol
{
  public transactions: TransactionProtocol[];

  constructor() {
    this.transactions = [];
  }

  async listTransactionByType(
    type: number,
  ): Promise<Error | TransactionProtocol[] | []> {
    const transactions = this.transactions.filter(
      transaction => transaction.type === type,
    );
    return transactions;
  }

  async list(): Promise<TransactionProtocol[] | [] | Error> {
    return this.transactions;
  }

  async insert(
    transaction: TransactionProtocol,
  ): Promise<TransactionProtocol | null | Error> {
    const newTransaction = {
      id: randomUUID(),
      type: Number(transaction.type),
      date: transaction.date,
      productName: transaction.productName,
      value: transaction.value,
      seller: transaction.seller,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.transactions.push(newTransaction);

    return {
      type: newTransaction.type,
      date: newTransaction.date,
      productName: newTransaction.productName,
      value: newTransaction.value,
      seller: newTransaction.seller,
    };
  }
}
