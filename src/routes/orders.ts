import express from 'express';
const router = express.Router();

import * as ordersController from '../controller/orders';

router.post('', ordersController.createOrders);
router.get('', ordersController.getOrders);
router.patch('/:id', ordersController.updateOrdersById);

export default router;
