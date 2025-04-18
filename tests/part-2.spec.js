import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import AssetsPage from '../pages/AssetsPage.js';
import credentials from '../data/credentials.json';
import path from 'path';


test.describe('Step 1', () => {
  let loginPage;
  let assetsPage;

  const imagePath = path.resolve('data/20.jpg');

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    assetsPage = new AssetsPage(page);

    await page.goto('/');
    await loginPage.TypeEmail(credentials.username);
    await loginPage.ClickNext();
    await loginPage.TypePassword(credentials.password);
    await loginPage.ClicLogin();

  });

  
  test('- Should be able to upload an image', async () => {
    const uploadedFileName = '20.jpg';
    const expectedTitle = 'QA Automation Engineer';
    const expectedType = 'Image';

    await assetsPage.navigateToAssets();
    await assetsPage.uploadFile(imagePath);
    await assetsPage.typeTitle(expectedTitle);
    await assetsPage.selectType(expectedType);
    await assetsPage.saveUploadedImage();
    await assetsPage.verifyUpload(uploadedFileName, expectedTitle, expectedType);
  });
});
