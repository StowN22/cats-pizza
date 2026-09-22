import { guestTest as test } from '../../../fixtures/app.fixture';

test('Cart page empty state', async ({ cartPage }) => {
  await cartPage.setupApiEmptyCart();
  await cartPage.open();
  await cartPage.assertHasCorretEmptyView();
});

test('Cart page with items', async ({ cartPage }) => {
  await cartPage.setupApiWithOneItem();
  await cartPage.open();
  await cartPage.assertHasCorretViewWithOneItem();
});
