import { NormalizeFileUsecase } from '@src/modules/transactions/usecases';
import { ManipulateFile } from '@tests/utils/manipulate-file';
import path from 'path';

describe('Normalize file usecase', () => {
  const manipulateFile = new ManipulateFile();

  beforeEach(() => {
    const from = path.resolve(__dirname, '..', 'docs', 'sales-test.txt');
    const to = path.resolve(
      __dirname,
      '..',
      '..',
      'src',
      'temp',
      'sales-test.txt',
    );
    manipulateFile.copyFile(from, to);
  });

  describe('Success', () => {
    it('should be able to normalize data', async () => {
      const normalizeFileUsecase = new NormalizeFileUsecase();
      const normalizedTransactions = await normalizeFileUsecase.execute(
        'sales-test.txt',
      );

      expect(normalizedTransactions).not.toBeNull();
      expect(normalizedTransactions[0]).toHaveProperty('type');
      expect(normalizedTransactions[0]).toHaveProperty('date');
      expect(normalizedTransactions[0]).toHaveProperty('productName');
      expect(normalizedTransactions[0]).toHaveProperty('seller');
      expect(normalizedTransactions[0]).toHaveProperty('value');
    });
  });
});
