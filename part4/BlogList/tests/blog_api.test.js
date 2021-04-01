const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('./test_helper')

describe('when there are some blogs in db', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initalBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }

    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

  })

  test('api: blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('api: there are 6 blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initalBlogs.length)
  })

  test('api: a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain('React patterns')
  })

  test('api: unique identity of blogs is id', async () => {
    const response = await api.get('/api/blogs')

    const ids = response.body.map(r => r.id)
    expect(ids).toBeDefined()
  })

  test('api: a blog is posted to database', async () => {
    const correctUser = {
      username: 'root',
      password: 'sekret'
    }

    const result = await api
      .post('/api/login')
      .send(correctUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const jwt = result.body.token

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${jwt}`)
      .send(helper.blogToBeAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initalBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'hello world'
    )
  })

  test('api: a blog without likes property is posted to database', async () => {
    const correctUser = {
      username: 'root',
      password: 'sekret'
    }

    const result = await api
      .post('/api/login')
      .send(correctUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const jwt = result.body.token

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${jwt}`)
      .send(helper.blogNoLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initalBlogs.length + 1)

    const likesMap = blogsAtEnd.map(n => n.likes)
    expect(likesMap).toContain(0)
  })

  test('api: a blog without title and url is posted to database', async () => {
    const correctUser = {
      username: 'root',
      password: 'sekret'
    }

    const result = await api
      .post('/api/login')
      .send(correctUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const jwt = result.body.token

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${jwt}`)
      .send(helper.blogWithoutTitleUrl)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initalBlogs.length )
  })

  test('api: delete a blog exists', async () => {
    const correctUser = {
      username: 'root',
      password: 'sekret'
    }

    const loginResult = await api
      .post('/api/login')
      .send(correctUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const jwt = loginResult.body.token

    const blogsAtStart = await helper.blogsInDb()

    const postResult = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${jwt}`)
      .send(helper.blogNoLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    console.log(postResult.body)

    const blogsAtMiddle = await helper.blogsInDb()
    expect(blogsAtMiddle).toHaveLength(blogsAtStart.length + 1)
    const idToDelete = postResult.body.id

    await api
      .delete(`/api/blogs/${idToDelete}`)
      .set('Authorization', `bearer ${jwt}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })

  test('api: update a blog\'s like', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes++

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toEqual(blogToUpdate.likes)
  })

  test('api: update a blog not exists', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes++
    blogToUpdate.id = '60644c52d09ced7f1f47ee64'

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(404)
  })

})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('api user: creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('api user: creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('api user: creation fails with proper statuscode and message if username length is less than 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'us',
      name: 'username is less than 3',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('is shorter than the minimum')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('api user: creation fails with proper statuscode and message if password length is less than 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'user',
      name: 'password is less than 3',
      password: '2',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(403)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password too short error')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('api user: login with correct credential', async () => {
    const correctUser = {
      username: 'root',
      password: 'sekret'
    }

    const result = await api
      .post('/api/login')
      .send(correctUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body.username).toEqual('root')
  })

  test('api user: login with incorrect credential', async () => {
    const incorrectUser = {
      username: 'root',
      password: 'wrong'
    }

    await api
      .post('/api/login')
      .send(incorrectUser)
      .expect(401)
  })

  test('api user: login with missing credential', async () => {
    const missingUser1 = {
      username: 'root'
    }

    const missingUser2 = {
      password: 'wrong'
    }

    await api
      .post('/api/login')
      .send(missingUser1)
      .expect(403)

    await api
      .post('/api/login')
      .send(missingUser2)
      .expect(403)
  })

})

afterAll(() => {
  mongoose.connection.close()
})