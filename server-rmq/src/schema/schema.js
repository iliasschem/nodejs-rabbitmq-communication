const send = require('../services/send');
const { createConsumer } = require('../services/receive');
const updateTask = require('../services/task');
const { gql } = require('apollo-server-express');

var mapTask= new Map();

function getMapTask() {
    return mapTask;
}

const typeDefs = gql`
    type Subscription {
        task: Task
    }
    type Mutation {
        addTask(value: String): String
        updateTask(value: String, id: String): Boolean
    }
    type Query {
        task: Task
    }
    type Task {
        id: String
        value: String
    }
`;

const resolvers = {
    Subscription: {
        task: {
            resolve: async (msg) => {
                const task = JSON.parse(msg.content.toString());
                mapTask.set(task.id, msg);
                return task;
            },
            subscribe: async () => {
                return await createConsumer();
            },
        },

    },
    Mutation: {
        addTask: (parent, args) => {
            send(args.value)
            return args.value;
        },
        updateTask:  async (parent, task) => {
            const { id } = task;
            await updateTask(id);
            return true;
        }
    }
};

module.exports.getMapTask = getMapTask;

module.exports = {
    typeDefs,
    resolvers,
};
