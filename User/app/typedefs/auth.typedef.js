module.exports = `#graphql
type Mutation {
  register(input: InputUser!): SuccessUser!
  login(input: Login!): SuccessUser!
  logout: Boolean!
  forgotPassword(email: String!): String!
  resetPassword(email: String!, token: String!, newPassword: String!): String!
}

type SuccessUser {
  success: Boolean!
  user: User
  message: String!
}

input Login {
  email: String!
  password: String!
}
`;
