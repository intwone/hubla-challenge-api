import { TypeEnum } from '@src/enums/type-enum';
import {
  TransactionProtocol,
  TransactionRepositoryProtocol,
} from '../protocols';

export class ListTransactionsByTypeUsecase {
  constructor(
    private readonly transactionRepository: TransactionRepositoryProtocol,
  ) {}

  async execute(type: number): Promise<TransactionProtocol[] | [] | Error> {
    const typeExists = Object.values(TypeEnum)
      .map(typeKeys => Number(typeKeys))
      .includes(type);
    if (!typeExists) return [];
    return await this.transactionRepository.listTransactionByType(type);
  }
}
