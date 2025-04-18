import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import AssetsPage from '../pages/AssetsPage.js';
import credentials from '../data/credentials.json';

test.describe('Step 2 - Uploaded Image Edit', () => {
    test.setTimeout(150000);
  let loginPage;
  let assetsPage;

  const updatedTitle = 'QA Automation Engineer';

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    assetsPage = new AssetsPage(page);

    await page.goto('/');
    await loginPage.TypeEmail(credentials.username);
    await loginPage.ClickNext();
    await loginPage.TypePassword(credentials.password);
    await loginPage.ClickLogin();
    await assetsPage.navigateToAssets();
  });

  test('Step 7 - Should open the item and verify Edit button exists', async () => {
    await assetsPage.selectFile();
    await assetsPage.isEditButtonVisible();
  });

  test('Step 8 - Should edit title and verify Save button exists', async () => {
    await assetsPage.selectFile();
    await assetsPage.clickEdit();
    await assetsPage.updateTitle(updatedTitle);
    await assetsPage.isSaveButtonVisible();
    await assetsPage.clickSave();
  });

  test('Step 9 - Should close the item and verify navigation to Assets page', async () => {
    await assetsPage.selectFile();
    await assetsPage.clickEdit();
    await assetsPage.updateTitle(updatedTitle);
    await assetsPage.clickSave();
    await assetsPage.closeImage();
    await assetsPage.isOnAssetsPage();
  });

  test('Step 10 - Should see the updated title in the asset list', async () => {
    await assetsPage.isTitleVisibleInList(updatedTitle);
  });
});
