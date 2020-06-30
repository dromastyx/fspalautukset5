import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import BlogForm from './BlogForm'

test('BlogForm calls the createBlog method with right data', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const title = component.container.querySelector('#title')

  author.value = 'Test author'
  url.value = 'www.test.com'
  title.value = 'Test title'

  const button = component.getByText('create')
  fireEvent.click(button)

  expect(createBlog.mock.calls.length).toBe(1)

  expect(author.value).toBe('Test author')
  expect(title.value).toBe('Test title')
  expect(url.value).toBe('www.test.com')

})