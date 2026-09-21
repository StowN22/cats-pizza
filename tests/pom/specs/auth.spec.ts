import { guestTest as test } from '../../fixtures/app.fixture';
import { CleanUpApi } from '../api/CleanUpApi';
import { testUsers } from '../data/testData';
import { HomePage } from '../pages/HomePage';

test.describe('Auth', () => {
  let createdUserEmail: string | null = null;

  test.afterAll(async ({ request }) => {
    if (!createdUserEmail) return;

    const cleanUpApi = new CleanUpApi(request);
    await cleanUpApi.deleteUserByEmail(createdUserEmail);
  });

  test('Sign in', async ({ homePage, authPage }) => {
    await homePage.open();
    await authPage.signIn(testUsers.existing.email, testUsers.existing.password);
    await authPage.assertSignedIn();
  });

  test('Sign up', async ({ homePage, authPage }) => {
    createdUserEmail = `${Date.now()}@test.ru`;
    await homePage.open();
    await authPage.signUp('Test', createdUserEmail, testUsers.existing.password);
    await authPage.assertSignedIn();
  });

  test('Shows error for wrong password', async ({ homePage, authPage }) => {
    await homePage.open();
    await authPage.signIn(testUsers.existing.email, 'wrong-password');
    await authPage.AssertionError('Неверный email или пароль');
  });
  test('Reject duplicate registration', async ({ homePage, authPage }) => {
    await homePage.open();
    await authPage.signUp(
      'Name',
      testUsers.existing.email,
      testUsers.existing.password,
      testUsers.existing.password,
    );
    await authPage.AssertionError('Пользователь с таким email уже существует');
  });
});
