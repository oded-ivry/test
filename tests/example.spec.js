const { test, expect } = require('@playwright/test');

const PASSWORD = 'test123456';
let USERNAME = 'test+officemanager__e2aa@approve.com';
let REQUESTNUMBER = '';
let REQUEST = '';
let USER1,USER2,USRE3,USER4 = '';

test('Approval-flow', async ({ page }) => {
  //--------------------------------officemanager__e2aa@approve.com create PR Top----------------------------------------------------
  //sign in PR creator
  await page.goto('https://dev.approve.com/authorize');
  let title = await page.title();
  expect(title).toBe('Approve.com - Simple, Customizable Procurement processes');
  await page.locator('[placeholder="name\\@company\\.com"]').fill(USERNAME);
  await page.locator('[placeholder="Password"]').fill(PASSWORD);
  await page.locator('text=Your work emailPasswordSign In >> button').click();
  
  //new purchase
  await page.locator('path:nth-child(13):visible').click();
  title = await page.title();
  expect(title).toBe('Approve.com - Simple, Customizable Procurement processes');
  await page.locator('button:has-text("New purchase"):visible').click();
  await page.waitForLoadState();
  expect(page.url()).toBe('https://dev.approve.com/purchases/new');
  
  //start filling a new PR
  //title
  await page.locator('[data-test-id="purchase-form-title-input"]').fill('test');
  //budget items
  await page.locator('[placeholder="Choose\\ budget\\ item"]').click();
  await page.locator('text=IT and Related Cost').click();
  await page.locator('text=CDN').click();
  await page.locator('text=CDN').nth(1).click();
  //subsidiary
  await page.locator('text=Subsidiary*Subsidiary >> input[role="combobox"]').click();
  for (let i=0; i<8; i++){
    await page.locator('text=Subsidiary*Subsidiary >> input[role="combobox"]').press('ArrowDown');
  }
  await page.locator('text=_test_subsidiary_Taboola IL').click();
  //vendor
  await page.locator('text=VendorChoose vendor >> input[role="combobox"]').fill('Nouvelle Boheme');
  await page.locator('text=Nouvelle Boheme(5986)').click();
  //item
  await page.locator('input[role="combobox"]').nth(4).fill('test item');
  //price
  await page.locator('input[role="spinbutton"]').nth(1).fill('50000');
  //submit
  await page.locator('[data-test-id="button-ok"]').click();
  await page.waitForLoadState();
  

  //get USERS
  USERNAME1 = await (await page.locator('div.primary.bold > span:nth-child(1)').nth(1).textContent()).trim().replaceAll(',', '');
  USERNAME1 = 'test+' + USERNAME1 + '@approve.com';
  
  USERNAME2 = await (await page.locator('div.primary.bold > span:nth-child(1)').nth(2).textContent()).trim().replaceAll(',', '');
  USERNAME2 = 'test+' + USERNAME2 + '@approve.com';

  USERNAME3 = await (await page.locator('div.primary.bold > span:nth-child(1)').nth(3).textContent()).trim().replaceAll(',', '');
  USERNAME3 = 'test+' + USERNAME3 + '@approve.com';

  USERNAME4 = await (await page.locator('div.primary.bold > span:nth-child(1)').nth(4).textContent()).trim().replaceAll(',', '');
  USERNAME4 = 'test+' + USERNAME4 + '@approve.com';

  //get request number
  REQUESTNUMBER = await page.locator('[data-test-id="purchase-view-title"] >> h3 >> nth=1').textContent();
  REQUESTNUMBER = REQUESTNUMBER.substring(1, REQUESTNUMBER.length -1);
  await page.locator('[aria-label="Close"]').click();
  
  //Validate request created
  await page.locator('[data-test-id="search"]').fill(REQUESTNUMBER);
  REQUEST = await page.locator(`td:has-text('${REQUESTNUMBER}'):visible`);
  await expect(REQUEST).toContainText(REQUESTNUMBER);
  
  //sign out - PR creator
  await page.locator('[id="single-spa-application\\:\\@approve\\/approve-front"] >> span').nth(1).click();
  await page.locator('text=Sign out').click();
  await page.waitForTimeout(20000);
  //--------------------------------officemanager__e2aa@approve.com create PR Bottom--------------------------------------------------------
  
  //--------------------------------regionaladministrativedirector__0af7 Approve 1/4 Top----------------------------------------------------
  //sign in
  await page.goto('https://dev.approve.com/authorize');
  await page.waitForLoadState();
  title = await page.title();
  expect(title).toBe('Approve.com - Simple, Customizable Procurement processes');
  await page.locator('[placeholder="name\\@company\\.com"]').fill(USERNAME1);
  await page.locator('[placeholder="Password"]').fill(PASSWORD);
  await page.locator('text=Your work emailPasswordSign In >> button').click();
  await page.waitForLoadState();
  
  //open request
  await page.locator('[data-test-id="search"]').fill(REQUESTNUMBER);
  await page.locator(`td:has-text('${REQUESTNUMBER}')`).click();
  await page.locator('[data-test-id="purchase-view"] button:has-text("Approve"):visible').click();

  //approve request
  await page.locator('button:has-text("OK")').click();
  await expect(page).toHaveURL('https://dev.approve.com/purchases');
  
  //Validate approval
  await page.locator('[data-test-id="search"]').fill(REQUESTNUMBER);
  await page.locator('[data-test-id="search"]').fill(REQUESTNUMBER);
  let firstItemEmptyTable =  await page.locator('td:has-text("No Data")');
  await expect(firstItemEmptyTable).toContainText('No Data');

  //sign out
  await page.locator('[id="single-spa-application\\:\\@approve\\/approve-front"] >> span').nth(1).click();
  await page.locator('text=Sign out').click();
  await page.waitForTimeout(10000);

  //--------------------------------regionaladministrativedirector__0af7 Approve 1/4 Bottom----------------------------------------------------

  //--------------------------------manager_fp_a__e2a5 Consult user vpit_cybersecurity__a029 Top-----------------------------------------------
  //sign
  await page.goto('https://dev.approve.com/authorize');
  await page.waitForLoadState();
  title = await page.title();
  expect(title).toBe('Approve.com - Simple, Customizable Procurement processes');
  await page.locator('[placeholder="name\\@company\\.com"]').fill(USERNAME2);
  await page.locator('[placeholder="Password"]').fill(PASSWORD);
  await page.locator('text=Your work emailPasswordSign In >> button').click();

  //open request
  await page.locator('[data-test-id="search"]').fill(REQUESTNUMBER);
  await page.locator(`td:has-text('${REQUESTNUMBER}')`).click();
  await page.locator('[data-test-id="purchase-view"] button:has-text("Approve"):visible').click();

  //get consultant name = USERNAME3
  const CONSULTANT = await (await page.locator('div.primary.bold > span:nth-child(1)').nth(3).textContent()).trim().replaceAll(',', '');
  
  //Consult
  await page.locator('button:has-text("Consult")').click();
  await page.locator('div[role="tooltip"] div:has-text("Consult with")').nth(2).click();
  await page.locator('text=ConsultConsult withCancelOK >> input[role="combobox"]').fill(CONSULTANT);
  await page.locator('.ant-select-item').click();
  await page.locator('[placeholder="Write your note"]:visible').fill('Approve?');
  await page.locator('button:has-text("OK"):visible').click();
  await expect(page).toHaveURL('https://dev.approve.com/purchases');

  //sign out
  await page.locator('[id="single-spa-application\\:\\@approve\\/approve-front"] >> span').nth(1).click();
  await page.locator('text=Sign out').click();
  await page.waitForTimeout(20000);
  //--------------------------------manager_fp_a__e2a5 Consult user vpit_cybersecurity__a029 Bottom-----------------------------------------------  

  //--------------------------------vpit_cybersecurity__a029 Reply user manager_fp_a__e2a5 Top----------------------------------------------------
  //sign in
  await page.goto('https://dev.approve.com/authorize');
  await page.waitForLoadState();
  title = await page.title();
  expect(title).toBe('Approve.com - Simple, Customizable Procurement processes');
  await page.locator('[placeholder="name\\@company\\.com"]').fill(USERNAME3);
  await page.locator('[placeholder="Password"]').fill(PASSWORD);
  await page.locator('text=Your work emailPasswordSign In >> button').click();
  await page.waitForLoadState();

  //open request
  await page.locator('[data-test-id="search"]').fill(REQUESTNUMBER);
  await page.locator(`td:has-text('${REQUESTNUMBER}')`).click();
  
  //reply
  await page.locator('button:has-text("Reply to manager"):visible').click();
  await page.locator('[placeholder="Write your note"]:visible').fill('Yes!');
  await page.locator('button:has-text("OK")').click();
  await page.waitForLoadState();
  
  //Validate reply
  await page.locator('[data-test-id="search"]').fill(REQUESTNUMBER);
  firstItemEmptyTable =  await page.locator('td:has-text("No Data")');
  await expect(firstItemEmptyTable).toContainText('No Data');

  //sign out
  await page.locator('[id="single-spa-application\\:\\@approve\\/approve-front"] >> span').nth(1).click();
  await page.locator('text=Sign out').click();
  await page.waitForTimeout(20000);
  //--------------------------------vpit_cybersecurity__a029 Reply user manager_fp_a__e2a5 Bottom-------------------------------------------------
  
  //--------------------------------manager_fp_a__e2a5  Approve 2/4 Top---------------------------------------------------------------------------
  //sign in 
  await page.goto('https://dev.approve.com/authorize');
  await page.waitForLoadState();
  title = await page.title();
  expect(title).toBe('Approve.com - Simple, Customizable Procurement processes');
  await page.locator('[placeholder="name\\@company\\.com"]').fill(USERNAME2);
  await page.locator('[placeholder="Password"]').fill(PASSWORD);
  await page.locator('text=Your work emailPasswordSign In >> button').click();
  await page.waitForLoadState();
    
  //open request
  await page.locator('[data-test-id="search"]').fill(REQUESTNUMBER);
  await page.locator(`td:has-text('${REQUESTNUMBER}')`).click();
  
  //consultee approves request
  await page.locator('[data-test-id="purchase-view"] button:has-text("Approve")').click();
  await page.locator('button:has-text("OK")').click();
  await expect(page).toHaveURL('https://dev.approve.com/purchases');
  
  //Validate consultee's approval
  await page.locator('[data-test-id="search"]').fill(REQUESTNUMBER);
  await page.locator('[data-test-id="search"]').fill(REQUESTNUMBER);
  firstItemEmptyTable =  await page.locator('td:has-text("No Data")');
  await expect(firstItemEmptyTable).toContainText('No Data');
  
  //sign out
  await page.locator('[id="single-spa-application\\:\\@approve\\/approve-front"] >> span').nth(1).click();
  await page.locator('text=Sign out').click();
  await page.waitForTimeout(20000);
  //--------------------------------manager_fp_a__e2a5  Approve 2/4 Bottom---------------------------------------------------------------------------
  
  //--------------------------------vpit_cybersecurity__a029  Approve 3/4 (returned)Top---------------------------------------------------------------------------
  //sign in
  await page.goto('https://dev.approve.com/authorize');
  await page.waitForLoadState();
  title = await page.title();
  expect(title).toBe('Approve.com - Simple, Customizable Procurement processes');
  await page.locator('[placeholder="name\\@company\\.com"]').fill(USERNAME3);
  await page.locator('[placeholder="Password"]').fill(PASSWORD);
  await page.locator('text=Your work emailPasswordSign In >> button').click();
  await page.waitForLoadState();

  //open request
  await page.locator('[data-test-id="search"]').fill(REQUESTNUMBER);
  await page.locator(`td:has-text('${REQUESTNUMBER}')`).click();

  //approve request
  await page.locator('[data-test-id="purchase-view"] button:has-text("Approve")').click();
  await page.locator('button:has-text("OK")').click();
  await expect(page).toHaveURL('https://dev.approve.com/purchases');
  
  //Validate approval
  await page.locator('[data-test-id="search"]').fill(REQUESTNUMBER);
  await page.locator('[data-test-id="search"]').fill(REQUESTNUMBER);
  firstItemEmptyTable =  await page.locator('td:has-text("No Data")');
  await expect(firstItemEmptyTable).toContainText('No Data');
  
  //sign out
  await page.locator('[id="single-spa-application\\:\\@approve\\/approve-front"] >> span').nth(1).click();
  await page.locator('text=Sign out').click();
  await page.waitForTimeout(20000);
  //--------------------------------vpit_cybersecurity__a029  Approve 3/4 (returned)Bottom---------------------------------------------------------------------------

  //--------------------------------globalsourcing_purchasingmanager__3bd5  Rturens to vpit_cybersecurity__a029 Top-------------------------------------------
  // sign in
  await page.goto('https://dev.approve.com/authorize');
  await page.waitForLoadState();
  title = await page.title();
  expect(title).toBe('Approve.com - Simple, Customizable Procurement processes');
  await page.locator('[placeholder="name\\@company\\.com"]').fill(USERNAME4);
  await page.locator('[placeholder="Password"]').fill(PASSWORD);
  await page.locator('text=Your work emailPasswordSign In >> button').click();
  await page.waitForLoadState();

  //open request
  await page.locator('[data-test-id="search"]').fill(REQUESTNUMBER);
  await page.locator(`td:has-text('${REQUESTNUMBER}')`).click();

  // Return
  await page.locator('button:has-text("Return")').click();
  await page.locator('button:has-text("OK")').click();
  await expect(page).toHaveURL('https://dev.approve.com/purchases');

  //Validate return
  await page.locator('[data-test-id="search"]').fill(REQUESTNUMBER);
  await page.locator('[data-test-id="search"]').fill(REQUESTNUMBER);
  firstItemEmptyTable =  await page.locator('td:has-text("No Data")');
  await expect(firstItemEmptyTable).toContainText('No Data');

  //sign out
  await page.locator('[id="single-spa-application\\:\\@approve\\/approve-front"] >> span').nth(1).click();
  await page.locator('text=Sign out').click();
  await page.waitForTimeout(20000);
  //--------------------------------globalsourcing_purchasingmanager__3bd5  Rtuens to vpit_cybersecurity__a029 Bottom-------------------------------------------

  //--------------------------------vpit_cybersecurity__a029 Approves 3/4 (Approved) Top--------------------------------------------------------------------------  //USERNAME3 sign in
  //sign in
  await page.goto('https://dev.approve.com/authorize');
  await page.waitForLoadState();
  title = await page.title();
  expect(title).toBe('Approve.com - Simple, Customizable Procurement processes');
  await page.locator('[placeholder="name\\@company\\.com"]').fill(USERNAME3);
  await page.locator('[placeholder="Password"]').fill(PASSWORD);
  await page.locator('text=Your work emailPasswordSign In >> button').click();
  await page.waitForLoadState();

  //open request
  await page.locator('[data-test-id="search"]').fill(REQUESTNUMBER);
  await page.locator(`td:has-text('${REQUESTNUMBER}')`).click();
  
  //Second approve 
  await page.locator('[data-test-id="purchase-view"] button:has-text("Approve")').click();
  await page.locator('button:has-text("OK")').click();
  await expect(page).toHaveURL('https://dev.approve.com/purchases');

  //Validate approval
  await page.locator('[data-test-id="search"]').fill(REQUESTNUMBER);
  await page.locator('[data-test-id="search"]').fill(REQUESTNUMBER);
  firstItemEmptyTable =  await page.locator('td:has-text("No Data")');
  await expect(firstItemEmptyTable).toContainText('No Data');
  
  //sign out
  await page.locator('[id="single-spa-application\\:\\@approve\\/approve-front"] >> span').nth(1).click();
  await page.locator('text=Sign out').click();
  await page.waitForTimeout(20000);
  //--------------------------------vpit_cybersecurity__a029 Approves 3/4 (Approved) Bottom------------------------------------------------------------------------
  
  //--------------------------------globalsourcing_purchasingmanager__3bd5 4/4 Top--------------------------------------------------------------------------
  //sign in
  await page.goto('https://dev.approve.com/authorize');
  await page.waitForLoadState();
  title = await page.title();
  expect(title).toBe('Approve.com - Simple, Customizable Procurement processes');
  await page.locator('[placeholder="name\\@company\\.com"]').fill(USERNAME4);
  await page.locator('[placeholder="Password"]').fill(PASSWORD);
  await page.locator('text=Your work emailPasswordSign In >> button').click();
  await page.waitForLoadState();

  //open request
  await page.locator('[data-test-id="search"]').fill(REQUESTNUMBER);
  await page.locator(`td:has-text('${REQUESTNUMBER}')`).click();

  //USERNAME4  approve 
  await page.locator('[data-test-id="purchase-view"] button:has-text("Approve")').click();
  await page.locator('button:has-text("Cancel")').click();
  await page.locator('button:has-text("OK")').click();
  await expect(page).toHaveURL('https://dev.approve.com/purchases');

  //Validate action approval
  await page.locator('button:has-text("Assigned to me"):visible').click();
  await page.locator('text=View all').click();
  await page.locator('[data-test-id="search"]').fill(REQUESTNUMBER);
  let isApproved =  await page.locator('td:has-text("Approved"):visible');
  await expect(isApproved).toContainText('Approved');

  //--------------------------------globalsourcing_purchasingmanager__3bd5 4/4 Bottom--------------------------------------------------------------------------
});