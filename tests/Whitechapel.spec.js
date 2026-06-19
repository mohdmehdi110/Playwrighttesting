const { test, expect } = require('@playwright/test');

test('Whitechapel redirection', async ({ page }) => {
  await page.goto('https://test-whitechapel-wp.pantheonsite.io/', { waitUntil: 'networkidle' });
  await expect(page).toHaveURL('https://test-whitechapel-wp.pantheonsite.io/');

  // Dismiss cookie popup
  const allowAll = page.getByRole('button', { name: 'Allow all' });
  await allowAll.waitFor({ state: 'visible' });
  await allowAll.click();
  await page.locator('#CybotCookiebotDialog').waitFor({ state: 'hidden' });

  // Click My Account
  await page.locator('a.icon-account').click();
  await expect(page).toHaveURL(/my-account/);

  // Login form is inside an iframe
  const frame = page.frameLocator('iframe').first();
  await frame.getByRole('link', { name: 'Register now' }).click();
});