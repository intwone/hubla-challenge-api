import { listTransactionsContractSchema } from '@tests/contracts';
import { listTransactionRequest } from '@tests/requests';

describe('GET /transactions', () => {
  describe('Success', () => {
    it('should be able to list transactions', async () => {
      const response = await listTransactionRequest();
      expect(response.status).toBe(200);
      expect(response.body).not.toBeNull();
    });
  });

  describe('Contract', () => {
    it('should check if contract is correct', async () => {
      const response = await listTransactionRequest();
      return listTransactionsContractSchema.validateAsync(response.body);
    });
  });
});
