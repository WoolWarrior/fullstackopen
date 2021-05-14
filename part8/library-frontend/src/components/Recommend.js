import React, { useEffect, useState } from 'react'
import { USER_INFO,ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Recommend = ({ id, show }) => {
  const [booksToShow, setBooksToShow] = useState([])
  const [filters, setFilters] = useState(null)
  const currentUser = useQuery(USER_INFO, {
    variables: {id: id}
  })
  const books = useQuery(ALL_BOOKS,{
    variables: {genre: filters},
    fetchPolicy: "network-only"
  })
  
  useEffect(()=>{
    if(!books.loading && !currentUser.loading){
      const userFilters = currentUser.data.userInfo.favoriteGenre
      setFilters(userFilters)
      setBooksToShow(books.data.allBooks)
    }
    
  },[books,currentUser])


  if (!show) {
    return null
  }
  if (!currentUser){
    return null
  }
  if (currentUser.loading || books.loading)  {
    return <div>loading...</div>
  } 

  return (
    <div>
      <h2>Recommend</h2>
      {currentUser.data.userInfo
        ? <div>Books in your fav genres 
          <div>{currentUser.data.userInfo.favoriteGenre.map(genre=><div key={genre}>{genre}</div>)}</div>
          </div>
        : <p>No fav genres</p>
      }
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
            <th>
              grenes
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
    </div>
  );
};

export default Recommend;