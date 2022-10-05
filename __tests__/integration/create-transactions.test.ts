import { createTransactionsContractSchema } from '@tests/contracts';
import { createTransactionRequest } from '@tests/requests';
import path from 'path';

describe('POST /transactions', () => {
  const filePath = path.resolve(__dirname, '..', 'docs', 'sales-test.txt');

  describe('Success', () => {
    it('should be able to create transactions', async () => {
      const response = await createTransactionRequest(filePath);
      expect(response.status).toBe(201);
      expect(response.body).not.toBeNull();
    });
  });

  describe('Fail', () => {
    it('should not be able to create transactions', async () => {
      const response = await createTransactionRequest();
      expect(response.status).toBe(400);
      expect(response.body.code).toBe('INPUT_FILE');
      expect(response.body.message).toBe('file is required.');
    });
  });

  describe('Contract', () => {
    it('should check if contract is correct', async () => {
      const response = await createTransactionRequest(filePath);
      return createTransactionsContractSchema.validateAsync(response.body);
    });
  });
});
