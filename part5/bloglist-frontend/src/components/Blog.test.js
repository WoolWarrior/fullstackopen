import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
  const loginUserId = '6065c7e072345534e5342d88'
  const blog = {
    id: '6065e05fbd57f644602469ba',
    author: 'testing author',
    likes: 3,
    title: 'Component testing',
    url: 'www.test.com',
    user: {
      id: loginUserId,
      name: 'tester name',
      username: 'tester'
    }
  }

  const component = render(
    <Blog blog={blog} loginUserId={loginUserId}/>
  )

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing'
  )
  expect(div).toHaveTextContent(
    'testing author'
  )
})

test('renders likes and url after click view button ', () => {
  const loginUserId = '6065c7e072345534e5342d88'
  const blog = {
    id: '6065e05fbd57f644602469ba',
    author: 'testing author',
    likes: 3,
    title: 'Component testing',
    url: 'www.test.com',
    user: {
      id: loginUserId,
      name: 'tester name',
      username: 'tester'
    }
  }

  const component = render(
    <Blog blog={blog} loginUserId={loginUserId}/>
  )
  const div = component.container.querySelector('.blog')

  expect(div).not.toHaveTextContent('www.test.com')
  expect(div).not.toHaveTextContent('3')

  const button = component.getByText('view')

  fireEvent.click(button)
  expect(div).toHaveTextContent('www.test.com')
  expect(div).toHaveTextContent('3')

})

test('click like button', () => {
  const loginUserId = '6065c7e072345534e5342d88'
  const blog = {
    id: '6065e05fbd57f644602469ba',
    author: 'testing author',
    likes: 3,
    title: 'Component testing',
    url: 'www.test.com',
    user: {
      id: loginUserId,
      name: 'tester name',
      username: 'tester'
    }
  }
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} loginUserId={loginUserId} handleBlogLike={mockHandler}/>
  )

  const buttonView = component.getByText('view')
  fireEvent.click(buttonView)
  const buttonLike = component.getByText('like')
  fireEvent.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(1)
})