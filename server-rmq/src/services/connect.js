const env = require("../env");
const amqp = require('amqplib');
const { EXCHANGE_NAME } = require("../constants");

let channel = null;

async function connect() {
    connection = await amqp.connect(env.rabbitUrl);
    return connection;
}

async function getChannel(connection) {
    if(!channel){
        channel = await connection.createChannel();
        channel.assertExchange(EXCHANGE_NAME, 'topic', {
            durable: false
          });
        channel.prefetch(1);
    }
    return channel;
}

module.exports = {
    getChannel,
    connect,
};