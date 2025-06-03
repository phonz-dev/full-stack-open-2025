import { render, screen } from '@testing-library/react'
import { test, describe, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders blog\'s title and author but not url and likes initially', async () => {
    const blog = {
      title: 'Example Blog',
      author: 'Anonymous',
      url: 'example.com',
      likes: 1400,
      user: {
        name: 'Anonymous Again'
      }
    }

    const { container } = render(<Blog blog={blog} />)

    const element = screen.getByText(`${blog.title} ${blog.author}`)
    expect(element).toBeDefined()

    const dropdown = container.querySelector('.blog-dropdown')
    expect(dropdown).toHaveStyle('display: none')
  })
})
