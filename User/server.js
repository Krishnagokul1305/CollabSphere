let { ApolloServer } = require("@apollo/server");
let { expressMiddleware } = require("@apollo/server/express4");
let typeDefs = require("./app/schema.js");
let cookieParser = require("cookie-parser");
let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
let dotenv = require("dotenv");

let Query = require("./app/Query.js");
let Mutation = require("./app/Mutation.js");

dotenv.config({
  path: "./.env",
});

// Create the Apollo Server
let server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
});

// Start the Apollo Server
async function startServer() {
  await server.start();

  // Set up Express app
  const app = express();

  // Middleware
  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParser.json());

  // ✅ Fix: Pass `req` and `res` explicitly to the context
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );

  app.listen(4000, () => {
    console.log(`🚀 GraphQL server ready at http://localhost:4000/graphql`);
  });
}

// Run the server
startServer()
  .then(() => {
    console.log("Server started");
  })
  .catch((error) => {
    console.log(error);
  });
