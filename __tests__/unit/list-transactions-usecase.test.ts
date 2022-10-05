import {
  InsertTransactionsUsecase,
  ListTransactionsUsecase,
} from '@src/modules/transactions/usecases';
import { createTransactions } from '@tests/factories/create-transactions';
import MemoryTransactionRepository from '@tests/mocks/memory-transaction-repository';

describe('List transactions usecase', () => {
  describe('Success', () => {
    it('should be able to list all transactions', async () => {
      const memoryTransactionRepository = new MemoryTransactionRepository();
      const insertTransactionsUsecase = new InsertTransactionsUsecase(
        memoryTransactionRepository,
      );
      const listTransactionsUsecase = new ListTransactionsUsecase(
        memoryTransactionRepository,
      );
      const transactions = createTransactions(10);
      await insertTransactionsUsecase.execute(transactions);
      const listOfTransactions =
        (await listTransactionsUsecase.execute()) as [];
      expect(listOfTransactions.length).toBe(10);
    });
  });
});
