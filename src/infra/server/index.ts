import { server } from '@src/config';
import { expressError } from '@src/middlewares/express-error';
import routes from '@src/routes';
import cors from 'cors';
import express, { Request, Response } from 'express';

const corsOptions = {
  origin: '*',
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);
app.use(expressError);

app.get('/health', (_: Request, response: Response) => {
  return response.json({ message: 'ok' });
});

app.listen(server.port, () =>
  console.log(`Server running in http://localhost:${server.port}`),
);
