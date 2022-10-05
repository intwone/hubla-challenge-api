import {
  TransactionProtocol,
  TransactionRepositoryProtocol,
} from '../protocols';

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
