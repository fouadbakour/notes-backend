# Notes app
## _A simple nodeJS backend app_

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
Notes app is a cloud-enabled, mobile-ready, notes taking server.
## Features

- CRUD Category (APIs to create, read, update and delete a category)
- CRUD Notes (APIs to create, read, update and delete a note)
- Search for notes that have a certain tag
- View notes related to a category
- Simple Signup User API with send email to welcome the user
- Simple Login User API


## Tech

Notes backend app uses a number of open source projects to work properly:

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]

## Overview pattern: Micro services with gateway

Notes backend app uses microservices
![](https://miro.medium.com/max/1246/1*9YrINkRZs42c0pVxkGrExw.png)

## Micro services pattern: Clean Architecture

Notes backend app uses clean architecture pattern
![](https://images.ctfassets.net/vsall43tabcn/gyZteBML1XipqwnZTPzRJ/0ad14b0e2271d7797e92791b66689ff3/Clean_Architecture.jpeg)

## Installation

Notes app requires [Node.js](https://nodejs.org/) v16.15.0+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd notes-backend-master
$ npm run setup
$ npm run dev
```

For production deployment, we are using [heroku docker, view details here](https://devcenter.heroku.com/articles/container-registry-and-runtime)

```sh
$ cd notes-backend-master
$ npm run deploy
```

## PORTS

Below are the PORTs being used

```sh
gateway: 8080
users: 1000
categories: 2000
notes: 3000
```
