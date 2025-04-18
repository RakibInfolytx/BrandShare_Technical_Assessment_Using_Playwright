import { test, expect } from '@playwright/test';
import { MailSlurp } from 'mailslurp-client';
import dotenv from 'dotenv';
import LoginPage from '../pages/LoginPage.js';
import AssetsPage from '../pages/AssetsPage.js';
import credentials from '../data/credentials.json';


dotenv.config();

dotenv.config();

test.describe('Step 3: Share File and Verify Email', () => {
  test.setTimeout(150000);

  let loginPage;
  let assetsPage;

  const inboxId = 'f343703d-2ce9-46b8-89d9-98d78fd80c1a';
  const testEmail = 'f343703d-2ce9-46b8-89d9-98d78fd80c1a@mailslurp.biz';

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

  test('11 - Select an item by checkbox and verify', async () => {
    await assetsPage.navigateToAssets();
    await assetsPage.clickCheckbox();
  });

  test('12 - Click Share and verify share text', async () => {
    await assetsPage.navigateToAssets();
    await assetsPage.clickCheckbox();
    await assetsPage.clickShare();
  });

  test('13 - Set email address and hit the send button', async () => {
    await assetsPage.navigateToAssets();
    await assetsPage.clickCheckbox();
    await assetsPage.clickShare();
    await assetsPage.setEmail(testEmail);
    await assetsPage.sendEmail();

  });

  test('-14 Should receive an email with download link', async () => {

    const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY });
    const inboxId = 'f343703d-2ce9-46b8-89d9-98d78fd80c1a';
    const email = await mailslurp.waitForLatestEmail(inboxId, 30000);
    expect(email.subject).toContain('sash.dqa has shared files with you');
    const html = email.bodyHTML || email.body;
    expect(html).toContain('Click here to download the files');
    const linkMatch = html.match(/https?:\/\/[^\s"]+/);
    expect(linkMatch).not.toBeNull();
    console.log('Download link exist in email body');

  });
});
