
class CreatePurchaseModal {
    constructor(page) {
        this.page = page;
       }

      async create(){
        await this.page.locator('button:has-text("New purchase"):visible').click();
        await this.page.locator('[data-test-id="purchase-form-title-input"]').fill('test');
        await this.page.locator('[placeholder="Choose\\ budget\\ item"]').click();
        await this.page.locator('text=IT and Related Cost').click();
        await this.page.locator('text=CDN').click();
        await this.page.locator('text=CDN').nth(1).click();
        await this.page.locator('text=Subsidiary*Subsidiary >> input[role="combobox"]').click();
        for (let i=0; i<8; i++){
            await this.page.locator('text=Subsidiary*Subsidiary >> input[role="combobox"]').press('ArrowDown');
        }
        await this.page.locator('text=_test_subsidiary_Taboola IL').click();
        await this.page.locator('text=VendorChoose vendor >> input[role="combobox"]').fill('Nouvelle Boheme');
        await this.page.locator('text=Nouvelle Boheme(5986)').click();
        await this.page.locator('input[role="combobox"]').nth(4).fill('test item');
        await this.page.locator('input[role="spinbutton"]').nth(1).fill('50000');
        await this.page.locator('[data-test-id="button-ok"]').click();
        await this.page.waitForLoadState();
      }

      async getRequestId(){
        let requestNumber = await this.page.locator('[data-test-id="purchase-view-title"] >> h3:visible').nth(1).textContent();
        requestNumber = requestNumber.substring(1, requestNumber.length -1);
        return requestNumber;
    }

    async getUsers(){
      let user = '';
      let users = [];
      for (let i=1; i<=4; i++){
        user = await (await this.page.locator('div.primary.bold > span:nth-child(1)').nth(i).textContent()).trim().replaceAll(',', '');
        users[i] = 'test+' + user + '@approve.com';
      } 
      return users;
    }

}
module.exports = { CreatePurchaseModal};