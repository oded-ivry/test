const { expect } = require('@playwright/test');

class PurchaseRequestModal {
    constructor(page) {
        this.page = page;
      }

/*       async getRequestId(){
        let requestNumber = await this.page.locator('[data-test-id="purchase-view-title"] >> h3:visible').nth(1).textContent();
        requestNumber.substring(1, requestNumber.length -1);
        return requestNumber;
    } */

      async getUsers(){
        let user = '';
        let users = [];
        for (let i=1; i<=4; i++){
          user = await (await this.page.locator('div.primary.bold > span:nth-child(1)').nth(i).textContent()).trim().replaceAll(',', '');
          users[i] = 'test+' + user + '@approve.com';
        } 
        return users;
      }

      async closeRequestModal(){
        await this.page.locator('[aria-label="Close"]').click();
      }

      async approvePurchaseRequest(isLast = false){
        await this.page.locator('[data-test-id="purchase-view"] button:has-text("Approve"):visible').click();
        if (isLast){
          await this.page.locator('button:has-text("Cancel")').click();
        }
        await this.page.locator('button:has-text("OK")').click();
      }

      async consult(consultantName){
        await this.page.locator('button:has-text("Consult")').click();
        await this.page.locator('div[role="tooltip"] div:has-text("Consult with")').nth(2).click();
        await this.page.locator('text=ConsultConsult withCancelOK >> input[role="combobox"]').fill(consultantName);
        await this.page.locator('.ant-select-item').click();
        await this.page.locator('[placeholder="Write your note"]:visible').fill('Approve?');
        await this.page.locator('button:has-text("OK"):visible').click();
        //await expect(this.page).toHaveURL('https://dev.approve.com/purchases');
      }

      async reply(){
        await this.page.locator('button:has-text("Reply to manager"):visible').click();
        await this.page.locator('[placeholder="Write your note"]:visible').fill('Yes!');
        await this.page.locator('button:has-text("OK")').click();
        await this.page.waitForLoadState();
      }

      async returnPurchaseRequest(){
        await this.page.locator('button:has-text("Return")').click();
        await this.page.locator('button:has-text("OK")').click();
        //await expect(page).toHaveURL('https://dev.approve.com/purchases');
      }

}
module.exports = { PurchaseRequestModal };

