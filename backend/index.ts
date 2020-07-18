import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

const app: Express = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // Note! This example uses the `req` object to access headers,
        // but the arguments received by `context` vary by integration.
        // This means they will vary for Express, Koa, Lambda, etc.!
        //
        // To find out the correct arguments for a specific integration,
        // see the `context` option in the API reference for `apollo-server`:
        // https://www.apollographql.com/docs/apollo-server/api/apollo-server/
     
        // Get the user token from the headers.
        // const token = req.headers.authorization || '';
        // console.log({token})
        // try to retrieve a user with the token
        // const user = getUser(token);
     
        // add the user to the context
        return { req };
      }
});

server.applyMiddleware({ app });

const { PORT = 8080 } = process.env;

createConnection().then(() => {
    console.log(`Database Connected!!`);
    return app.listen(PORT);
}).then(() => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}).catch(console.error);