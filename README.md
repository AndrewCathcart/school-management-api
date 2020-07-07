# school-management-api [![CircleCI](https://circleci.com/gh/AndrewCathcart/school-management-api.svg?style=svg)](https://app.circleci.com/pipelines/github/AndrewCathcart/school-management-api)

## Description

This repo contains the backend code for a school-management app in order to practice;

- [Nest](https://github.com/nestjs/nest)
- GraphQL & MongoDB
- Testing

## Installation

Prerequisites

- [Node](https://nodejs.org/en/) is required. This can be installed via the website or by using [nvm](https://github.com/nvm-sh/nvm) (see their documentation).
- [Docker](https://docs.docker.com/install/) for local development.

Then install dependencies

```bash
$ npm install
```

## Running the app

```bash
# local mongodb
$ docker run --name mongo -p 27017:27017 -d mongo

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
