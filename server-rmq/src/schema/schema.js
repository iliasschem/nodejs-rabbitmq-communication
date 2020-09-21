const { buildSchema } = require('graphql');
const send = require('../services/send');
const { getTask } = require('../services/receive');
const updateTask = require('../services/task');

var root = {
    task: async () => {
        const task = await getTask();
        return task;
    },
    addTask: (args) => {
        send(args.value)
        return args.value;
    },
    updateTask:  async (task) => {
        const { id } = task;
        await updateTask(id);
        return true;
    }
};

var schema = buildSchema(`
    type Mutation {
        addTask(value: String): String
        updateTask(value: String, id: String): Boolean
    }
    type Query {
        task(id: String): Task
    }
    type Task {
        id: String
        value: String
    }
`);

module.exports = {
    schema: schema,
    root:root,
};
