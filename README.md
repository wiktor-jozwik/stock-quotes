<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# nest listening mode
$ nest start --watch
```

## Description

### App

App is connected to Postgre database with TypeORM, configuration is in file ormconfig.json like that:
```json
{
  "type": "postgres",
  "host": "localhost",
  "port": "5432",
  "username": "username",
  "password": "password",
  "database": "databaseName",
  "entities": ["dist/**/*.entity.js"],
  "synchronize": true,
  "logging": true
}
```  

Default path to server: 
```
localhost:3000/quotes
```
### Database
Quote:
  ```ts
  ID: uuid
  Created: Date
  Name: string
  Open: number
  High: number
  Low: number
  Close: number
```

### Available requests
* GET
  * getting quote by ID - after default path insert /{id} i.e.
  ```
  localhost:3000/quotes/c3a88fb3-e997-4269-b0d5-5617f2fdcd91
  ```
  * getting all quotes of company - after default path insert /company/{name} i.e.
  ```
  localhost:3000/quotes/company/IBM
  ```
* POST
  * provide all properties of quote entity(without ID and created date) in body and send to app on default path
* DELETE
  * provide ID of quote which have to be deleted in the same way as getting quote by ID

  
App will be receiving data from some Stock API
 