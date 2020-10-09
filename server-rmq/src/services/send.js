
const { v4 } = require('uuid');
const {getChannel} = require('./connect');
const { QUEUE_NAME, EXCHANGE_NAME } = require('../constants');

async function send(task){
    try {
        var queue = QUEUE_NAME;
        const channel = await getChannel();
        return channel.publish(EXCHANGE_NAME, 'key.key', Buffer.from(JSON.stringify({value: task, id: v4()})));
    } catch (e){
        console.error(e);
    }
    
}

module.exports = send;