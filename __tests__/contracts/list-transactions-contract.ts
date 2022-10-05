import Joi from 'joi';

export const listTransactionsContractSchema = Joi.array().items(
  Joi.object({
    id: Joi.string().guid(),
    type: Joi.number(),
    date: Joi.date(),
    productName: Joi.string(),
    seller: Joi.string(),
    value: Joi.number(),
    created_at: Joi.date(),
    updated_at: Joi.date(),
  }),
);
