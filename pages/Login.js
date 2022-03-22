const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
      }

      async navigate() {
        await this.page.goto('https://dev.approve.com/authorize');
        await this.page.waitForLoadState();
      }

      async signIn(user, isFirst = false){
        const password = 'test123456';
        await this.page.locator('[placeholder="name\\@company\\.com"]').fill(user);
        await this.page.locator('[placeholder="Password"]').fill(password);
        await this.page.locator('text=Your work emailPasswordSign In >> button').click();
        if (isFirst){
          await this.page.locator('path:nth-child(13):visible').click();
        }
      }
}
module.exports = { LoginPage};