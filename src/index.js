require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const {graphqlHTTP} = require('express-graphql');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// const schema = require('./schemas');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');
const authMiddleware = require('./middlewares/auth-middleware');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use('/api', router);
app.use(authMiddleware);

app.use('/graphql', graphqlHTTP((request) => (console.log(request.header.authorization),{
    // schema: MySchema,
    rootValue: root,
    graphiql: true
})));

const root = {
    ip: function (args, request) {
        console.log(request)
    }
};

app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        mongoose.connection.on('error', err => console.log(`Connection error ${err}`));
        mongoose.connection.once('open', () => console.log('Connection to DB'));
        app.listen(PORT, () => console.log('server starting, port', PORT));
    } catch (e) {
        console.log(e)
    }
}

start()
