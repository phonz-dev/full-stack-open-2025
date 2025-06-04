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
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
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

    describe('when blogs are added', () => {
      let dropdowns
      let items
      beforeEach(async ({ page }) => {
        await createBlog(page, 'First blog', 'First author', 'first.com')
        await createBlog(page, 'Second blog', 'Second author', 'second.com')
        await createBlog(page, 'Third blog', 'Third author', 'third.com')

        dropdowns = await page.locator('.blog-dropdown').all()
        items = await page.locator('.blog-item').all()
        for (const item of items) {
          await item.getByRole('button', { name: 'view' }).click()
        }
      })

      test('it can be liked', async ({ page }) => {
        for (const dropdown of dropdowns) {
          await dropdown.getByRole('button', { name: 'like' }).click()
          await expect(dropdown.getByText('likes 1')).toBeVisible()
        }
      })

      test('it can be deleted', async ({ page }) => {
        await page.on('dialog', dialog => dialog.accept())
        await expect(items[0].getByText('First blog First author')).toBeVisible()
        await items[0].getByRole('button', { name: 'remove' }).click()
        await expect(page.getByText('removed First blog')).toBeVisible()
        await expect(page.getByText('First blog First author')).not.toBeVisible()
      })

      test('only the user who\'s logged in can see the remove button', async ({ page }) => {
        await expect(items[0].getByText('remove')).toBeVisible()
        await page.getByRole('button', { name: 'logout' }).click()
        await loginUser(page, 'mluukkai', 'salainen')
        const user = await page.getByText('Matti Luukkainen logged in')
        await expect(user).toBeVisible()
        await expect(items[0].getByText('remove')).not.toBeVisible()
      })

      test('blogs are arranged in descending order according to the number of likes', async ({ page }) => {
        await items[0].locator('.blog-dropdown').getByRole('button', { name: 'like' }).click()
        await expect(items[0].getByText('First blog First Author')).toBeVisible()
        await items[1].locator('.blog-dropdown').getByRole('button', { name: 'like' }).click()
        await items[1].locator('.blog-dropdown').getByRole('button', { name: 'like' }).click()
        await expect(items[0].getByText('Second blog Second Author')).toBeVisible()
      })
    })
  })
})
