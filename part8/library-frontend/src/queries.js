import { gql  } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
      born
    }
    published
    genres
    id
  }
`

export const ALL_BOOKS = gql`
  query GetAllBooks($genre: [String]){
    allBooks(genre: $genre){
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int, $genres: [String!]!) {
    addBook(
      title: $title,
      author: {name: $author},
      published: $published,
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
${BOOK_DETAILS}
`

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
    id
    bookCount
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors{
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const UPDATE_YEAR = gql`
  mutation editAuthor($id: String!, $setBornTo: Int!) {
    editAuthor(
      id: $id,
      setBornTo: $setBornTo
    ) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
      id
    }
  }
`

export const CURRENT_USER = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`

export const USER_INFO = gql`
  query GetUserInfo($id: String){
    userInfo(id: $id) {
      username
      favoriteGenre
      id
    }
  }
`

