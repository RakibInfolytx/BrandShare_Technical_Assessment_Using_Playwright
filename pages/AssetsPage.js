import { expect } from '@playwright/test';
export default class AssetsPage {
  constructor(page) {
    this.page = page;
    this.spManagedMenu = page.locator('button[title="SP Managed"]');
    this.assetsSubmenu = page.getByRole('menuitem', { name: 'Assets' });
    this.uploadButton = page.locator('button[title="New Item"]');
    this.titleInput = page.locator('input[class="chakra-input _s_singleLineTextField css-1an7nsl"]');
    this.openDropdown = page.locator('div.mb-tag-field__input-container').nth(2);
    this.getType = page.locator('div[role="option"]');
    this.saveButton = page.locator('button.chakra-button.css-om4am7');
  }

  async waitForDashboardLoad() {
    await expect(this.page.locator('button[title="SP Managed"]')).toBeVisible({ timeout: 50000 });
  }

  async navigateToAssets() {
    try {
      await this.spManagedMenu.waitFor({ state: 'visible', timeout: 80000 });
      await this.spManagedMenu.click();
  
      await this.assetsSubmenu.waitFor({ state: 'visible', timeout: 1200000 });
      await this.assetsSubmenu.click();
  
      await expect(this.uploadButton).toBeVisible({ timeout: 20000 });
    } catch (error) {
      console.error('navigateToAssets failed:', error.message);
      throw error;
    }
  }
  
  // async navigateToAssets() {
  //   await this.spManagedMenu.click();
  //   await this.assetsSubmenu.click();
  //   await expect(this.page.locator('button[title="New Item"]')).toBeVisible({ timeout: 20000 });
  // }

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

  // async saveUploadedImage(){
  //   await this.saveButton.click({ timeout: 20000 });
  //   await expect(this.spManagedMenu).toBeVisible({ timeout: 20000 });
    
  // }
  async saveUploadedImage() {
    await this.saveButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.saveButton.click({ timeout: 50000 });
    await this.page.waitForTimeout(20000); 
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

    const fileLocator = this.page.locator('.chakra-stack.mb-grid__row.css-mvgvg4').nth(0);
    await fileLocator.click();
  }

  async clickEdit(){

    const editButton = this.page.locator('button.chakra-button._s_Edit.css-rce95w');
    await editButton.click();
  }


  async updateTitle(updatedTitle){
    
    const title = this.page.locator('input[class="chakra-input _s_singleLineTextField css-1an7nsl"]');
    await title.fill(updatedTitle);

  }


  async clickSave(){

    const editButton = this.page.locator('button.chakra-button._s_SaveItem.css-rce95w');
    await editButton.click();
  } 

  async closeImage(){

    const close = this.page.locator('button.chakra-button._s_Close.css-rce95w');
    await close.click();
  }


  async isEditButtonVisible() {
    const editButton = this.page.locator('button.chakra-button._s_Edit.css-rce95w');
    await expect(editButton).toBeVisible();
  }


  async isSaveButtonVisible() {
    const saveButton = this.page.locator('button.chakra-button._s_SaveItem.css-rce95w');
    await expect(saveButton).toBeVisible();
  }


  async isOnAssetsPage() {
    await expect(this.uploadButton).toBeVisible({ timeout: 10000 });
  }


  async isTitleVisibleInList(updatedTitle) {
    await expect(this.page.locator(`text=${updatedTitle}`)).toBeVisible();
  }

  
  async clickCheckbox() {
    const checkBox = this.page.locator(`.chakra-checkbox__control.css-1p9wxqe`).nth(2);
    await checkBox.click();
    

  }
  
  async clickShare() {
    const shareButton = this.page.locator('button.chakra-button._s_share.css-xvibk1');
    await shareButton.click();

    const shareText = this.page.locator('p.chakra-text.css-amhulu');
    await expect(shareText).toHaveText('Share link to 1 files(s)');

  } 

  async setEmail(email) {
    const modal = this.page.locator('.chakra-modal__content-container');
    await modal.waitFor({ state: 'visible', timeout: 5000 });
  
    const input = modal.locator('input.mb-tag-field__input').first();
  
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await input.waitFor({ state: 'visible', timeout: 3000 });
        
        await input.fill(email, { force: true });
        await this.page.keyboard.press('Enter');
        return;
  
      } catch (err) {
        console.warn(`Attempt ${attempt + 1} failed: ${err.message}`);
        if (attempt === 2) throw err;
        await this.page.waitForTimeout(1000); 
      }
    }
  }
  
  

  async sendEmail(){
    
    const sendEmailButton = this.page.locator('button.chakra-button.css-om4am7');
    await sendEmailButton.click();
    this.page.waitForTimeout(2000);

  }

}
