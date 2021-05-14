import React from 'react'
import { ALL_AUTHORS } from '../queries'
import { useQuery } from '@apollo/client'
import UpdateAuthorYear from './UpdateAuthorYear'

const Authors = ({ setError, token, show }) => {
  const authors = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }

  if (authors.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {token?
      <UpdateAuthorYear setError = {setError} authors = {authors.data.allAuthors}/>
      :<></>
      }
      
    </div>
  )
}

export default Authors
