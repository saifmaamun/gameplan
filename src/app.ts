import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// application routes
app.use('/api', router);

app.get('/', (req: Request, res) => {
  res.send('Hello From Assignment3');
});
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
