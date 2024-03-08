# uniplato

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Docker Usage](#docker)
- [Swagger Docs](#documentation)
- [Technologies](#techs)
- [Tests](#tests)
- [Contributing](conti)

## About <a name = "about"></a>

Category CRUD with Authentication system implemented using fastify + typescript and prisma. 

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

You can run the application using Docker Or without docker.


if you aim to run the app without docker you need -mysql installed.

then you should install prisma globally

```
npm i -g prisma
```

configure the .env file:
```
DATABASE_URL="your-mysql-database-url"
JWT_KEY="your-jwt-secret"
```

Build the Project:
```
npm run build
```

Run the App !
```
npm start
```


note: because of the prestart script you don't need to use prisma generate or prisma migrate dev commands.

### Installing

A step by step series of examples that tell you how to get a development env running.

Say what the step will be

The env is already set in docker but if you want to run the application without docker you can set .env file.

```
DATABASE_URL="your-mysql-database-url"
JWT_KEY="your-jwt-secret"
```

But if you want to use the application with docker first install the docker.

Linux:
```
sudo apt install docker-compose
```


## Docker Usage <a name = "docker"></a>

Clone the Project:
```
git clone https://github.com/AbolfazlAslani/uniplato.git
```

Enter the Project:
```
cd uniplato
```

Run and build the Application using docker-compose
```
docker-compose up --build
```

If no problem occured you will see this message at the end:
```
app | Server running on http://localhost:3000 or http://0.0.0.0:3000
```

Now you Can access the App using http://localhost:3000 or http://0.0.0.0:3000

## Swagger Docs <a name = "documentation"></a>

You can access swagger Docs and see the endpoints using:
```
http://localhost:3000/documentation
```


## Tests <a name = "tests"></a>

The Project has spec files for testing and unit-testing the project
i have used mocha for this purpose.

To Run Written Tests:
```
npm test
```


## Techs <a name = "techs"></a>

Technologies and approaches used by me in this code:
1.Implemented Category CRUD System
2.Implemented Authentication System
3.Typescript (Tried To Pay attention to type as much a i can)
4.The Project Is Dockerized Completely
5.Prisma as ORM
6.Developed using fastify
7.Documented the Project using swagger
8.Have written tests using Mocha
9.I have payed attention in commenting
10.prestart script is defined for database seeding.


## Techs <a name = "conti"></a>
I Done this project with ❤️ would love to work with uniplato.
greatly appreciated Abolfazl