import { NextFunction, Request, Response } from 'express';

export function expressError(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  if (error instanceof Error)
    return response.status(400).json({ message: error.message });
  return response.status(500).json({ message: 'Internal Server Error' });
}
