export const schema = gql`
  type User {
    id: Int!
    email: String!
    password: String!
    refreshToken: String
    createdAt: DateTime!
    userRoles: [UserRole]!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User
  }

  input CreateUserInput {
    email: String!
    password: String!
    refreshToken: String
  }

  input UpdateUserInput {
    email: String
    password: String
    refreshToken: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: Int!, input: UpdateUserInput!): User!
    deleteUser(id: Int!): User!
  }
`
