import * as orders from './orders';

describe('main.test', () => {
  describe('orders', () => {
    test('createOrders', async () => {
      const result = await orders.createOrdersTest();
      console.log('result = ', result);
      expect(123).toBeDefined();
    });

    test('getOrders', async () => {
      const result = await orders.getOrdersTest();
      console.log('result = ', result);
      expect(123).toBeDefined();
    });

    test('updateOrdersById', async () => {
      const result = await orders.updateOrdersByIdTest();
      console.log('result = ', result);
      expect(123).toBeDefined();
    });
  });
});
