import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

describe('<Blog />', () => {
  let component
  let mockHandler

  const blogTest = {
    title: 'Divina Commedia',
    author: 'Dante A.',
    url: 'https://dante.com',
    likes: 25,
    user: {
      username: 'dantea'
    }
  }


  beforeEach(() => {
    mockHandler = jest.fn()
    // pass blogTest and event handler updateBlog
    component = render(<Blog blog={blogTest} updateBlog={mockHandler} />)
  })

  test('5.13 - renders only title and author by default ', () => {
    const titleAndAuthor = component.container.querySelector('.blogNoDetails')
    const blogDetails = component.container.querySelector('.blogDetails')

    expect(titleAndAuthor).toBeVisible()
    expect(blogDetails).toBe(null)
    expect(component.container).toHaveTextContent(
      'Divina Commedia' && 'Dante A.'
    )

    // component.debug()
    // console.log(prettyDOM(button)) // review

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
  test('5.15 - like button calls event handler twice if clicked twice ', () => {
    const likeBtn = component.getByText('Like')

    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})

describe('<Togglable /> ', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="view">
        <div className="testUrl" />
        <div className="testLikes" />
      </Togglable>
    )
  })

  test('5.14 - shows url and likes once it is clicked', () => {
    expect(
      component.container.querySelector('.testUrl')
    ).toBeDefined()
    expect(
      component.container.querySelector('.testLikes')
    ).toBeDefined()
  })
})

// describe('<BlogForm />', () => {
//   test('5.16 - calls the event handler it received as props with the right details ', () => {
//     const createBlog = jest.fn()

//     const component = render(
//       <BlogForm createBlogFunc={createBlog} />
//     )

//     const title = component.container.querySelector('#title')
//     const author = component.container.querySelector('#author')
//     const url = component.container.querySelector('#url')
//     const form = component.container.querySelector('#form')

//     fireEvent.change(
//       title, {
//       target: { value: 'Testing of forms could be easier, they say' }
//     },
//       author, {
//       target: { value: 'Joni or Mluukkai' }
//     },
//       url, {
//       target: { value: 'testing_of_forms.org' }
//     })

//     fireEvent.submit(form)

//     expect(createBlogFunc.mock.calls).toHaveLength(1)
//     // expect(createBlog.mock.calls[0][0].content).toBe('Testing of forms could be easier, they say')

//   })
// })