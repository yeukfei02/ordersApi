import env from 'dotenv';
env.config();

import express from 'express';

import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

import ordersRoutes from './routes/orders';

import { connectDB } from './db/db';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());
app.use(express.json());

// db
connectDB(app);

// routes
app.use('/api/orders', ordersRoutes);

// error handler
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Not found',
  });
});

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
