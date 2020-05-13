import * as mongoose from 'mongoose';

import Orders from '../model/orders';

export const createOrdersTest = async () => {
  const orders = new Orders({
    _id: new mongoose.Types.ObjectId(),
    origin_latitude: '22.262791',
    origin_longitude: '114.248711',
    destination_latitude: '22.316931',
    destination_longitude: '114.212402',
    distance: 'NO RESULT',
    status: 'UNASSIGNED',
  });
  const result = await orders.save();
  return result;
};

export const getOrdersTest = async () => {
  const result = await Orders.find({});
  return result;
};

export const updateOrdersByIdTest = async () => {
  const lastItem = await Orders.findOne().sort({ created_at: -1 });
  const lastItemId = lastItem.get('_id');

  const result = await Orders.findOneAndUpdate(
    { _id: lastItemId },
    {
      $set: {
        status: 'TAKEN',
      },
    },
  );
  return result;
};
