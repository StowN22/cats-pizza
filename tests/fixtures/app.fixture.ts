import { test as base } from '@playwright/test';
import { HomePage } from '../pom/pages/HomePage';
import { AuthModal } from '../pom/pages/AuthModal';
import { CheckoutPage } from '../pom/pages/CheckoutPage';
import { OrdersPage } from '../pom/pages/Orders Page';
import path from 'path';

export const authFile = path.join(process.cwd(), 'playwright/.auth/existing-user.json');

type MyFixtures = {
  homePage: HomePage;
  authPage: AuthModal;
  checkoutPage: CheckoutPage;
  ordersPage: OrdersPage;
};

type AppOptions = {
  storageState: string | undefined;
};

const appTest = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  authPage: async ({ page }, use) => {
    const authPage = new AuthModal(page);
    await use(authPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  ordersPage: async ({ page }, use) => {
    const ordersPage = new OrdersPage(page);
    await use(ordersPage);
  },
});

export const guestTest = appTest;
export const autorizedTest = appTest.extend<AppOptions>({
  storageState: authFile,
});
export { expect } from '@playwright/test';
