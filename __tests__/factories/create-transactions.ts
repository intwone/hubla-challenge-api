import { faker } from '@faker-js/faker';
import { TransactionProtocol } from '@src/modules/transactions/protocols';

export const createTransactions = (
  quantityTransactions: number,
): TransactionProtocol[] => {
  const transactions = [];
  for (let i = 0; i < quantityTransactions; i += 1) {
    const transaction = {
      type: faker.datatype.number({ min: 1, max: 4 }),
      date: faker.date.past(),
      productName: faker.random.word(),
      value: faker.datatype.number({ min: 1, max: 10000 }),
      seller: faker.name.fullName(),
    };
    transactions.push(transaction);
  }
  return transactions;
};
