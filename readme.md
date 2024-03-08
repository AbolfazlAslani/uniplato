# uniplato

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Swagger Docs](#documentation)
- [Contributing](../CONTRIBUTING.md)

## About <a name = "about"></a>

Category CRUD with Authentication system implemented using fastify + typescript and prisma. 

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

You can run the application using Docker.



### Installing

A step by step series of examples that tell you how to get a development env running.

Say what the step will be

The evn is already set in docker but if you want to run the application without docker you can set .env file.

```
DATABASE_URL="your-mysql-database-url"
JWT_KEY="your-jwt-secret"

```

But if you want to use the application with docker first install the docker.

Linux:
```
sudo apt install docker-compose
```


## Usage <a name = "usage"></a>

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

You can access swagger Docs and Routes using:
```
http://localhost:3000/documentation
```
