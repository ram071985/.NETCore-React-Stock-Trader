# Tradetopia

A FinTech application for buying and selling stocks with fake money. It uses the IEX Cloud api to retrieve live stock trading data. Check out [IEX Cloud API](https://iexcloud.io/docs/api/)

## Summary

This web app is a fun and easy way to practice trading stocks from live companies. I'm interested in personal finance and building this was a great way to channel that into making a tool for investing. 

Tradetopia uses React.js for client-side operations and a back-end written in C# on the .NET Core framework. Javascript and C# together are a wonderful match because of .NET Core's integration with React and it's comfortable dev environment. All user information is saved to a PostgreSQL database that holds account balances, session, transactions and stock data. I use the ORM NHibernate to map the database queries. It helps save time and code when using an ORM as an alternative to vanilla SQL. 

![](API/client/src/images/tradetopia.png)

See my deployed version on Azure - [Tradetopia](https://investopia.azurewebsites.net)

## Installation Instructions

1.) Do a fork and clone of the repo to your local machine.

2.) Navigate to the `client` directory and run `npm install`.

3.) Move to the project root directory and run `dotnet watch run`.

## Tech Stack Used
---
* Back-End
    * ASP.NET Core 3.1
    * NHibernate
    * PostgreSQL
    * NUnit
* Front-End
    * React.js
    * Axios
    * IEX Cloud API
    * Bootstrap

## Author 

* **Reid Muchow** - *Full-Stack Web Developer* - [Website](https://www.reidmuchow.com) | [LinkedIn](https://www.linkedin.com/in/reidmuchow/)
