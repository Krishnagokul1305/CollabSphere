module.exports = `#graphql
enum Role {
  USER
  ADMIN
}

type User {
  id: Int!
  email: String!
  name: String!
  role: Role!
  createdAt: String!
  updatedAt: String!
}

type Query {
  users: [User!]!
  user(id: Int!): User
  getMe: User!
}

type Mutation {
  createUser(input: InputUser!): User!
  deleteUser(id: Int!): Boolean!
  updateUser(id: Int!, name: String): User!
}

input InputUser {
  email: String!
  password: String!
  name: String!
  role: Role
}
`;
