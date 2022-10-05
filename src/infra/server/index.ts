import { server } from '@src/config';
import { expressError } from '@src/middlewares/express-error';
import routes from '@src/routes';
import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());
app.use(routes);
app.use(expressError);

app.get('/health', (_: Request, response: Response) => {
  return response.json({ message: 'ok' });
});

app.listen(server.port, () =>
  console.log(`Server running in http://localhost:${server.port}`),
);
