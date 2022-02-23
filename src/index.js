require('dotenv').config();
const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const errorMiddleware = require('./middlewares/error-middleware');
const authMiddleware = require('./middlewares/auth-middleware');

const router = require('./router/index');
const schema = require('./schema');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use(fileUpload({}))
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use(authMiddleware);
app.use('/graphql',  graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
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
