const { test, expect } = require('@playwright/test');
const baseURL = process.env.NOVA_URL || 'http://localhost:3000';
test.beforeEach(async ({page}) => { await page.goto(baseURL); });
test('AUTO-01 page loads', async ({page}) => { await expect(page.locator('body')).toBeVisible(); });
test('AUTO-02 login text/control is available', async ({page}) => { await expect(page.locator('body')).toContainText(/login|sign in/i); });
test('AUTO-03 search is usable when present', async ({page}) => { const s=page.locator('input[placeholder*="Search" i],input[type="search"]').first(); if(await s.count()){await s.fill('test'); await expect(s).toHaveValue('test');} });
test('AUTO-04 no obvious 500 error', async ({page}) => { await expect(page.locator('body')).not.toContainText(/500 internal server error/i); });
test('AUTO-05 mobile viewport loads', async ({browser}) => { const c=await browser.newContext({viewport:{width:390,height:844}}); const p=await c.newPage(); await p.goto(baseURL); await expect(p.locator('body')).toBeVisible(); await c.close(); });
