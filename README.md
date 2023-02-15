## carrier-api-service
![npm](https://img.shields.io/npm/v/npm?color=%23FFFFFF&style=for-the-badge)![GitHub last commit](https://img.shields.io/github/last-commit/krisior/carrier-api-service?color=%23002664&style=for-the-badge)
![GitHub top language](https://img.shields.io/github/languages/top/krisior/carrier-api-service?color=%23FF6319&style=for-the-badge)
![GitHub](https://img.shields.io/github/license/krisior/carrier-api-service?color=%2300B4D7&style=for-the-badge)

a modern UI/UX design and logic control for carrier service API (with connection to custom mongoDB database)

the work performed (hereafter referred to as the Project) is charitable and does not involve a formal cooperation agreement or contract for work

[![](https://webimages.mongodb.com/_com_assets/cms/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg?auto=format%252Ccompress)](https://www.mongodb.com/)

[![](https://expressjs.com/images/express-facebook-share.png)](https://expressjs.com/)

[TOC]

## main idea
### design

The vision was born with the announcement of a new project in the final year of secondary school. From there, my first main concept was to create a new design for the website of the Polish national carrier PKP Intercity (as part of a newly announced competition for the new design of their website). However, after announcing the lack of further support for the competition and its participants in the first half of 2023, it discouraged me from putting so much work into something that was not needed.

Therefore, I reorganised myself and this is how my flexibly universal platform was created, allowing the use of data from any database of any carrier of any branch of transport. 

### coverage

The project includes the initial set-up and organisation of the functions needed to produce a finished application for the client, meeting the specific conditions of the contract presented. The application is based on a self-created JavaScript API in combination with a non-SQL solution available with the help of the MongoDB platform. Middleware uses the benefit gained from the ExpressJS platform.

## install

This is a Node.js application accessible by cloning the repository and installing the necessary modules inside the project's root folder:
```bash
$ npm install
```
In addition, an .env file needs to be created and it must contain two lines. 
The first of these:
```env
NODE_ENV=development
```
or
```env
NODE_ENV=production
```
for the final testing of the website.
The second of these:
```env
DATABASE_URI=mongodb+srv://<username>:<password>@<databaseConnectionProtocolAccessAddress>retryWrites=true&w=majority
```
where <username> and <password> refer to a user having read&write access to the connected database (!)
Connection protocol is also available throughout mongoDB built-in functions.

## handling

### settings

For the time being the function is not available.

### user control

Adding and deleting users with different IDs - no influence on their functions, no availability of roles for now.
No registration and logging before getting into authorization step needed, however all the admin functions not available in public release.

### station and stop control

Adding, modyfing and deleting station and stops data (site temporarily based on non-official PKP PLK data form 2019) accessible through working HTTS connection with DB.

### connection control

Adding, modyfing and deleting (and duplicating in next release <3) of connections between two stations with max 40 via-stations (flexible count).
Clock count, date anticipation and weekday count available. Platform and track visual detection implemented but not used (lack of official data). 
Arrival and departure delay option accessible and modifiable but not used in this version of the app.

## wip

### authentication and authorization
#### registration and login
#### admin control over website
#### custom middleware actions

### settings control

### copying documents in single collection

## final provision

MIT copyright © 2023 