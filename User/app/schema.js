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
  sessions: [Session]
}

type Session {
  id: Int!
  userId: Int!
  sessionToken: String!
  expiresAt: String!
  createdAt: String!
  user: User!
}

type Query {
  users: [User!]!
  user(id: Int!): User
  sessions: [Session]
  session(id: Int!): Session
}

type Mutation {
  createUser(input:InputUser!): User!
  deleteUser(id: Int!): Boolean!
  updateUser(id: Int!, name:String): User!
  register(input:InputUser):successUser!,
  login(input:Login):successUser!
}

type successUser{
  success:Boolean!,
  user:User
  message:String!
}

input Login{
  email:String!
  password:String!
}

input InputUser{
  email: String!
  password: String!
  name: String!
  role: Role
}
`;
