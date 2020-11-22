# Investopia  (React.js, C#, .NET Core, PostgreSQL, NHibernate, NUnit, IEX Stock API)

A FinTech application for buying and selling stocks. It uses the IEX Cloud api to retrieve live stock trading data. 

See my deployed version on Azure - [HERE](https://investopia.azurewebsites.net)

![](chat_app.png)

## Summary

This web app is a fun and easy way to practice trading stocks from live companies. I'm interested in personal finance and building this was a great way to channel that into making a tool for investing. 

Investopia uses React.js for client-side operations and a back-end written in C# on the .NET Core framework. Javascript and C# together are a wonderful match because of .NET Core's integration with React and it's comfortable dev environment. All user information is saved to a PostgreSQL database that holds account balances, session, transactions and stock data. I use the ORM NHibernate to map the database queries. It helps save time and code when using an ORM as an alternative to vanilla SQL. 



## Installation Instructions

1.) Run `npm i` in the terminal (in the root/API directory)

2.) Push the play button in VS or run `dotnet watch run` in terminal

3.) Open a browser and navigate to `localhost:5001`


## Author 

* **Reid Muchow** - *Full-Stack Web Developer* - [Website](https://www.reidmuchow.com) | [LinkedIn](https://www.linkedin.com/in/reidmuchow/)
