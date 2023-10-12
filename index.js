const express = require('express');
require('dotenv').config()
const app = express();
app.use(express.json());

const rateLimit = require('express-rate-limit');
const router = require('./routes/parkinglot');
const connection = require('./db');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

app.use('/api', limiter);
app.use('/api', router);

const PORT = process.env.PORT || 8000;
app.get('/', (req, res) => {
    res.json("backend running")
})
// Start the server
app.listen(PORT, async () => {
    try {
        await connection
        console.log('connected to db');
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.log(error);
    }
});
