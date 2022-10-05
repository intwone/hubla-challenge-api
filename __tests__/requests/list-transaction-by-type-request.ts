import { baseUrls } from '@src/config';
import request from 'supertest';

export const listTransactionByTypeRequest = async (type: number) => {
  const response = await request(baseUrls.hublaApi).get(`/transaction/${type}`);
  return response;
};
