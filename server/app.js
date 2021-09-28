const express = require("express");
const { ApolloServer } = require("apollo-server-express");

//Load Schema & Resolvers

const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
(async () => {
  await server.start();
  server.applyMiddleware({ app });
})();

app.listen({ port: 4000 }, () => {
  console.log(`Server ready at port 4000${server.graphqlPath}`);
});
