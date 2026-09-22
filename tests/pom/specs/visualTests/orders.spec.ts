import { guestTest as test } from '../../../fixtures/app.fixture';

test('Orders page empty state', async ({ ordersPage }) => {
  await ordersPage.setApiWithEmptyOrders();
  await ordersPage.openPage();
  await ordersPage.assertHasCorrectPageViewWithEmptyOrdersList();
});

test('Orders page with items', async ({ ordersPage }) => {
  await ordersPage.setApiWithOneItem();
  await ordersPage.openPage();
  await ordersPage.assertHasCorrectPageViewWithOneOrder();
});
