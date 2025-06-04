const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginUser, createBlog } = require('./helper')

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
      await loginUser(page, 'fonzdev', 'fonzeus')
      const user = await page.getByText('Alphonzo Escolar logged in')
      await expect(user).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginUser(page, 'fonzdev', 'wrong')
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginUser(page, 'fonzdev', 'fonzeus')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Example blog', 'Robert Martin', 'example.com')
      await expect(page.getByText('a new blog Example blog by Robert Martin added')).toBeVisible()
      await expect(page.getByText('Example blog Robert Martin')).toBeVisible()
    })

    describe('when blog is added', () => {
      beforeEach(async ({ page }) => {
        createBlog(page, 'First blog', 'First author', 'first.com')

        await page
          .getByText('First blog First author')
          .locator('..')
          .getByRole('button', { name: 'view' })
          .click()
      })

      test('it can be liked', async ({ page }) => {
        const dropdown = await page.locator('.blog-dropdown')
        await dropdown.getByRole('button', { name: 'like' }).click()
        await expect(dropdown.getByText('likes 1')).toBeVisible()
      })

      test('it can be deleted', async ({ page }) => {
        await page.on('dialog', dialog => dialog.accept())
        await expect(page.getByText('First blog First author')).toBeVisible()
        await page.getByRole('button', { name: 'remove' }).click()
        await expect(page.getByText('removed First blog')).toBeVisible()
        await expect(page.getByText('First blog First author')).not.toBeVisible()
      })
    })
  })
})
