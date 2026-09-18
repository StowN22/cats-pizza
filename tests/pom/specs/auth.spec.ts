import { test } from '../../fixtures/app.fixture';
import { CleanUpApi } from '../api/CleanUpApi';
import { testUsers } from '../data/testData';

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
});
