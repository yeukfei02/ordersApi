import { Request, Response } from 'express';
import * as mongoose from 'mongoose';

import Orders from '../model/orders';

export const createOrders = async (req: Request, res: Response) => {
  const originList = req.body.origin;
  const destinationList = req.body.destination;

  if (originList && destinationList) {
    const id = new mongoose.Types.ObjectId();
    const originLatitude = originList[0];
    const originLongitude = originList[1];
    const destinationLatitude = destinationList[0];
    const destinationLongitude = destinationList[0];
    const distance = '100';
    const status = 'UNASSIGNED';

    const orders = new Orders({
      _id: id,
      origin_latitude: originLatitude,
      origin_longitude: originLongitude,
      destination_latitude: destinationLatitude,
      destination_longitude: destinationLongitude,
      distance: distance,
      status: status,
    });
    await orders.save();

    res.status(200).json({
      id: id,
      distance: distance,
      status: status,
    });
  } else {
    res.status(400).json({
      error: 'ERROR_DESCRIPTION',
    });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  const page = req.query.page ? parseInt(req.query.page.toString(), 10) : null;
  const limit = req.query.limit ? parseInt(req.query.limit.toString(), 10) : null;

  try {
    let resultList: any[] = [];
    let ordersList: any[] = [];

    if (!page && !limit) {
      ordersList = await Orders.find({});
    } else {
      ordersList = await Orders.find({})
        .skip(page * limit - limit)
        .limit(limit);
    }

    if (ordersList) {
      resultList = ordersList.map((item: any, i: number) => {
        const obj = {
          id: item.id,
          distance: item.distance,
          status: item.status,
        };
        return obj;
      });
    }

    res.status(200).json(resultList);
  } catch (e) {
    console.log('error = ', e.message);
    res.status(400).json({
      error: 'ERROR_DESCRIPTION',
    });
  }
};

export const updateOrdersById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const status = req.body.status;

  try {
    if (id) {
      const result = await Orders.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            status: status,
          },
        },
      );
      if (result) {
        res.status(200).json({
          status: 'SUCCESS',
        });
      }
    }
  } catch (e) {
    console.log('error = ', e.message);
    res.status(400).json({
      error: 'ERROR_DESCRIPTION',
    });
  }
};
