const path = require('path');

const express = require('express');

const jwt = require('jsonwebtoken');
const { ApolloServer } = require('apollo-server-express');

const resolvers = require('./resolvers');
const {readFile} = require('./library/file');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

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
    context: ({req}) => {
      const token =  req.headers.token;
      // console.log('|||[-', req.headers, '-]|||');
      if(token){
        return {user: jwt.verify(token, process.env.JWT_SECRET)};
      }
      return null;
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
      /* eslint-disable-next-line */
      console.log(`The server is runung on http://localhost:${PORT}/${schema.graphqlPath}`);
    }
  );
}

startServer();
