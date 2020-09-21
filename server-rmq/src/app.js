const express = require('express')
const {graphqlHTTP} = require('express-graphql');
const {schema, root} = require('./schema/schema');
const { connect, getChannel } = require('./services/connect')

async function initApp(){
    const app = express()

    const connection = await connect();
    const channel = await getChannel(connection);
    app.get('/', (req, res) => {
        res.send('I am alive!')
    })
  
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    }));
  
    return {app, channel};
}


module.exports=initApp;
