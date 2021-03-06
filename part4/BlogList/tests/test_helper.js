const Blog = require('../models/blog')
const User = require('../models/user')

const initalBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 9
  },
  {
    title: 'TDD Harms Arch',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 80,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }
]

const blogWithoutTitleUrl = {
  author: 'Robert C. Martin',
  likes: 10,
}

const blogToBeAdd = {
  title: 'hello world',
  author: 'Rui Zhang',
  url: 'http://www.google.com',
  likes: 2,
}
const blogNoLikes = {
  title: 'hello world',
  author: 'Rui Zhang',
  url: 'http://www.google.com',
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = {
  initalBlogs,
  blogWithoutTitleUrl,
  blogToBeAdd,
  blogNoLikes,
  blogsInDb,
  usersInDb
}