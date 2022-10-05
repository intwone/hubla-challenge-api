import { TransactionProtocol } from './transaction-protocol';

export interface TransactionRepositoryProtocol {
  insert(
    transaction: TransactionProtocol,
  ): Promise<TransactionProtocol | null | Error>;
  list(): Promise<TransactionProtocol[] | [] | Error>;
  listTransactionByType(
    type: number,
  ): Promise<TransactionProtocol[] | [] | Error>;
}
