import React, {useEffect, useState} from 'react'
import { BOOK_ADDED, ALL_BOOKS } from '../queries'

import {
  useSubscription, useQuery
} from '@apollo/client'

const Books = ({ client, show }) => {
  const [genres, setGenres] = useState([])
  const [filter, setFilter] = useState(null)
  const [booksToShow, setBooksToShow] = useState([])

  const books = useQuery(ALL_BOOKS,{
    variables: {genre:filter},
  })

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS, variables: {genre:filter}, })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        variables: {genre:filter},
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const bookAdded = subscriptionData.data.bookAdded
      window.alert(subscriptionData.data.bookAdded.title)
      updateCacheWith(bookAdded)
    }
  })
  
  useEffect(() => {
    if(!books.loading) {
      const allBooks = books.data.allBooks
      let genresSet = new Set()
      allBooks.forEach(book => {
        book.genres.forEach(genre => {
          genresSet.add(genre)
        })
      })
      genresSet.add('all genres')
      setGenres(Array.from(genresSet))
      setBooksToShow(books.data.allBooks)
    }
  }, [books]) // eslint-disable-line

  const chooseFilter = (event) => {
    if(event.target.value === 'all genres'){
      return setFilter(null)
    }
    setFilter(event.target.value)
  }

  if (!show) {
    return null
  }

  if (books.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      <h3>In genre: {filter}</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.map(genre => {
                return <span key={genre}>{genre} </span>
              })}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Select genre</h3>
      <div>{genres.map((genre, index) => {
        return <button key={index} onClick={chooseFilter} value={genre}>{genre}</button>
      })}</div>   
    </div>
  )
}

export default Books