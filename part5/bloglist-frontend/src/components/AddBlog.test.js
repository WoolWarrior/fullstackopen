import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import AddBlog from './AddBlog'

test('AddBlog Component', () => {
  const component = render(
    <AddBlog/>
  )
  const author = component.container.querySelector('#Author')
  const title = component.container.querySelector('#Title')
  const url = component.container.querySelector('#Url')

  expect(author).toHaveTextContent('Author')
  expect(title).toHaveTextContent('Title')
  expect(url).toHaveTextContent('Url')
})