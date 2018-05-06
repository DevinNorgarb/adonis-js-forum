# Adonis fullstack application

This is the fullstack boilerplate for AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Migrations and seeds

## Setup

Install the adonis cli

```bash
npm i -g adonis-cli
```

Install necessary dependencies

```bash
npm i
```

### Create DB


Create a mysql database and update the .env file values for the database connection

```bash
cp .env.example .env
```


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```


### Development

Run the following command to run dev server.

```js
  adonis serve --dev
```



