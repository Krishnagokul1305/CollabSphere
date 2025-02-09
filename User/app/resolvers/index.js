const graphqlTools = require("@graphql-tools/merge");

const user = require("./user.resolver");
const auth = require("./auth.resolver");

module.exports = graphqlTools.mergeResolvers([user, auth]);
