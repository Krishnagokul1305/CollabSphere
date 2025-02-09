const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const passport = require("./Utils/passport.js");

const typeDefs = require("./app/typedefs/index.js");
const resolvers = require("./app/resolvers/index.js");

dotenv.config({ path: "./.env" });

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

async function start() {
  await server.start();

  app.use(
    "/graphql",
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    }),
    cookieParser(),
    passport.initialize(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: ({ req, res }) => {
        return new Promise((resolve) => {
          passport.authenticate("jwt", { session: false }, (err, user) => {
            console.log(user);
            resolve({ req, res, user });
          })(req, res);
        });
      },
    })
  );

  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`🚀 GraphQL server ready at http://localhost:${port}/graphql`);
  });
}

start().catch((error) => console.error(error));
