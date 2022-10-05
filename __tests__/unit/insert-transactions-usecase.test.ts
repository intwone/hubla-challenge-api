import { InsertTransactionsUsecase } from '@src/modules/transactions/usecases';
import { createTransactions } from '@tests/factories/create-transactions';
import MemoryTransactionRepository from '@tests/mocks/memory-transaction-repository';

describe('Insert transactions usecase', () => {
  describe('Success', () => {
    it('should be able to add transaction', async () => {
      const memoryTransactionRepository = new MemoryTransactionRepository();
      const insertTransactionsUsecase = new InsertTransactionsUsecase(
        memoryTransactionRepository,
      );
      const transactions = createTransactions(10);

      await insertTransactionsUsecase.execute(transactions);

      expect(memoryTransactionRepository.transactions.length).toBe(10);
    });
  });
});
