import React, { useState } from 'react'

const AddBlog = ({ handleAddBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleAddBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div id='Title'>
          Title:
          <input id={'TitleInput'} value={newTitle} onChange={({ target }) => setNewTitle(target.value)}>
          </input>
        </div>
        <div id='Author'>
          Author:
          <input id={'AuthorInput'} value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)}>
          </input>
        </div>
        <div id='Url'>
          Url:
          <input id={'UrlInput'} value={newUrl} onChange={({ target }) => setNewUrl(target.value)}>
          </input>
        </div>
        <div>
          <button id="add-blog-button" type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default AddBlog