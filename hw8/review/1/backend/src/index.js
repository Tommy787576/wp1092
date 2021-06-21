import { GraphQLServer, PubSub } from 'graphql-yoga';
import mongo from './mongo';
import db from './db';
import Mutation from './resolvers/Mutation';
import Query from './resolvers/Query';
import Subscription from './resolvers/Subscription';


require('dotenv').config()

const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Mutation,
    Query,
    Subscription,
  },
  context: {
    db,
    pubsub,
  },
});

mongo.connect();

server.start({ port: process.env.PORT | 4000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 4000}!`);
});

