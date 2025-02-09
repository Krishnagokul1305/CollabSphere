const graphqlTools = require("@graphql-tools/merge");

const user = require("./user.typedef");
const auth = require("./auth.typedef");

module.exports = graphqlTools.mergeTypeDefs([user, auth]);
