import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import Notify from './components/Notify'

import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    setUserId(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    setToken(localStorage.getItem('lib-user-token'))
    setUserId(localStorage.getItem('lib-user-id'))
    setPage('authors')
  }, [token]) // eslint-disable-line

  return (
    <div>
       <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token 
          ? 
          <span>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </span> 
          :
          <button onClick={() => setPage('login')}>login</button>
        }
        
      </div>

      <Authors
        setError={notify}
        token={token}
        show={page === 'authors'}
      />

      <Books
        client={client}
        show={page === 'books'}
      />

      <NewBook
        setError={notify}
        show={page === 'add'}
      />

      <Recommend
        id={userId}
        show={page === 'recommend'}
      />

      <LoginForm
        setError={notify}
        setToken={setToken}
        setUserId={setUserId}
        show={page === 'login'}
      />

    </div>
  )
}

export default App