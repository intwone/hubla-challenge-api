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
    it('should be able to normalize data when mime type is valid', async () => {
      const normalizeFileUsecase = new NormalizeFileUsecase();
      const validMimeType = 'text/plain';
      const normalizedTransactions = await normalizeFileUsecase.execute(
        'sales-test.txt',
        validMimeType,
      );
      expect(normalizedTransactions).not.toBeNull();
    });
  });

  describe('Fail', () => {
    it('should not be able to normalize data when mime type is invalid', async () => {
      const normalizeFileUsecase = new NormalizeFileUsecase();
      const normalizedTransactions = await normalizeFileUsecase.execute(
        'sales-test.txt',
        'invalide/mimetype',
      );
      expect(normalizedTransactions).toBeNull();
    });
  });
});
