import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    likes: 5,
    url: 'www.test.com',
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Test title'
  )

  expect(component.container).toHaveTextContent(
    'Test author'
  )

  const div = component.container.querySelector('.togglable')

  expect(div).toHaveStyle('display: none')

})

test('renders url and likes when the view-button has been pressed', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    likes: 5,
    url: 'www.test.com',
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.togglable')

  expect(div).toHaveStyle('')

})

test('when like has been pressed twice, the updateLikes method gets called twice', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    likes: 5,
    url: 'www.test.com',
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} updateLikes={mockHandler}/>
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)

})