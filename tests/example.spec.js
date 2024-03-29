const { test/* , expect */ } = require('@playwright/test');
const { LoginPage } = require('../pages/Login.js');
const { CreatePurchaseModal } = require('../pages/CreatePurchaseModal.js');
const { PurchaseRequestModal } = require('../pages/PurchaseRequestModal.js');
const { MainPage } = require('../pages/MainPage.js');

const USERNAME = 'test+officemanager__e2aa@approve.com';

test('Approval-flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.signIn(USERNAME, true);
  const createPurchaseModal = new CreatePurchaseModal(page);
  await createPurchaseModal.create();
  const purchaseRequestModal = new PurchaseRequestModal(page);
  const requestNumber = await createPurchaseModal.getRequestId();
  const users = await createPurchaseModal.getUsers();
  const mainPage = new MainPage(page);
  await purchaseRequestModal.closeRequestModal();
  await mainPage.validatePurchaseRequestCreated(requestNumber);
  await mainPage.signOut();
  await loginPage.navigate();
  await loginPage.signIn(users[1]);
  await mainPage.openRequest(requestNumber);
  await purchaseRequestModal.approvePurchaseRequest();
  //await mainPage.validateRequestApproval(requestNumber);
  await mainPage.signOut();
  await loginPage.navigate();
  await loginPage.signIn(users[2]);
  await mainPage.openRequest(requestNumber);
  const consultantUserName = users[3];
  const consultantName = consultantUserName.substring(5, consultantUserName.length - 12);
  await purchaseRequestModal.consult(consultantName);
  await mainPage.signOut();
  await loginPage.navigate();
  await loginPage.signIn(users[3]);
  await mainPage.openRequest(requestNumber);
  await purchaseRequestModal.reply();
  await mainPage.validateReply(requestNumber);
  await mainPage.signOut();
  await loginPage.navigate();
  await loginPage.signIn(users[2]);
  await mainPage.openRequest(requestNumber);
  await purchaseRequestModal.approvePurchaseRequest();
  //await mainPage.validateRequestApproval(requestNumber);
  await mainPage.signOut();
  await loginPage.navigate();
  await loginPage.signIn(users[3]);
  await mainPage.openRequest(requestNumber);
  await purchaseRequestModal.approvePurchaseRequest();
  //await mainPage.validateRequestApproval(requestNumber);
  await mainPage.signOut();
  //----return
  await loginPage.navigate();
  await loginPage.signIn(users[4]);
  await mainPage.openRequest(requestNumber);
  await purchaseRequestModal.returnPurchaseRequest();
  //await mainPage.validateReturn(requestNumber);
  await mainPage.signOut();
  await loginPage.navigate();
  await loginPage.signIn(users[3]);
  await mainPage.openRequest(requestNumber);
  await purchaseRequestModal.approvePurchaseRequest();
  //await mainPage.(requestNumber);
  await mainPage.signOut();
  await loginPage.navigate();
  await loginPage.signIn(users[4]);
  await mainPage.openRequest(requestNumber);
  await purchaseRequestModal.approvePurchaseRequest(true);
  //await mainPage.validateRequestApproval(requestNumber);
  await mainPage.validateOverallApproval(requestNumber);
});

test('Afsdpproval-flow', async ({ page }) => {
});

/* 1. find a way to break the big test into a few smaller tests that test spesific simple tasks instead of the full approval flow  
   2. add expects assertions into the validation functions or in the main test 
*/