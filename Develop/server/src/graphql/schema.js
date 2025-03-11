import { gql } from "apollo-server-express";

// Define your type definitions
export const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]!
  }

  type Book {
    bookId: ID!
    authors: [String]!
    description: String!
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    getBooks: [Book]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookId: ID!, authors: [String]!, description: String!, title: String!, image: String, link: String): User
    removeBook(bookId: ID!): User
  }
`;

// Define your resolvers
export const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      return context.user; 
    },
    getBooks: async () => {
      return [];
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      return { token: "exampleToken", user: {} }; 
    },
    addUser: async (parent, { username, email, password }) => {
      return { token: "exampleToken", user: {} }; 
    },
    saveBook: async (parent, { bookId, authors, description, title, image, link }, context) => {
      return context.user; 
    },
    removeBook: async (parent, { bookId }, context) => {
      return context.user; // Return updated user
    },
  },
};
};
