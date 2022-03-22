const { expect } = require('@playwright/test');

//selectors
const userNameSelector = 'div.primary.bold > span:nth-child(1)';
const closeRequestModalSelector = '[aria-label="Close"]';
const approveButtonSelector = '[data-test-id="purchase-view"] button:has-text("Approve"):visible';
const cancelMergeBtn = 'button:has-text("Cancel")';
const approveRequestOkBtn = 'button:has-text("OK")';
const consultBtn = 'button:has-text("Consult")';
const consultWithBtn ='div[role="tooltip"] div:has-text("Consult with")';
const consultWithInputBox = 'text=ConsultConsult withCancelOK >> input[role="combobox"]';
const selectConsultant = '.ant-select-item';
const commentToConsult = '[placeholder="Write your note"]:visible';
const replyToConsultantBtn = 'button:has-text("Reply to manager"):visible';
const returnRequestBtn = 'button:has-text("Return")';


class PurchaseRequestModal {
    constructor(page) {
        this.page = page;
      }

      async getUsers(){
        let user = '';
        let users = [];
        for (let i=1; i<=4; i++){
          user = await (await this.page.locator(userNameSelector).nth(i).textContent()).trim().replaceAll(',', '');
          users[i] = 'test+' + user + '@approve.com';
        } 
        return users;
      }

      async closeRequestModal(){
        await this.page.locator(closeRequestModalSelector).click();
      }

      async approvePurchaseRequest(isLast = false){
        await this.page.locator(approveButtonSelector).click();
        if (isLast){
          await this.page.locator(cancelMergeBtn).click();
        }
        await this.page.locator(approveRequestOkBtn).click();
      }

      async consult(consultantName){
        await this.page.locator(consultBtn).click();
        await this.page.locator(consultWithBtn).nth(2).click();
        await this.page.locator(consultWithInputBox).fill(consultantName);
        await this.page.locator(selectConsultant).click();
        await this.page.locator(commentToConsult).fill('Approve?');
        await this.page.locator(`${approveRequestOkBtn}:visible`).click();
        //await expect(this.page).toHaveURL('https://dev.approve.com/purchases');
      }

      async reply(){
        await this.page.locator(replyToConsultantBtn).click();
        await this.page.locator(commentToConsult).fill('Yes!');
        await this.page.locator(approveRequestOkBtn).click();
        await this.page.waitForLoadState();
      }

      async returnPurchaseRequest(){
        await this.page.locator(returnRequestBtn).click();
        await this.page.locator(approveRequestOkBtn).click();
        //await expect(page).toHaveURL('https://dev.approve.com/purchases');
      }

}
module.exports = { PurchaseRequestModal };

