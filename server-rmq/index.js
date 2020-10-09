require('dotenv').config({ path: process.env.ENV_FILE })
const initApp = require('./src/app')
const  { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { createServer } =  require('http');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers} = require('./src/schema/schema');
const { makeExecutableSchema } = require('graphql-tools');

const port = 4000

let customChannel= null;

initApp().then(({app, channel}) => {

  customChannel=channel;
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const apolloServer = new ApolloServer({ typeDefs, resolvers});

  apolloServer.applyMiddleware({ app });

  const server = createServer(app);
  server.listen(port, () => {
    new SubscriptionServer({
      execute,
      subscribe,
      schema,
    }, {
      server,
      path: '/subscriptions',
    });

    console.log(`Example app listening at http://localhost:${port}`)
  })
})

module.exports = customChannel;