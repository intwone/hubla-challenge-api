import { TransactionProtocol } from '../protocols/transaction-protocol';
import { TransactionRepositoryProtocol } from '../protocols/transaction-repository-protocol';

export class InsertTransactionsUsecase {
  constructor(
    private readonly transactionRepository: TransactionRepositoryProtocol,
  ) {}

  async execute(transactions: TransactionProtocol[]): Promise<void> {
    for await (const transaction of transactions) {
      await this.transactionRepository.insert(transaction);
    }
  }
}
