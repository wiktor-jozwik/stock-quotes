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
localhost:3000
```
Port variable is stored in .env file

### Database
Quote:
  ```ts
  id: uuid
  companyId: uuid
  date: string
  value: number
```
Company:
  ```ts
  id: uuid
  name: string
  symbol: string(unique)
  ```
  
 ![database structure](https://github.com/wiktor-jozwik/stock-quotes/blob/master/StockQuotes.png?raw=true)


### Available requests
* GET
  * getting quote by ID - after default path insert /quotes/{id}
  ```
  localhost:3000/quotes/c3a88fb3-e997-4269-b0d5-5617f2fdcd91
  ```
  * getting all quotes
  ```
  localhost:3000/quotes
  ```
  * getting company by name, after default path: /companies/{symbol}
  ```
  localhost:3000/companies/AAPL
  ```
  * getting all companies
  ```
  localhost:3000/companies
  ```
* POST
  * post company:
    * provide name and symbol in body and post on default path + /company
  * post quote:
    * provide symbol and name of company, date and value of quote in body and post on default path + /quotes(If company will be created if does not exist)
* PUT
  * provide body with fields to be changed and request on path like that, after default path insert /company/{symbol}
  ```
  localhost:3000/companies/AAPL
  ```

* DELETE
  * delete quote by providing ID of quote which have to be deleted in the same way as getting quote by ID
  * delete company by providing symbol of company which have to be deleted in the same way as getting company by symbol

### GraphQL
```
localhost:3000/graphql
```
* Query for companies
  ```graphql
  {
    companies{
      id
      name
      symbol
      quotes{
        id
        date
        value
      }
    }
  }
  ```
* Query for quotes
  ```graphql
    {
        quotes{
          id
          date
          value
          company{
            ...
          }
        }
    }
    ```

It's possible to ommit some fields and get data which is needed 
