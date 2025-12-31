import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

Given('I open the forms showcase page', async ({ page }) => {
  await page.goto('/forms');
});

When(
  'I type {string} into the {string} input',
  async ({ page }, text, label) => {
    // Finds the input inside a lib-input with the given label text
    await page.getByRole('textbox', { name: label }).fill(text);
  },
);

Then(
  'the {string} input should have the value {string}',
  async ({ page }, label, value) => {
    await expect(page.getByRole('textbox', { name: label })).toHaveValue(value);
  },
);

Then('the specific input should be valid', async ({ page }) => {
  // Checks that no error message is displayed
  await expect(page.locator('.semantic-error')).toBeHidden();
});

Then('I should see {string} of the wizard', async ({ page }, stepTitle) => {
  // Checks for active step indicator
  const indicator = page.locator('.semantic-wizard-step-indicator.active', {
    hasText: stepTitle,
  });
  await expect(indicator).toBeVisible();
});

When('I click the {string} button', async ({ page }, name) => {
  await page.getByRole('button', { name }).click();
});
