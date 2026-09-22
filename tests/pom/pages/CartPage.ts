import { expect, Page } from '@playwright/test';
import { CartApi } from '../api/mockApi/cartApi';

export class CartPage {
  constructor(private page: Page) {
    this.page = page;
  }
  async open() {
    await this.page.goto('/cart');
  }
  async setupApiEmptyCart() {
    const cartApi = new CartApi(this.page);
    await cartApi.setEmptyCart;
  }
  async setupApiWithOneItem() {
    const cartApi = new CartApi(this.page);
    await cartApi.setCartWithOneItem();
  }
  async removeFirstItem() {
    await this.page.getByRole('button', { name: 'удалить' }).first().click();
  }
  async clear() {
    await this.page.getByRole('button', { name: 'Очистить корзину' }).click();
  }
  async addOneMoreSaveCat() {
    await this.page.getByRole('button', { name: '+' }).click();
  }
  async assertCatCounter(value: string) {
    await expect(this.page.getByTestId('itemCounter')).toHaveValue(value);
  }
  async assertEmpty() {
    await expect(
      this.page.getByText('Корзина пуста. Добавьте котика с главной страницы.'),
    ).toBeVisible();
  }
  async assertHasCorretViewWithOneItem() {
    await expect(this.page).toHaveScreenshot('cartWithOneItem.png');
  }
  async assertHasCorretEmptyView() {
    await expect(this.page).toHaveScreenshot('emptyCart.png');
  }
}
