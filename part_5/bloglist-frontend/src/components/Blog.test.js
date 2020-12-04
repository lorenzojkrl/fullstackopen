import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('Blog Component ', () => {
  const blog = {
    title: 'Divina Commedia',
    author: 'Dante A.',
    url: 'https://dante.com',
    likes: 25,
    user: {
      username: 'dantea'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  test('renders only title and author by default', () => {
    const titleAndAuthor = component.container.querySelector('.blogNoDetails')
    const blogDetails = component.container.querySelector('.blogDetails')

    expect(titleAndAuthor).toBeVisible()
    expect(blogDetails).toBe(null)
    expect(component.container).toHaveTextContent(
      'Divina Commedia' && 'Dante A.'
    )

    // component.debug()
    // console.log(prettyDOM(button))

    // method 1
    // expect(component.container).toHaveTextContent(
    //   'Component testing is done with react-testing-library'
    // )

    // method 2
    // const element = component.getByText(
    //   '25'
    // )
    // expect(element).toBeDefined()

    // method 3
    // const div = component.container.querySelector('.note')
    // expect(div).toHaveTextContent(
    //   'Component testing is done with react-testing-library'
    // )

  })

})
