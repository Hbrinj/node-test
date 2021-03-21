#!/bin/bash

docker-compose down
docker-compose rm -f
docker volume rm node-test_pgdata