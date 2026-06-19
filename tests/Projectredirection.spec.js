const { test, expect } = require('@playwright/test');

test('Sir johnSoane redirection', async ({ page }) => {
  await page.goto('https://test-soane-d9.pantheonsite.io/your-visit', {
    waitUntil: 'networkidle'
  });

  const allowAll = page.getByRole('button', { name: 'Allow all' });
  await allowAll.waitFor({ state: 'visible' });
  await allowAll.click();
  await page.locator('#CybotCookiebotDialog').waitFor({ state: 'hidden' });

  await expect(page).toHaveURL(/your-visit/);

  await page.locator('a[href="/node/96"]').click();
  await expect(page).toHaveURL(/highlights-tour/);

  // Open menu and wait until expanded
  await page.locator('button.a-nav-toggle__wrapper').click();
  await expect(page.locator('button.a-nav-toggle__wrapper')).toHaveAttribute('aria-expanded', 'true');

  // Print all menu items to console
  const menuLinks = await page.locator('#header button.a-nav-toggle__wrapper ~ nav a').allInnerTexts();
  console.log('Menu items found:');
  menuLinks.forEach((text, i) => console.log(`  ${i + 1}. ${text}`));

  // Scope to header to avoid footer link conflicts
  const header = page.locator('#header');

  await expect(header.getByRole('link', { name: 'Visit' }).nth(1)).toBeVisible();
  await expect(header.getByRole('link', { name: "What's" }).nth(1)).toBeVisible();
  await expect(header.getByRole('link', { name: 'Collections' }).nth(1)).toBeVisible();
  await expect(header.getByRole('link', { name: 'Shop' }).nth(1)).toBeVisible();
  await expect(header.getByRole('link', { name: 'Support us' })).toBeVisible();
  await expect(header.getByRole('link', { name: 'Learning' })).toBeVisible();
  await expect(header.getByRole('link', { name: 'Soane Medal' })).toBeVisible();
});