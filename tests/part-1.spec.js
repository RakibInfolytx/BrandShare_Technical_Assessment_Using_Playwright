import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import AssetsPage from '../pages/AssetsPage.js';
import credentials from '../data/credentials.json';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Test part-1, Login and upload image', () => {
  test.setTimeout(120000);

  const imagePath = path.resolve('data/20.jpg');
  const uploadedFileName = '20.jpg';
  const expectedTitle = 'QA Automation Engineer';
  const expectedType = 'Image';

  let loginPage;
  let assetsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    assetsPage = new AssetsPage(page);
  
    await page.goto('/');
    await loginPage.TypeEmail(credentials.username);
    await loginPage.ClickNext();
    await loginPage.TypePassword(credentials.password);
    await loginPage.ClickLogin();
    await assetsPage.waitForDashboardLoad();
  });
  
  test('1 - Should be able to navigate to the correct URL', async ({ page }) => {
    await expect(page).toHaveTitle('SP | Brandshare DAM');
  });

  test('2 - Should be able to log in with valid credentials', async () => {
    await assetsPage.waitForDashboardLoad();
  });

  test('3 - Should be able to navigate to SP Managed > Assets', async () => {
    await assetsPage.navigateToAssets();
    await assetsPage.isOnAssetsPage();
  });

  test('4 - Should be able to upload an image file', async () => {
    await assetsPage.navigateToAssets();
    
    await assetsPage.uploadFile(imagePath);
    await assetsPage.typeTitle(expectedTitle);
    await assetsPage.selectType(expectedType);
    await assetsPage.saveUploadedImage();
    await assetsPage.waitForDashboardLoad();
  });

  test('5 - Should be able to fill image title, image type save image', async () => {
    await assetsPage.navigateToAssets();
    await assetsPage.uploadFile(imagePath);
    await assetsPage.typeTitle(expectedTitle);
    await assetsPage.selectType(expectedType);
    await assetsPage.saveUploadedImage();
    await assetsPage.waitForDashboardLoad();
  });

  test('6 - Should be able to verify uploaded file, title, type and thumbnail', async () => {
    await assetsPage.navigateToAssets();
    await assetsPage.verifyUpload(uploadedFileName, expectedTitle, expectedType);
  });
});
