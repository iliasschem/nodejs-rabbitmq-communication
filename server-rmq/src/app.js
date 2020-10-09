const express = require('express');
const { connect, getChannel } = require('./services/connect');
const bodyParser = require('body-parser');

async function initApp(){
    const app = express();

    const connection = await connect();
    const channel = await getChannel(connection);
    app.get('/', (req, res) => {
        res.send('I am alive!');
    })

    app.use('/graphql', bodyParser.json());

    return {app, channel};
}

module.exports=initApp;
