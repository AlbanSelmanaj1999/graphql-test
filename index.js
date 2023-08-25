const { ApolloServer } = require("apollo-server-express");
const express = require('express');
const {resolvers}=require('./resolver.js');
const {typeDefs}=require('./typeDefs.js');
const mongoose=require('mongoose');
const app = express();
const port = 4200;
require('dotenv').config();
const cookieParser=require('cookie-parser');
mongoose.connect('mongodb://localhost:27017/grahql-test');
app.use(cookieParser());
const server = new ApolloServer({typeDefs,resolvers,context:({req,res})=>({req,res})});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port }, () => {
    console.log(`Server is running on http://localhost:${port}/graphql`);
  });
}
startServer();
