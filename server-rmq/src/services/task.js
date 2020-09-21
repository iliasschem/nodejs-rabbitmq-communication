const {getChannel} = require('./connect');
const {getMapTask, setTask, getTask} = require('./receive')

async function updateTask ( id ){
    try {
        let mapTask = getMapTask();
        let msg = mapTask.get(id);
        if(msg) {
            setTask(null);
            const channel = await getChannel();
            channel.ack(msg);
        }
    } catch (e) {
        console.error(e);
    }
}


module.exports = updateTask;