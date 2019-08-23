const path = require('path');

const express = require('express');
// const bodyParser = require('body-parser');

// const jwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const { ApolloServer } = require('apollo-server-express');

const resolvers = require('./resolvers');
const {readFile} = require('./library/file');

require('dotenv').config();

const app = express();
/* eslint-disable no-undef */
const PORT = process.env.PORT;

// const auth = jwt({
//   secret: process.env.JWT_SECRET,
//   credentialsRequired: false
// });

const startServer = async () => {
  const typeDefs = await readFile(
    path.join(
      __dirname,
      'data/schema.graphql'
    )
  );
  const schema = new ApolloServer({
    typeDefs,
    resolvers,
    // auth,
    context: ({req}) => {
      const token =  req.headers.token;
      return {user: jwt.verify(token, process.env.JWT_SECRET)};
    },
    playground: {
      endpoint: '/graphql',
        settings: {
          'editor.theme': 'light'
        }
      }
    });

  schema.applyMiddleware({app});

  app.get('/',(req, res) => {
    res.send('hello')
  });

  app.listen(
    PORT,
    () => {
      console.log(`The server is runung on http://localhost:${PORT}/api`);
    }
  );
}

startServer();
