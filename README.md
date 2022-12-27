# MAON MySQL MongoDB ETL

## Overview

- Library:
- Framework: Express
- Deploy: Docker

## Environment

```
# System
NODE_ENV=development
PORT=3000

# Mongodb
MONGO_HOST=mongodb
MONGO_PORT=27017
MONGO_DATABASE=e_commerce_maon
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=123456
COLLATION_LOCALE=en_US

# MySQL
MYSQL_HOST=mysqldb
MYSQL_PORT=3306
MYSQL_DATABASE=e_commerce_maon
MYSQL_ROOT_USER=maon
MYSQL_ROOT_PASSWORD=12345678
```

## Run Dev Server

```
yarn
yarn dev
```

## Run docker compose

```
DOCKER_BUILDKIT=0 docker-compose build
docker compose up -d
```

## Format Code

Using prettier and ES-Lint

```
yarn format
```
