import { createBdd } from 'playwright-bdd';
import { test } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

Given('I have a visually hidden component', async ({ page }) => {
  // Navigate to the preview page for visually-hidden
  await page.goto('/docs/components/visually-hidden');
});

When('I project content into it', async ({ page }) => {
  // The content is already projected by the PreviewComponent template
  // We just verify it's there in the DOM
});

Then('the content should not be visible on the screen', async ({ page }) => {
  const hiddenElement = page.locator('span[visually-hidden]');
  // Check if it's attached but not visible in the viewport logic?
  // Playwright's toBeHidden() checks visibility:hidden, display:none, opacity:0, etc.
  // Our styles use clip:rect(0,0,0,0) which MIGHT be considered "visible" by Playwright if strictly checking display/visibility properties,
  // BUT usually clip:rect(0,0,0,0) + 1px size is considered hidden or at least not perceptible.
  // Actually, standard sr-only classes often pass "toBeVisible()" check if they have 1px size?
  // Let's refine. styles: width: 1px, height: 1px, overflow: hidden, clip: rect(0,0,0,0).
  // It effectively renders nothing visible.
  // Let's check bounding box or just assertion.

  // Actually, Playwright's .toBeHidden() might return false because it has 1px size.
  // We can check strictly that the text is not visible.

  // Better approach: Check specific "sr-only" CSS properties are applied.
  await expect(hiddenElement).toHaveCSS('position', 'absolute');
  await expect(hiddenElement).toHaveCSS('width', '1px');
  await expect(hiddenElement).toHaveCSS('height', '1px');
  await expect(hiddenElement).toHaveCSS('clip', 'rect(0px, 0px, 0px, 0px)');
});

Then(
  'the content should be present in the accessibility tree',
  async ({ page }) => {
    const hiddenElement = page.locator('span[visually-hidden]');
    // It should be attached
    await expect(hiddenElement).toBeAttached();

    // It should contain the text
    await expect(hiddenElement).toContainText(
      'This content is hidden from view',
    );
  },
);
