const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/config');
const productRoutes = require('./routes/productsRoute');
const { errorHandler } = require('./middlewares/errorMiddleware');
const userRoutes = require('./routes/usersRoute');
const orderRoutes = require('./routes/orderRoute');
const path = require('path');
const cors = require('cors');

//dotenv config
dotenv.config();

//connecting to mongodb database
connectDB();
const app = express();

//middleware bodyparser
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("API for E-commerce application running successfully");
})

app.use('/api', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
})

app.use(async (req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error, errorHandler);
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});