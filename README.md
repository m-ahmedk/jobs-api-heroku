# Job Board API
This project is a simple Node.js application that provides a user friendly system for job management. It includes JWT authentication and is backed by MongoDB database. Once authenticated, users can create, update, retrieve, and delete jobs.


## Features
- JWT authentication for secure user login
- MongoDB database for storing job data
- Create, update, retrieve, and delete job functionality
- Hosted on Heroku for easy deployment and scalability


## Prerequisites
- Node.js and npm installed
- MongoDB Atlas account and cluster created
- Heroku account (is paid now)


## Installation
1. Clone this repository.
2. Run _npm install_ to install the project's dependencies.
3. Create a _.env_ file in the root of the project and add the following variables:

```
MONGO_URI=<MONGODB_ATLAST_URI>
JWT_SECRET=<YOUR_JWT_SECRETE>
JWT_EXPIRY=<EXPIRY>
PORT=<PORT>
```

4. Start the development server using Nodemon.

```
npm run dev
```

## Deployment
This application is ready to be deployed to Heroku. To do so, you will need to set up a MongoDB instance and a Heroku account. Then, follow these steps:

1. Create a new heroku app

```
heroku create jobs-api
```

2. Set environment variables as per above

3. Push code to Heroku

```
git push heroku main
```

4. Open the app

```
heroku open
```

## License
This project is licensed under the [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/m-ahmedk/jobs-api-heroku.git/blob/main/LICENSE).