## Overview

The project is a simple implementation of node app with communication with rabbitMq to store tasks.
The client is implemented using react and interact with server (nodejs) using graphql 

## Dependencies

- [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) 
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Setup

To run the project for the first time  (package installation included)

```
./up -i
```

To simply run the project

```
./up
```

## How to use 

to create a new task, go to:
[http://localhost:3000/home](http://localhost:3000/home) 

to consume the task, go to:
[http://localhost:3000/task](http://localhost:3000/task)


## License

[MIT licensed](http://opensource.org/licenses/MIT).
