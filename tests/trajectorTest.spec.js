const { test, expect } = require('@playwright/test');
import TrajectorPage from '../pages/trajectorPage';
import { generateRandomName, populateForm } from '../utils/helper';
const fs = require('fs');

test.describe('Trajector Medical Test', () => {
  let page;
  let trajectorPage;

  test.beforeAll(async ({ browser }) => {
    const context= await browser. newContext({ recordVideo: { dir: 'videos/' } });
     page = await context.newPage();    
    trajectorPage = new TrajectorPage(page);
  });

  test.only('Automated Smoke Test for Trajector Medical', async () => {
    const logFile = `logs/chrome-test-log.txt`;


    // Redirect console output to log file
    const testLogStream = fs.createWriteStream('test_log.txt');

    // Redirect console output to the stream
    const originalConsoleLog = console.log;
    console.log = function (...args) {
      originalConsoleLog(...args);
      testLogStream.write(`${args.join(' ')}\n`);
    };
  

    console.log('Starting test...');
    const title=await trajectorPage.navigate();
    console.log('Page title:', title);
    if (title.includes('Trajector Medical')) {
      console.log('Successfully landed on Trajector Medical website.');
    } else {
      console.error('Unexpected page title. Test failed.');
    }
    // Click the "Free Medical Evaluation" button
    console.log('Clicking Free Medical Evaluation button');
    await trajectorPage.clickFreeEvaluation();

    // Fill in the form with randomly generated names
    const randomName = generateRandomName();
    await populateForm(page, randomName);
    await trajectorPage.radioButton();
    // Check the form is filled correctly
    console.log('Filling in the form with random user data');
    await expect(page.locator('#input_33_1_3')).toHaveValue(randomName.firstName);
    await expect(page.locator('#input_33_1_6')).toHaveValue(randomName.lastName);
    await expect(page.locator("#input_33_5")).toHaveValue(randomName.email);
    await expect(page.locator("#input_33_13")).toHaveValue(randomName.number);
    await expect(page.locator("#input_33_14_4")).toHaveValue(randomName.state);
    await expect(page.locator("#input_33_14_5")).toHaveValue(randomName.zipCode);
    console.log('viewport changed successfully.');

    await page.setViewportSize({ width: 375, height: 667 });
    console.log('Test completed successfully.');
    await testLogStream.close();
  });

  test.afterAll(async () => {
    await page.close();
  });

});
