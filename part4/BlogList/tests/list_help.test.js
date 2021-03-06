const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

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

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })

  test('when list has no blog, equals 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
})

describe('fav blog', () => {
  const favBlog =   {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }

  test('when list has many blog, return the one with most fav', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(favBlog)
  })

  test('when list has one blog, return the one', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('when list has no blog, return {}', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })
})

describe('mostBlogs', () => {
  const expected = { author: 'Robert C. Martin', blogs: 3 }

  test('when list has many blogs, return the author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(expected)
  })

  const expected2 = { author: 'Edsger W. Dijkstra', blogs: 1 }
  test('when list has one blog, return the author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(expected2)
  })

  test('when list has no blog, return {}', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })
})

describe('mostLikes', () => {
  const expected = { author: 'Edsger W. Dijkstra', likes: 17 }

  test('when list has many blogs, return the author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(expected)
  })

  const expected2 = { author: 'Edsger W. Dijkstra', likes:5 }
  test('when list has one blog, return the author with most likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(expected2)
  })

  test('when list has no blog, return {}', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })
})