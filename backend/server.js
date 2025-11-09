// 1. Load Environment Variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');  // Import Database Configuration
const clientRoutes = require('./routes/client');  
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const commentRoutes = require('./routes/comment');
const orderRoutes = require('./routes/order');

// Initialize Express App
const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 

connectDB();  // Test Database Connection

// Basic Test Route
app.get('/', (req, res) => {
    res.send('Client Management Backend is Running!');
});

app.use('/api/v1/clients', clientRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/comments',commentRoutes);
app.use('/api/v1/orders',orderRoutes);

//  Start the Server
app.listen(port, () => {
    console.log(` Server running on port ${port}`);
});