import { TypeEnum } from '@src/enums/type-enum';
import {
  InsertTransactionsUsecase,
  ListTransactionsByTypeUsecase,
} from '@src/modules/transactions/usecases';
import { createTransactions } from '@tests/factories/create-transactions';
import MemoryTransactionRepository from '@tests/mocks/memory-transaction-repository';

describe('List transactions by type usecase', () => {
  describe('Success', () => {
    it('should be able to list all transactions when type is valid', async () => {
      const memoryTransactionRepository = new MemoryTransactionRepository();
      const insertTransactionsUsecase = new InsertTransactionsUsecase(
        memoryTransactionRepository,
      );
      const listTransactionsByTypeUsecase = new ListTransactionsByTypeUsecase(
        memoryTransactionRepository,
      );
      const transactions = createTransactions(10).filter(
        transaction => transaction.type === TypeEnum.VENDA_AFILIADA,
      );
      await insertTransactionsUsecase.execute(transactions);
      const filteredListTransactions =
        (await listTransactionsByTypeUsecase.execute(
          TypeEnum.VENDA_AFILIADA,
        )) as [];
      expect(filteredListTransactions.length).toBe(transactions.length);
    });
  });

  describe('Fail', () => {
    it('should not be able to list transactions when type is invalid', async () => {
      const memoryTransactionRepository = new MemoryTransactionRepository();
      const listTransactionsByTypeUsecase = new ListTransactionsByTypeUsecase(
        memoryTransactionRepository,
      );
      const invalidType = 6;
      const filteredListTransactions =
        (await listTransactionsByTypeUsecase.execute(invalidType)) as [];
      expect(filteredListTransactions.length).toBe(0);
    });
  });
});
