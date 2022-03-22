const { expect } = require('@playwright/test');

//selectors
const loginPageURL ='https://dev.approve.com/authorize';
const password = 'test123456';
const userNameInput = '[placeholder="name\\@company\\.com"]';
const passwordInput = '[placeholder="Password"]';
const signInBtn = 'text=Your work emailPasswordSign In >> button';
const closeFirstSignPopup = 'path:nth-child(13):visible';


class LoginPage {
    constructor(page) {
        this.page = page;
      }

      async navigate() {
        await this.page.goto(loginPageURL);
        await this.page.waitForLoadState();
      }

      async signIn(user, isFirst = false){
        await this.page.locator(userNameInput).fill(user);
        await this.page.locator(passwordInput).fill(password);
        await this.page.locator(signInBtn).click();
        if (isFirst){
          await this.page.locator(closeFirstSignPopup).click();
        }
      }
}
module.exports = { LoginPage};