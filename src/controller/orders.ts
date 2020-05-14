import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import axios from 'axios';

import Orders from '../model/orders';

async function getDistance(originsStr: string, destinationStr: string) {
  const result = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json`, {
    params: {
      origins: originsStr,
      destinations: destinationStr,
      key: process.env.GOOGLE_MAP_API_KEY,
    },
  });
  return result.data;
}

export const createOrders = async (req: Request, res: Response) => {
  const originList = req.body.origin;
  const destinationList = req.body.destination;

  if (originList && destinationList) {
    const id = new mongoose.Types.ObjectId();
    const originLatitude = originList[0];
    const originLongitude = originList[1];
    const destinationLatitude = destinationList[0];
    const destinationLongitude = destinationList[1];
    let distance = 'NO RESULT';
    const status = 'UNASSIGNED';

    const originLatitudeNum = parseInt(originLatitude, 10);
    const originLongitudeNum = parseInt(originLongitude, 10);

    const destinationLatitudeNum = parseInt(destinationLatitude, 10);
    const destinationLongitudeNum = parseInt(destinationLongitude, 10);

    if (
      originLatitudeNum >= -90 &&
      originLatitudeNum <= 90 &&
      originLongitudeNum >= -180 &&
      originLongitudeNum <= 180 &&
      destinationLatitudeNum >= -90 &&
      destinationLatitudeNum <= 90 &&
      destinationLongitudeNum >= -180 &&
      destinationLongitudeNum <= 180
    ) {
      const originsStr = `${originLatitude},${originLongitude}`;
      const destinationStr = `${destinationLatitude},${destinationLongitude}`;
      const result = await getDistance(originsStr, destinationStr);
      if (result && result.rows) distance = result.rows[0].elements[0].distance.value;

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
        error: 'lat / lng is not valid',
      });
    }
  } else {
    res.status(400).json({
      error: 'origin and destination cannot be empty',
    });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  const page =
    req.query.page && !isNaN(parseInt(req.query.page.toString(), 10)) ? parseInt(req.query.page.toString(), 10) : null;
  const limit =
    req.query.limit && !isNaN(parseInt(req.query.limit.toString(), 10))
      ? parseInt(req.query.limit.toString(), 10)
      : null;

  try {
    let resultList: any[] = [];
    let ordersList: any[] = [];

    if (page != null && limit != null) {
      ordersList = await Orders.find({})
        .skip(page * limit - limit)
        .limit(limit);
    } else {
      res.status(400).json({
        error: 'page and limit cannot be null',
      });
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
      error: `${e.message}`,
    });
  }
};

export const updateOrdersById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const status = req.body.status;

  try {
    if (id) {
      const order = await Orders.findById(id);
      const stutus = order.get('status');
      if (stutus !== 'TAKEN') {
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
      } else {
        res.status(400).json({
          error: 'stutus is already TAKEN',
        });
      }
    }
  } catch (e) {
    console.log('error = ', e.message);
    res.status(400).json({
      error: `${e.message}`,
    });
  }
};
