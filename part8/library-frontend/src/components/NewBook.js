import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'

const NewBook = ({ setError, show }) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])


  const [ createBook ] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      console.log(error)
      setError(error.graphQLErrors[0].message)
    },
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ],
  })

  const submit = async (event) => {
    event.preventDefault()
  
    const publishedNumber = Number(published)

    createBook({ variables: { title:title, author:author, published:publishedNumber, genres:genres } })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(previousGenres => {
      return previousGenres.concat(genre)
    })
    setGenre('')
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook