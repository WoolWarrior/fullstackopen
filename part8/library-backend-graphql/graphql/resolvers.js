const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const Author = require('../models/author')
const Book = require('../models/book')
const User = require('../models/user')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      if (!args.genre){
        const books = await Book.find({}).populate('author')
        return books
      }
      const books = await Book.find({}).populate('author')
      return books.filter(book => book.genres.some(genre => args.genre.includes(genre)))
    },

    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({})
      return authors.map(author => {
        const bookCount = books.filter(book => {
          return book.author.toString() === author.id.toString()
        }).length
        author.bookCount = bookCount
        return author
      })
    },

    userInfo: async(root, args, context) =>{
      if(args.id){
        const id = args.id
        const user = await User.findOne({ _id: id})
        return user
      }
      return null
    },

    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Author: (root) => {
    return {
      name: root.name,
      born: root.born,
      id: root.id
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const authorInDB = await Author.findOne({ name: args.author.name})
      if(authorInDB){
        const book = new Book ({ ...args, author: authorInDB })
        
        try {
          await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      }

      const author = new Author ({ ...args.author })
      const newAuthor = await author.save()
      const book = new Book({ ...args, author: newAuthor })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ _id: args.id})
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
      // const objectId = mongoose.Types.ObjectId(args.id)
      // const filter = { _id: objectId }
      // const updated = { born: args.setBornTo }
      // const opts = {
      //   runVlidators: true,
      //   new: true
      // }
      // const updatedAuthor = await Author.findOneAndUpdate(filter, updated, opts)  
      // return updatedAuthor
    },

    createUser: (root, args) => {
      const user = new User({ ...args })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if ( !user || args.password !== 'secred' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET), id: user._id }
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

module.exports = resolvers