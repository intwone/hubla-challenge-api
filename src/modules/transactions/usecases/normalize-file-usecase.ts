import { ValueHelper } from '@src/helpers/value-helper';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { Readable } from 'stream';
import { TransactionProtocol } from '../protocols';

export class NormalizeFileUsecase {
  async execute(
    filename: string,
    mimeType: string,
  ): Promise<TransactionProtocol[] | null> {
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'temp',
      filename,
    );
    if (mimeType !== 'text/plain') {
      await fs.promises.unlink(filePath);
      return null;
    }
    const transactions: TransactionProtocol[] = [];
    const buffer = fs.readFileSync(filePath);
    const readableLine = new Readable();
    readableLine.push(buffer);
    readableLine.push(null);
    const transactionsLine = readline.createInterface({
      input: readableLine,
    });
    for await (const line of transactionsLine) {
      const formattedValue = ValueHelper.formatToBRLValue(
        Number(line.slice(56, 66)),
      );
      const transactionObj: TransactionProtocol = {
        type: Number(Array.from(line)[0]),
        date: new Date(line.slice(1, 26)),
        productName: line.slice(26, 56).trim(),
        seller: line.slice(66, line.length),
        value: formattedValue,
      };
      transactions.push(transactionObj);
    }
    await fs.promises.unlink(filePath);
    return transactions;
  }
}
