import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, Then } = createBdd(test);

Given('I open the showcase application', async ({ page }) => {
  await page.goto('/');
});

Then('I should see the {string} logo', async ({ page }, logoText) => {
  await expect(
    page.getByRole('heading', { level: 1, name: logoText }),
  ).toBeVisible();
});

Then('I should see the version number {string}', async ({ page }, version) => {
  await expect(page.locator('header').getByText(version)).toBeVisible();
});

Then(
  'I should see links to {string} and {string}',
  async ({ page }, link1, link2) => {
    await expect(
      page.getByRole('link').filter({ hasText: link1 }),
    ).toBeVisible();
    await expect(
      page.getByRole('link').filter({ hasText: link2 }),
    ).toBeVisible();
  },
);

Then('the page title should be {string}', async ({ page }, title) => {
  await expect(page).toHaveTitle(title);
});
