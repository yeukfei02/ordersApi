import * as express from 'express';

import * as cors from 'cors';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as compression from 'compression';

import * as env from 'dotenv';
env.config();

import ordersRoutes from './routes/orders';
import { connectDB } from './db/db';

const app = express();
const port = process.env.PORT || 3000;

connectDB(app);

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/orders', ordersRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Not found',
  });
});

app.listen(port, () => {
  console.log(`server is running at port`, `${port}`);
});
