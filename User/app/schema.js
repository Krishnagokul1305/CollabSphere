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
  getMe:User!
}

type Mutation {
  createUser(input:InputUser!): User!
  deleteUser(id: Int!): Boolean!
  updateUser(id: Int!, name:String): User!
  register(input:InputUser):successUser!,
  login(input:Login):successUser!
  logout:Boolean!
  forgotPassword(email: String!): String!
  resetPassword(email: String!, token: String!, newPassword: String!): String!
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
