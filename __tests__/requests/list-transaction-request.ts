import { baseUrls } from '@src/config';
import request from 'supertest';

export const listTransactionRequest = async () => {
  const response = await request(baseUrls.hublaApi).get('/transaction');
  return response;
};
