const { expect } = require('@playwright/test');

class MainPage {
    constructor(page) {
        this.page = page;
    }

    async validatePurchaseRequestCreated(requestNumber){
        await this.page.locator('[data-test-id="search"]').fill(requestNumber);
        const request = await this.page.locator(`td:has-text('${requestNumber}'):visible`).nth(0);
        await expect(request).toContainText(requestNumber);
    }

    async signOut(){
        await this.page.locator('[id="single-spa-application\\:\\@approve\\/approve-front"] >> span').nth(1).click();
        await this.page.locator('text=Sign out').click();
        await this.page.waitForTimeout(10000);
    }

    async openRequest(requestNumber){
        await this.page.locator('[data-test-id="search"]').fill(requestNumber);
        await this.page.locator(`td:has-text('${requestNumber}')`).click();
    }

    async validateRequestApproval(requestNumber){
        await this.page.locator('[data-test-id="search"]').fill(requestNumber);
        let firstItemEmptyTable =  await this.page.locator('td:has-text("No Data"):');
        await expect(firstItemEmptyTable).toContainText('No Data');
    }

    async validateReply(requestNumber){
        await this.page.locator('[data-test-id="search"]').fill(requestNumber);
        let firstItemEmptyTable =  await this.page.locator('td:has-text("No Data")').nth(0);
        await expect(firstItemEmptyTable).toContainText('No Data');
    }
    async validateReturn(requestNumber){
        await this.page.locator('[data-test-id="search"]').fill(requestNumber);
        await this.page.locator('[data-test-id="search"]').fill(requestNumber);
        let firstItemEmptyTable =  await this.page.locator('td:has-text("No Data")').nth(0);
        await expect(firstItemEmptyTable).toContainText('No Data');
    }

    async validateOverallApproval(requestNumber){
        await this.page.locator('button:has-text("Assigned to me"):visible').click();
        await this.page.locator('text=View all').click();
        await this.page.locator('[data-test-id="search"]').fill(requestNumber);
        let isApproved =  await this.page.locator('td:has-text("Approved"):visible').nth(0);
        //await expect(isApproved).toContainText('Approved');
    }


}
module.exports = { MainPage };