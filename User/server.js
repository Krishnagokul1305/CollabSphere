const { GraphQLObjectType, GraphQLSchema,GraphQLString } = require('graphql');
const { createHandler } = require('graphql-http/lib/use/express');
const express = require('express');
 
// Construct a schema
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: { type: GraphQLString },
    },
  }),
});
 
// The rootValue provides a resolver function for each API endpoint
const rootValue = {
  hello() {
    return 'Hello world!';
  },
};
 
const app = express();
 
app.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue,
  }),
);
 
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
