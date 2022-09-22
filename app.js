const express = require('express')
require('dotenv').config()
require('express-async-errors')
const connect = require('./db/connect')
const morgan = require('morgan')
const errorMiddleware = require('./middleware/errorHandler')
const notFoundMiddleware = require('./middleware/notFoundHandler')
const {InternalServerError} = require('./error/index')

// 3rd party security middlewares
const helmet = require('helmet') // secure express apps by setting various http headers
const cors = require('cors') // allows access to public domain
const xss = require('xss-clean') // sanitize or clean req.body, req.params and req.query and secure cross origin request
const rateLimiter = require('express-rate-limit') // limit calls to functions

// Swagger
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDoc = YAML.load('./swagger.yaml')

const app = express();

// express middlewares
app.set('trust proxy', 1) // needed ONLY IF this will be hosted in reverse proxy (heroku, AWS etc.)
app.use(rateLimiter({
    windowsMs: 15 * 60 * 1000, // 15 minutes converted to milliseconds. 900,000 ms = 15 minutes
    max: 100 // limit each IP 100 requests per 15 minutes(windowsMs)
}));
app.use(helmet());
app.use(cors());
app.use(xss());

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(morgan('tiny'))

// default route
app.get('/', (req, res) => {
    res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
})

// api docs route // Swagger docs
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// route
require('./route/project-route')(app)

// error handlers (custom middleware)
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// connect
const port =  process.env.PORT || 5000;

const start = async () => {
    try { 
        await connect(process.env.MONGO_URI);
        app.listen(port, ()=> {
            console.log(`Listening on port: ${port}`)
        })
    }
    catch (error) {
        throw new InternalServerError('An error ocurred while connecting to database..')
    }
}

start();

