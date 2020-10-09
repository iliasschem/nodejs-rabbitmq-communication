const { getChannel } = require('./connect');
const { EXCHANGE_NAME } = require('../constants');
const callbackToAsyncIterator = require('../utils/callback-to-async-iterator');

async function createConsumer() {
    const channel = await getChannel();
    channel.prefetch(1);

        await channel.assertExchange(EXCHANGE_NAME, 'topic', {
            durable: false
        });

        const q = await channel.assertQueue('', {
        exclusive: true
        })      

        await channel.bindQueue(q.queue, EXCHANGE_NAME, 'key.key');

        return callbackToAsyncIterator(channel, q.queue, {
            noAck: false
        })
}

module.exports = {
    createConsumer,
};
