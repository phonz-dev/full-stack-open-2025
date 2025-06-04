const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const loginTitle = await page.getByText('log in to application')
    const loginForm = await page.getByTestId('username').locator('..')

    await expect(loginTitle).toBeVisible()
    await expect(loginForm).toBeVisible()
  })
})
