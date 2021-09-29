const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

//Load Schema & Resolvers

const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");

//Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://hieuls369:1234@demo-graphql.z08qm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

//Load DB Method
const mongoDataMethods = require("./data/db");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ mongoDataMethods }),
});

const app = express();
(async () => {
  await server.start();
  server.applyMiddleware({ app });
})();

app.listen({ port: 4000 }, () => {
  console.log(`Server ready at port 4000${server.graphqlPath}`);
});
