import React,{ useState }  from 'react'

const Blog = ({ blog, handleBlogLike, loginUserId, handleBlogRemove }) => {
  const [visible, setVisible] = useState(false)
  const [buttonDisable, setButtonDisable] = useState(false)
  const [buttonText, setButtonText] = useState('view')

  const showRemove = loginUserId === blog.user.id

  const toggleVisibility = () => {
    setVisible(!visible)
    visible ? setButtonText('view') : setButtonText('hide')
  }

  const handleLike = () => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 }
    handleBlogLike(blogToUpdate)
    setButtonDisable(true)
  }

  const handleRemove = () => {
    handleBlogRemove(blog)
    setButtonDisable(true)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button className='viewButtonClass' onClick={toggleVisibility}>{buttonText}</button>
      {
        visible ?
          <div>
            <div className='blogDetail'>
              {blog.url}
              <div>likes {blog.likes} <button className='likeClass' onClick={handleLike} disabled={buttonDisable}>like</button></div>
              {blog.user.username}
              <div>
                {showRemove ?
                  <button onClick={handleRemove}>Remove</button>
                  : null}
              </div>
            </div>
          </div>
          : null
      }
    </div>
  )}

export default Blog