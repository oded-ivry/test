const { expect } = require('@playwright/test');

//selectors
const searchBox = '[data-test-id="search"]';
const userIcon = '[id="single-spa-application\\:\\@approve\\/approve-front"] >> span';
const signOutBtn ='text=Sign out';
const firstTableItem = 'td:has-text("No Data"):visible';
const filterOutAssignedToMe = 'button:has-text("Assigned to me"):visible';
const viewAllPurchases = 'text=View all';
const approvedPurchase = 'td:has-text("Approved"):visible';



class MainPage {
    constructor(page) {
        this.page = page;
    }

    async validatePurchaseRequestCreated(requestNumber){
        await this.page.locator(searchBox).fill(requestNumber);
        const request = await this.page.locator(`td:has-text('${requestNumber}'):visible`).nth(0);
        await expect(request).toContainText(requestNumber);
    }

    async signOut(){
        await this.page.locator(userIcon).nth(1).click();
        await this.page.locator(signOutBtn).click();
        await this.page.waitForTimeout(10000);
    }

    async openRequest(requestNumber){
        await this.page.locator(searchBox).fill(requestNumber);
        await this.page.locator(`td:has-text('${requestNumber}')`).click();
    }

    async validateRequestApproval(requestNumber){
        await this.page.locator(searchBox).fill(requestNumber);
        let firstItemEmptyTable =  await this.page.locator(firstTableItem);
        await expect(firstItemEmptyTable).toContainText('No Data');
    }

    async validateReply(requestNumber){
        await this.page.locator(searchBox).fill(requestNumber);
        let firstItemEmptyTable =  await this.page.locator(firstTableItem).nth(0);
        await expect(firstItemEmptyTable).toContainText('No Data');
    }
    async validateReturn(requestNumber){
        await this.page.locator(searchBox).fill(requestNumber);
        await this.page.locator(searchBox).fill(requestNumber);
        let firstItemEmptyTable =  await this.page.locator(firstTableItem).nth(0);
        await expect(firstItemEmptyTable).toContainText('No Data');
    }

    async validateOverallApproval(requestNumber){
        await this.page.locator(filterOutAssignedToMe).click();
        await this.page.locator(viewAllPurchases).click();
        await this.page.locator(searchBox).fill(requestNumber);
        let isApproved =  await this.page.locator(approvedPurchase).nth(0);
        //await expect(isApproved).toContainText('Approved');
    }


}
module.exports = { MainPage };