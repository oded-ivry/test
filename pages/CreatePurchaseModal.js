const { expect } = require('@playwright/test');

//selectors
const newPurchaseBtn = 'button:has-text("New purchase"):visible';
const purchaseTitle = '[data-test-id="purchase-form-title-input"]';
const budgetItems = '[placeholder="Choose\\ budget\\ item"]';
const budgetItemItRelated = 'text=IT and Related Cost';
const budgetSubItemCDN = 'text=CDN';
const subsidiaryDropDown = 'text=Subsidiary*Subsidiary >> input[role="combobox"]';
const subsidiaryIL = 'text=_test_subsidiary_Taboola IL';
const vendorInput = 'text=VendorChoose vendor >> input[role="combobox"]';
const vendorFilter = 'text=Nouvelle Boheme(5986)';
const itemLine = 'input[role="combobox"]';
const priceLine = 'input[role="spinbutton"]';
const createPurchaseOkBtn = '[data-test-id="button-ok"]';
const requestTitle = '[data-test-id="purchase-view-title"] >> h3:visible';
const userFromApprovalFlow = 'div.primary.bold > span:nth-child(1)';


class CreatePurchaseModal {
    constructor(page) {
        this.page = page;
       }

      async create(){
        await this.page.locator(newPurchaseBtn).click();
        await this.page.locator(purchaseTitle).fill('test');
        await this.page.locator(budgetItems).click();
        await this.page.locator(budgetItemItRelated).click();
        await this.page.locator(budgetSubItemCDN).click();
        await this.page.locator(budgetSubItemCDN).nth(1).click();
        await this.page.locator(subsidiaryDropDown).click();
        for (let i=0; i<8; i++){
            await this.page.locator(subsidiaryDropDown).press('ArrowDown');
        }
        await this.page.locator(subsidiaryIL).click();
        await this.page.locator(vendorInput).fill('Nouvelle Boheme');
        await this.page.locator(vendorFilter).click();
        await this.page.locator(itemLine).nth(4).fill('test item');
        await this.page.locator(priceLine).nth(1).fill('50000');
        await this.page.locator(createPurchaseOkBtn).click();
        await this.page.waitForLoadState();
      }

      async getRequestId(){
        let requestNumber = await this.page.locator(requestTitle).nth(1).textContent();
        requestNumber = requestNumber.substring(1, requestNumber.length -1);
        return requestNumber;
    }

    async getUsers(){
      let user = '';
      let users = [];
      for (let i=1; i<=4; i++){
        user = await (await this.page.locator(userFromApprovalFlow).nth(i).textContent()).trim().replaceAll(',', '');
        users[i] = 'test+' + user + '@approve.com';
      } 
      return users;
    }

}
module.exports = { CreatePurchaseModal};