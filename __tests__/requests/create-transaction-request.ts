import { baseUrls } from '@src/config';
import request from 'supertest';

export const createTransactionRequest = async (path?: string) => {
  let response;

  if (!path) {
    response = await request(baseUrls.hublaApi).post('/transaction');
    return response;
  }

  response = await request(baseUrls.hublaApi)
    .post('/transaction')
    .attach('transactions', path);
  return response;
};
