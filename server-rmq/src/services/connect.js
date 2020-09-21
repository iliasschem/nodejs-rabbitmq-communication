const env = require("../env");
const amqp = require('amqplib');
const { QUEUE_NAME } = require("../constants");

let channel = null;

async function connect() {
    connection = await amqp.connect(env.rabbitUrl);
    return connection;
}

async function getChannel(connection) {
    if(!channel){
        channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, {
            durable: true
        });
        channel.prefetch(1);
    }
    return channel;
}

module.exports = {
    getChannel,
    connect,
};