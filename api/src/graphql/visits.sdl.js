export const schema = gql`
  type Visit {
    id: Int!
    code: String!
    department: String!
    firstName: String!
    lastName: String!
    visitTime: DateTime!
    email: String!
    idCode: String!
    dateOfBirth: DateTime!
    sex: String!
    age: Int!
  }

  type Query {
    visits: [Visit!]!
  }

  input CreateVisitInput {
    code: String!
    department: String!
    firstName: String!
    lastName: String!
    visitTime: DateTime!
    email: String!
    idCode: String!
    dateOfBirth: DateTime!
    sex: String!
    age: Int!
  }

  input UpdateVisitInput {
    code: String
    department: String
    firstName: String
    lastName: String
    visitTime: DateTime
    email: String
    idCode: String
    dateOfBirth: DateTime
    sex: String
    age: Int
  }

  type Mutation {
    createVisit(input: CreateVisitInput!): Visit
    createVisits(input: [CreateVisitInput]!): Visit
  }
`
