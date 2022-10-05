import { TypeEnum } from '@src/enums/type-enum';
import { listTransactionsContractSchema } from '@tests/contracts';
import { listTransactionByTypeRequest } from '@tests/requests';

describe('GET /transactions/:type', () => {
  describe('Success', () => {
    it('should be able to list transactions when type is valid', async () => {
      const response = await listTransactionByTypeRequest(
        TypeEnum.COMISSAO_PAGA,
      );
      expect(response.status).toBe(200);
      expect(response.body).not.toBeNull();
    });
  });

  describe('Fail', () => {
    it('should not be able to list transactions when type is invalid', async () => {
      const invalidType = 10;
      const response = await listTransactionByTypeRequest(invalidType);
      expect(response.status).toBe(400);
      expect(response.body.code).toBe('TRANSACTION_TYPE');
      expect(response.body.message).toBe('informed type does not exists.');
    });
  });

  describe('Contract', () => {
    it('should check if contract is correct', async () => {
      const response = await listTransactionByTypeRequest(
        TypeEnum.COMISSAO_PAGA,
      );
      return listTransactionsContractSchema.validateAsync(response.body);
    });
  });
});
