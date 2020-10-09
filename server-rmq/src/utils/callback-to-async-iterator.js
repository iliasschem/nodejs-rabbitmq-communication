// @flow
// Turn a callback-based listener into an async iterator
// Based on https://github.com/apollographql/graphql-subscriptions/blob/master/src/event-emitter-to-async-iterator.ts

// source: https://github.com/withspectrum/callback-to-async-iterator/blob/master/src/index.js

const { $$asyncIterator } = require('iterall');

const defaultOnError = (err) => {
  throw new Error(err);
};

var pullQueue = [];
var pushQueue = [];

function callbackToAsyncIterator(
  listener,
  queue,
  config,
  options = {}
) {
  const { onError = defaultOnError, buffering = true, onClose } = options;
  try {
   
    let listening = true;
    let listenerReturnValue;

    // Start listener
    listener.consume(queue, (msg) => {
        listenerReturnValue = msg;
        return pushValue(msg);
    }, config)
    .then(a => {
        // listenerReturnValue = a;
    })
    .catch(err => {
        onError(err);
    });

    function pushValue(value) {
      if (pullQueue.length !== 0) {
        pullQueue.shift()({ value, done: false });
      } else if (buffering === true) {
        pushQueue.push(value);
      }
    }

    function pullValue() {
      return new Promise(resolve => {
        if (pushQueue.length !== 0) {
          resolve({ value: pushQueue.shift(), done: false });
        } else {
          pullQueue.push(resolve);
        }
      });
    }

    function emptyQueue() {
      if (listening) {
        listening = false;
        pullQueue.forEach(resolve => resolve({ value: undefined, done: true }));
        pullQueue = [];
        pushQueue = [];
        onClose && onClose(listenerReturnValue);
      }
    }

    return {
      next() {
        return listening ? pullValue() : this.return();
      },
      return() {
        emptyQueue();
        return Promise.resolve({ value: undefined, done: true });
      },
      throw(error) {
        emptyQueue();
        onError(error);
        return Promise.reject(error);
      },
      [$$asyncIterator]() {
        return this;
      },
    };
  } catch (err) {
    onError(err);
    return {
      next() {
        return Promise.reject(err);
      },
      return() {
        return Promise.reject(err);
      },
      throw(error) {
        return Promise.reject(error);
      },
      [$$asyncIterator]() {
        return this;
      },
    };
  }
}

module.exports = callbackToAsyncIterator;