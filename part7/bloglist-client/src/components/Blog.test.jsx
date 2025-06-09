import { render, screen } from '@testing-library/react'
import { test, describe, expect, vi, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let blog

  beforeEach(() => {
    blog = {
      title: 'Example Blog',
      author: 'Anonymous',
      url: 'example.com',
      likes: 1400,
      user: {
        name: 'Anonymous Again',
      },
    }
  })

  test('renders blog\'s title and author but not url and likes initially', async () => {
    const { container } = render(<Blog blog={blog} />)

    const element = screen.getByText(`${blog.title} ${blog.author}`)
    expect(element).toBeDefined()

    const dropdown = container.querySelector('.blog-dropdown')
    expect(dropdown).toHaveStyle('display: none')
  })

  test('additional details are shown when the view button is clicked', async () => {
    const { container } = render(<Blog blog={blog} />)

    const button = screen.getByText('view')
    const user = userEvent.setup()
    await user.click(button)

    const dropdown = container.querySelector('.blog-dropdown')
    expect(dropdown).not.toHaveStyle('display: none')

    const url = screen.getByText(blog.url)
    expect(url).toBeDefined()

    const likes = screen.getByText(blog.likes, { exact: false })
    expect(likes).toBeDefined()
  })

  test('when like button is clicked twice, the bound event handler is called twice', async () => {
    const likeBlog = vi.fn()
    render(<Blog blog={blog} onLikeButtonClick={likeBlog} />)

    const likeBtn = screen.getByText('like')
    const user = userEvent.setup()
    await user.click(likeBtn)
    await user.click(likeBtn)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})
