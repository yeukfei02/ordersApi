import mongoose from 'mongoose';
import express from 'express';

import { createOrdersTest, getOrdersTest, updateOrdersByIdTest } from './orders';

const app = express();

mongoose.set('useFindAndModify', false);

let dbUrl = '';

const environment = app.get('env');
if (environment === 'development' || environment === 'test') {
  // mongo local db
  dbUrl = 'mongodb://localhost:27017/orders';
} else {
  // mongo atlas
  // dbUrl = `mongodb+srv://yeukfei02:${process.env.MONGO_ATLAS_PASSWORD}@ordersapi-yrvwg.mongodb.net/test?retryWrites=true&w=majority`;

  // docker local mongodb
  dbUrl = 'mongodb://mongo:27017/orders';
}

describe('main.test', () => {
  beforeAll(async () => {
    await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  describe('orders', () => {
    test('createOrders', async () => {
      const result = await createOrdersTest();
      console.log('result = ', result);
      expect(result).toBeDefined();
    });

    test('getOrders', async () => {
      const result = await getOrdersTest();
      console.log('result = ', result);
      expect(result).toBeDefined();
      expect(result.length > 0).toBeTruthy();
    });

    test('updateOrdersById', async () => {
      const result = await updateOrdersByIdTest();
      console.log('result = ', result);
      expect(result).toBeDefined();
      expect(result.get('status')).toEqual('TAKEN');
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
