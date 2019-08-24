# graphql-jwt-express-apollo-mongodb-example
Worked (2019/08) example "Express" server with GraphQL and JWT

## Requirements

- Nodejs ^10
- Mongodb server DB


## How to start
- $ git clone [https://github.com/Silksofthesoul/graphql-jwt-express-apollo-mongodb-example.git](https://github.com/Silksofthesoul/graphql-jwt-express-apollo-mongodb-example.git)

- $ cd graphql-jwt-express-apollo-mongodb-example && npm install

- $ npm start

- $ open [http://localhost:3000/graphql](http://localhost:3000/graphql) in your browser


## Whats next?

- On the page [http://localhost:3000/graphql](http://localhost:3000/graphql)
- type some GraphQl:
  ```graphql

    query me {
      me {
        id
        username
        email
      }
    }
    mutation signup {
      signup(username: "test", email: "aa@bb.cc", password: "test")
    }
    mutation signup2 {
      signup(username: "test2", email: "cc@dd.ff", password: "test2")
    }
    mutation login {
      login(email: "aa@bb.cc", password: "test")
    }
  ```
- run *mutation* "signup"
- run *mutation* "login" and copy getted token
- in *HTTP headers* put this:
  ```JSON
  {
    "token": "YOU-TOKEN-HERE-PAST-PAST-PAST-FAST-PAST-PAST-PAST-HERE"
  }
  ```
- run *query* "me"
- you must see id, username and email

Useful links:

- [Handling authentication in GraphQL – Part 2: JWT](https://blog.pusher.com/handling-authentication-in-graphql-jwt/)
- [npm jsonwebtoken docs](https://www.npmjs.com/package/jsonwebtoken)
- [Authentication. How to authorize users and control permissions in your GraphQL API (Apollo Server)](https://www.apollographql.com/docs/apollo-server/features/authentication/)
- [Express / Connect. Setting up Apollo Server with Express.js or Connect](https://www.apollographql.com/docs/apollo-server/v1/servers/express/)
- [Apollo-Server-Express 1.0 to 2.0: Fix 'graphiqlExpress and graphqlExpress is not a function'](https://dev.to/gloriamaris/apollo-server-express-10-to-20-fix-graphiqlexpress-and-graphiqlexpress-is-not-a-function-in-a-tutorial-by-xoor-41jn)
- [GraphQL Server Tutorial with Apollo Server and Express](https://www.robinwieruch.de/graphql-apollo-server-tutorial/)
