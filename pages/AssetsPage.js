import { expect } from '@playwright/test';
export default class AssetsPage {
  constructor(page) {
    this.page = page;
    this.spManagedMenu = page.locator('button[title="SP Managed"]');
    this.assetsSubmenu = page.locator('button#menu-list-14-menuitem-12');
    this.uploadButton = page.locator('button[title="New Item"]');
    this.titleInput = page.locator('input[class="chakra-input _s_singleLineTextField css-1an7nsl"]');
    this.openDropdown = page.locator('div.mb-tag-field__input-container').nth(2);
    this.getType = page.locator('div[role="option"]');
    this.saveButton = page.locator('.css-om4am7');
  }


  async navigateToAssets() {
    await this.spManagedMenu.click();
    await this.assetsSubmenu.click();
    await expect(this.page.locator('button[title="New Item"]')).toBeVisible({ timeout: 20000 });
  }

  async uploadFile(filePath) {
    await this.uploadButton.click();
    await this.page.setInputFiles('input._s_fileUpload', filePath);

  }

  async typeTitle(title){
    await this.titleInput.fill(title);

  }

  async selectType(type){
    await this.openDropdown.click(type);
    await this.page.keyboard.press('Enter');
    
  }

  async saveUploadedImage(){
    await this.saveButton.click({ timeout: 20000 });
    await expect(this.spManagedMenu).toBeVisible({ timeout: 20000 });
    
  }

  async verifyUpload(filename, title, type) {
    await this.page.waitForSelector(`text=${filename}`);
    await this.page.waitForSelector(`text=${title}`);
    await this.page.waitForSelector(`text=${type}`);

    const thumbnail = this.page.locator('img.css-ltsvov').nth(1);
    await expect(thumbnail).toBeVisible({ timeout: 10000 });

    const src = await thumbnail.getAttribute('src');
    expect(src).toBeTruthy(); 
    expect(src).not.toContain('placeholder'); 
  }


  async selectFile(){

    const fileLocator = this.page.locator('div.css-mvgvg4').nth(1);
    await fileLocator.click();
  }

}
