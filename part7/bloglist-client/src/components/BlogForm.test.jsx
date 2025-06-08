import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls the sumbit handler once with the right details', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const createButton = screen.getByText('create')
    const titleInput = screen.getByPlaceholderText('blog title')
    const authorInput = screen.getByPlaceholderText('author of blog')
    const urlInput = screen.getByPlaceholderText('blog url')

    await user.type(titleInput, 'sample blog')
    await user.type(authorInput, 'sample author')
    await user.type(urlInput, 'example.com')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('sample blog')
  })
})
