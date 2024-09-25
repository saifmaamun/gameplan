import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import { BookingControllers } from './app/modules/Booking/booking.controller';
// import { AvailabilityControllers } from './app/modules/Availibility/availibility.controller';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// application routes
app.use('/api', router);

app.get('/', (req: Request, res) => {
  res.send('Hello From The Oher World!');
});

// availibility checking routes
app.get('/api/check-availability', BookingControllers.checkAvailability);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
