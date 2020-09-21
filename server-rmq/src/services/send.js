
const { v4 } = require('uuid');
const {getChannel} = require('./connect');
const { QUEUE_NAME } = require('../constants');

async function send(task){
    try {
        var queue = QUEUE_NAME;
        const channel = await getChannel();
        return channel.sendToQueue(queue, Buffer.from(JSON.stringify({value: task, id: v4()})), {
            persistent: true
          });
    } catch (e){
        console.error(e);
    }
    
}

module.exports = send;