import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import UserBanner from './components/UserBanner'
import AddBlog from './components/AddBlog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [ message, setMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect( () => {
    fetchBlogs()
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const userObject = JSON.parse(loggedUserJSON)
      setUser(userObject)
      console.log(userObject)
      blogService.setToken(userObject.token)
    }
  }, [])

  const notifyWith = (message, type = 'success') => {
    setMessage({ message, type })
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const handleLogin = async (userToLogin) => {
    try {
      const user = await loginService.login(userToLogin)

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      notifyWith(`${user.username} is logged in`)
    } catch (error) {
      notifyWith(error.response.data.error, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    window.location.href = '/'
    notifyWith(`${user.username} is logged out`)
  }

  const handleAddBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedObject = await blogService.create(blogObject)
      fetchBlogs()
      notifyWith(`${returnedObject.title} is added`)
    } catch (error) {
      notifyWith(error.response.data.error, 'error')
    }
  }

  const handleBlogLike = async (blogToLike) => {
    try {
      const returnedObject = await blogService.update(blogToLike)
      notifyWith(`like is ${returnedObject.likes} now`)

      fetchBlogs()
    } catch (error) {
      notifyWith(error.response.data.error, 'error')
    }
  }

  const handleBlogRemove = async (blogToRemove) => {
    const confirmMessage = `Delete ${blogToRemove.title}?`
    if (window.confirm(confirmMessage)) {
      try {
        await blogService.deleteBlog(blogToRemove)
        notifyWith(`${blogToRemove.title} is removed`)

        fetchBlogs()
      } catch (error) {
        notifyWith(error.response.data.error, 'error')
      }
    }
  }

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => {
      return b.likes - a.likes
    })
    console.log(blogs)
    setBlogs( blogs )
  }

  return (
    <div>
      <Notification message={message} />
      {user === null
        ?
        <LoginForm
          handleLogin={handleLogin}/>
        : <div>
          <UserBanner
            user={user}
            handleLogout={handleLogout}/>
          <Togglable buttonLabel='Add new blog' ref={blogFormRef}>
            <AddBlog
              handleAddBlog={handleAddBlog}/>
          </Togglable>
          <Blogs blogs={blogs} handleBlogLike={handleBlogLike} loginUserId={user.id} handleBlogRemove={handleBlogRemove}/>
        </div>
      }
    </div>
  )
}

export default App