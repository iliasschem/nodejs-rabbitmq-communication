const { getChannel } = require('./connect');
const { QUEUE_NAME } = require('../constants');


var task= null;
var mapTask= new Map();

let costumer = null;

async function createConsumer() {
    const channel = await getChannel();
    channel.prefetch(1);
    if(!costumer){
        costumer = await channel.consume(QUEUE_NAME, function(msg) {
            task = JSON.parse(msg.content.toString());
            mapTask.set(task.id, msg);
        }, {
            noAck: false
        }); 
    }
}

function getMapTask(){
    return mapTask;
}

async function getTask(){
    try {
        await createConsumer();
        return task;
    } catch (e){
        console.error('error :', e);
    }
}

function setTask(newTask){
    task = newTask;
}

module.exports = {
    getMapTask,
    getTask,
    setTask,
};
