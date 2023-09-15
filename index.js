const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const dbConfig = require('./db');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const authRouter = require('./controller/auth/auth')
const userRouter = require('./controller/user/user')
const blogRouter = require('./controller/blog/blog')
const textRouter = require('./controller/text/text')
const app = express();
const server = createServer(app);
const cors = require('cors');

const io = new Server(server);

app.use(cors());
app.use(express.json());

app.use('/text' ,textRouter);
app.use('/auth' ,authRouter);
app.use('/users' ,userRouter);
app.use('/blogs' ,blogRouter);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


server.listen(3000, () => {
    console.log('Socket.io server çalışıyor, port: 3000');
});
