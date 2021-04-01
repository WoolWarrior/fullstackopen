const lodash = require('lodash')

const dummy = (blogs) => {
  return blogs
    ? 1
    : 1
}

const totalLikes = (blogs) => {
  const total = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(total, 0)
}

const favoriteBlog = (blogs) => {
  const larger = (prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  }
  return blogs.reduce(larger, {})
}

const mostBlogs = (blogs) => {
  const authorsWithPosts = lodash.countBy(blogs,'author')
  let authorsArr = []

  Object.entries(authorsWithPosts).forEach(authorWithPosts => {
    const author = { author: authorWithPosts[0], blogs: authorWithPosts[1] }
    authorsArr.push(author)
  })

  const larger = (prev, current) => {
    return (prev.post > current.post) ? prev : current
  }
  return authorsArr.reduce(larger, {})
}

const mostLikes = (blogs) => {
  let authorsWithLikes = {}
  blogs.forEach(blog => {
    if(Object.prototype.hasOwnProperty.call(authorsWithLikes,blog.author)){
      authorsWithLikes[blog.author] = authorsWithLikes[blog.author] + blog.likes
    } else {
      authorsWithLikes[blog.author] = blog.likes
    }
  })

  let authorsArr = []

  Object.entries(authorsWithLikes).forEach(authorWithLikes => {
    const author = { author: authorWithLikes[0], likes: authorWithLikes[1] }
    authorsArr.push(author)
  })

  const larger = (prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  }
  return authorsArr.reduce(larger, {})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}