const faker = require('faker');

function generateRandomName() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email :faker.internet.email(),
    number:faker.phone.phoneNumber('###-###-####'),
    state:faker.address.state(),
    zipCode: faker.address.zipCode('#####')

  };
}

async function populateForm(page, { firstName, lastName,email,number,state,zipCode }) {
  await page.fill('#input_33_1_3', firstName);
  await page.fill('#input_33_1_6', lastName);
  await page.locator("#input_33_5").fill(email)
  await page.locator("#input_33_13").fill(number)
  await page.locator("#input_33_14_4").selectOption(state);
  await page.locator("#input_33_14_5").fill(zipCode)
  
}

module.exports = { generateRandomName, populateForm };
