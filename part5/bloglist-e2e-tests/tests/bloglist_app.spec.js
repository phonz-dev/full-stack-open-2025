const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/tests/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Alphonzo Escolar',
        username: 'fonzdev',
        password: 'fonzeus'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const loginTitle = await page.getByText('log in to application')
    const loginForm = await page.getByTestId('username').locator('..')

    await expect(loginTitle).toBeVisible()
    await expect(loginForm).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('fonzdev')
      await page.getByTestId('password').fill('fonzeus')
      await page.getByRole('button', { name: 'login' }).click()

      const user = await page.getByText('Alphonzo Escolar logged in')
      await expect(user).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('fonzdev')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('fonzdev')
      await page.getByTestId('password').fill('fonzeus')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test.only('a new blog can be created', async ({ page }) => {
      await page.pause()
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByTestId('title').fill('Example blog')
      await page.getByTestId('author').fill('Robert Martin')
      await page.getByTestId('url').fill('example.com')

      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText('a new blog Example blog by Robert Martin added')).toBeVisible()
      await expect(page.getByText('Example blog Robert Martin')).toBeVisible()
    })
  })
})
