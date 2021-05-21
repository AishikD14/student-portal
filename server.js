const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const basicAuth = require('express-basic-auth');
const http = require('http');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const startTime = new Date();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Server Status
app.route('/').get((req,res) => {
    res.json("Server started successfully on " + startTime);
})

// Route Authentication
app.use(basicAuth({
    users: { 'admin': 'admin' }
}));

// User router
const studentsRouter = require('./routes/student');
app.use('/student',studentsRouter);

const server = http.createServer(app);

server.listen(port, () => {
    console.log('Server is running on port:', port);
})