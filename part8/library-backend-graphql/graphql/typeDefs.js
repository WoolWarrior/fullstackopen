const { ApolloServer, UserInputError, gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: [String]
    id: ID!
  }

  type Token {
    value: String!
    id: String!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  input AuthorInput {
    name: String!
    born: Int
  }

  type Book {
    title: String!
    published: Int
    author: Author!
    id: ID!
    genres: [String]
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: [String]):[Book!]!
    allAuthors:[Author!]!
    userInfo(id: String): User
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int
      author: AuthorInput
      genres: [String]
    ): Book
    editAuthor(
      id: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: [String]
    ): User
    login(
      username: String!
      password: String
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

module.exports = typeDefs;