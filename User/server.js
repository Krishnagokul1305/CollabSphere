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
const getAuthenticatedUser = require("./Utils/authentication.js");

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
  formatError: (err) => ({
    message: err.message || "An unknown error occurred",
    code: err.extensions?.code || "INTERNAL_SERVER_ERROR",
    status: err.extensions?.http?.status || 500,
  }),
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

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        try {
          const userId = await getAuthenticatedUser(req);
          return { req, res, userId };
        } catch (error) {
          console.log(error);
          return { req, res, userId: null };
        }
      },
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
