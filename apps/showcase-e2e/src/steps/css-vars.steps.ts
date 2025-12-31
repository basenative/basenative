import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given, Then } = createBdd();

Given('I am on the home page', async ({ page }) => {
  await page.goto('/');
});

Then(
  'the CSS variable {string} should resolve to a valid value',
  async ({ page }, varName: string) => {
    const value = await page.evaluate((name) => {
      return getComputedStyle(document.body).getPropertyValue(name).trim();
    }, varName);

    // Log strictly for debugging if needed, but the assertion is key
    // console.log(`${varName}: ${value}`);

    expect(value).not.toBe('');
    expect(value).not.toBe('undefined');
    expect(value).not.toBe('null');
  },
);
