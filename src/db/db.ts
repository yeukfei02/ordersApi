import { Express } from 'express';
import mongoose from 'mongoose';

mongoose.set('useFindAndModify', false);

export const connectDB = async (app: Express): Promise<void> => {
  const environment = app.get('env');
  if (environment === 'development') {
    // mongo local db
    mongoose.connect('mongodb://localhost:27017/orders', { useNewUrlParser: true, useUnifiedTopology: true });
  } else {
    // mongo atlas
    // mongoose.connect(
    //   `mongodb+srv://yeukfei02:${process.env.MONGO_ATLAS_PASSWORD}@ordersapi-yrvwg.mongodb.net/test?retryWrites=true&w=majority`,
    //   { useNewUrlParser: true, useUnifiedTopology: true },
    // );

    // docker local mongodb
    mongoose.connect('mongodb://mongo:27017/orders', { useNewUrlParser: true, useUnifiedTopology: true });
  }
};
