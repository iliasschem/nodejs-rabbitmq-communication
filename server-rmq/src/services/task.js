const {getChannel} = require('./connect');
const schema = require('../schema/schema');

async function updateTask ( id ){
    try {
        let mapTask = schema.getMapTask();
        let msg = mapTask.get(id);
        if(msg) {
            const channel = await getChannel();
            channel.ack(msg);
        }
    } catch (e) {
        console.error(e);
    }
}

module.exports = updateTask;
