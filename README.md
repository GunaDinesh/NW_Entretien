# Joule interview

This repository aims to emulate a blog post application. It is imperfect on purpose, we'd like your comments on it !<br/>
Please see the exercise as if you joined a team that created this repository, which is now used like this in production. What would you do with it ?<br/>
<br/>
We would advise spending between 60 and 120 minutes on this exercise, and try answering the following questions:<br/>
-What good practices do you see that you would reuse on other NestJS projects ?<br/>
-What would you refactor in the code to improve its **quality** ?<br/>
-What would you bring to improve the **CI/CD** (in order to reduce the number of bugs in prod) ?<br/>
-What would you do to improve the **DevX** ?<br/>
-What would you do to improve the **security** of the application ?<br/>
-If you had to add a Commenting feature on articles, how would you do it ? (Do not hesitate to write code !)<br/>

# Installation & setup

```shell
npm install
```

## Prisma & DB

### databse

To start the database, you can use docker

```shell
docker compose up database
```

### migrations

Apply migrations to the database with the following command

```shell
npm run migrate
```

### seed

You can then populate the database with the seeds we created !

```shell
npm run seed
```

# Running the app

Once you have setup the database and applied the migrations

```shell
npm run start
```

# Login

To login on the app in the dev environment you can call the login endpoint with the credentials found in the `prisma/seed.ts` file,
and then use the `accessToken` provided as a Bearer Token. With swagger you can use this token to login.

# Test

```shell
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

# Prisma

### Generate new migrations

When changing the data model you should run the following command to generate and apply the associated migration

```shell
npm run migrate -- --name "<NAME>"
```

# GitFlow

The `main` branch is protected. A Merge request has to be approved before it is merged into main. It is then automatically deployed with our CI/CD.
We build the image of the application on a registry. From there, a Portainer service receives a notification and deploys the new version of the image.

# Docker

```shell
docker compose up
```

# Drone

We use drone for our CI/CD. We have two pipelines, one running at every new commit on a `pull_request`, and one whenever there is a push on `dev` or `main` branch
