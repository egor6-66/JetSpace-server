require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const {execute, subscribe} = require('graphql')
const {graphqlHTTP} = require('express-graphql');
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser');
const cors = require('cors');


const errorMiddleware = require('./middlewares/error-middleware');
const authMiddleware = require('./middlewares/auth-middleware');


const router = require('./router');

const schema = require('./schema');
const {schema: subscriptionsSchema} = require('./schema/subscriptions-graphql');
const {createServer} = require('http');
const {SubscriptionServer} = require('subscriptions-transport-ws')


const app = express();
const PORT = process.env.PORT;
const WS_PORT = process.env.WS_PORT

app.use(cors({
    ws: WS_PORT,
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use(fileUpload({}));
app.use(express.json());
app.use(cookieParser());
app.use('/api',router);
// app.use(authMiddleware);

app.use(`/graphql`,  graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
app.use(errorMiddleware);

const ws = createServer((req, res) => {
    res.writeHead(400)
    res.end()
});

ws.listen(WS_PORT, () => console.log('websocket listening on port', WS_PORT));
const subscriptionServer = SubscriptionServer.create({
    schema: subscriptionsSchema,
    execute,
    subscribe,
    onConnect: () => console.log('client connected')
}, {server: ws, path: '/graphql'});

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
