import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog>', () => {
  let component
  const mockHandler = jest.fn()

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'John',
    url: 'https://www.thisisurl.com',
    likes: 16,
    user: {
      username: 'root'
    }
  }

  const userLocalStorage = {
    name: 'root',
    username: 'root'
  }

  window.localStorage.setItem('loggedUser', JSON.stringify(userLocalStorage))

  // mock function will mock the like functionality onClick={updateBlog}
  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateBlog={mockHandler} />
    )
  })

  test('only renders blog\'s title and author', () => {
    const onlyTitleAndAuthor = component.container.querySelector('.noDetails')
    const details = component.container.querySelector('.details')

    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library by John'
    )
    expect(onlyTitleAndAuthor).toBeVisible()
    expect(details).not.toBeVisible()
  })

  test('renders url & likes onClick', () => {
    const button = component.getByText('View')
    const details = component.container.querySelector('.details')
    fireEvent.click(button)

    expect(details).toBeVisible()
  })

  test('if the like button is clicked twice, the event handler is called twice', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    const likeButton = component.getByText('like')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
