import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, handleBlogLike, loginUserId, handleBlogRemove }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          handleBlogLike={handleBlogLike}
          loginUserId={loginUserId}
          handleBlogRemove={handleBlogRemove}/>
      )}
    </div>
  )
}

export default Blogs