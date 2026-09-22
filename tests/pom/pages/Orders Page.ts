import { expect, type Page } from '@playwright/test';
import { OrdersApi } from '../api/mockApi/OrdersApi';
import { AuthApi } from '../api/mockApi/AuthApi';

export class OrdersPage {
  constructor(private page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.getByTestId('openOrdersButton').click();
  }
  async openPage() {
    await this.page.goto('/orders');
  }
  async setApiWithOneItem() {
    const ordersApi = new OrdersApi(this.page);
    const authApi = new AuthApi(this.page);
    await ordersApi.setOrdersWithOneItem();
    await authApi.setupAuth();
  }
  async setApiWithEmptyOrders() {
    const ordersApi = new OrdersApi(this.page);
    const authApi = new AuthApi(this.page);
    await ordersApi.setEmptyOrders();
    await authApi.setupAuth();
  }

  async assertHasOrder() {
    await expect(this.page.getByTestId('ordersList').getByRole('listitem').first()).toBeVisible();
  }
  async assertHasCorrectPageViewWithOneOrder() {
    await expect(this.page).toHaveScreenshot('orderListWithOneItem.png');
  }
  async assertHasCorrectPageViewWithEmptyOrdersList() {
    await expect(this.page).toHaveScreenshot('emptyOrdersList.png');
  }
}
