export const schema = gql`
  type UserRole {
    id: Int!
    name: String!
    createdAt: DateTime!
    user: User
    userId: Int
  }

  type Query {
    userRoles: [UserRole!]!
  }

  input CreateUserRoleInput {
    name: String!
    userId: Int
  }

  input UpdateUserRoleInput {
    name: String
    userId: Int
  }

  type Mutation {
    createUserRole(input: CreateUserRoleInput!): UserRole!
    deleteUserUserRoles(userId: Int!): UserRole!
  }
`
