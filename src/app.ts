import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';

app.use(cors());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application routes
// console.log(app.get('env'))

app.use('/api/v1/', routes);

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World is working');
});

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // Promise.reject(new Error('My Unhandled Promise Rejection'));
//   // console.log(x);
//   throw new ApiError(400, 'My Unhandled Promise Rejection');
// });

app.use(globalErrorHandler);

// Not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });

  next();
});

export default app;
