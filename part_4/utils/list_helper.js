const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, current) => (prev.likes > current.likes)
    ? { title: prev.title, author: prev.author, likes: prev.likes }
    : { title: current.title, author: current.author, likes: current.likes }
  )
}

// To be reviewed for efficiency - Lodash suggested on fullstackopen
const mostBlogs = (blogs) => {
  let blogsByAuthor = {}
  for (let i = 0; i < blogs.length; i++) {
    // eslint-disable-next-line no-prototype-builtins
    if (blogsByAuthor.hasOwnProperty(`${blogs[i].author}`)) {
      blogsByAuthor[blogs[i].author] += 1
    } else {
      blogsByAuthor[blogs[i].author] = 1
    }
  }

  let max = 0
  let mostBlogsAuthor = {}
  for (const [key, value] of Object.entries(blogsByAuthor)) {
    if (value > max) {
      max = value
      mostBlogsAuthor['author'] = key
      mostBlogsAuthor['blogs'] = value
    }
  }
  return mostBlogsAuthor
}

// To be reviewed as above
const mostLikes = (blogs) => {
  let likesByAuthor = {}
  for (let i = 0; i < blogs.length; i++) {
    // eslint-disable-next-line no-prototype-builtins
    if (likesByAuthor.hasOwnProperty(`${blogs[i].author}`)) {
      likesByAuthor[blogs[i].author] += blogs[i].likes
    } else {
      likesByAuthor[blogs[i].author] = blogs[i].likes
    }
  }

  let max = 0
  let mostLikesAuthor = {}
  for (const [key, value] of Object.entries(likesByAuthor)) {
    if (value > max) {
      max = value
      mostLikesAuthor['author'] = key
      mostLikesAuthor['likes'] = value
    }
  }
  return mostLikesAuthor
}

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const listWithManyBlogs = [
  { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 },
  { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 },
  { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 },
  { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 },
  { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 },
  { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
]

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes, listWithManyBlogs, listWithOneBlog
}

