import {
  TransactionProtocol,
  TransactionRepositoryProtocol,
} from '../protocols';

export class ListTransactionsUsecase {
  constructor(
    private readonly transactionRepository: TransactionRepositoryProtocol,
  ) {}

  async execute(): Promise<TransactionProtocol[] | null | Error> {
    return await this.transactionRepository.list();
  }
}
