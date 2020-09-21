#!/usr/bin/env bash

INSTALL=${1}

if [[ $INSTALL = "-i" ]]; then 
    echo 'install'
    ( cd client-rmq && npm install )
    ( cd server-rmq && npm install )
fi

( cd client-rmq && npm run build )
docker-compose -f ./compose/dev.yml build client-rmq server-rmq