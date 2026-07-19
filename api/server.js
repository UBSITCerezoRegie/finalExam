const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();

// Log environment variables for debugging
//console.log('MANAGER_USERNAME:', process.env.MANAGER_USERNAME);
//console.log('MANAGER_PASSWORD:', process.env.MANAGER_PASSWORD);
console.log('===== ENVIRONMENT VARIABLES =====');
console.log(Object.keys(process.env).sort());
console.log('=================================');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Order Model
const Order = mongoose.model('Order', new mongoose.Schema({
    orderNumber: Number,
    customerName: String,
    contactNumber: String,
    items: Array,
    total: Number,
    status: {
        type: String,
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}));

// Coffee Model
const Coffee = mongoose.model('Coffee', new mongoose.Schema({
    name: String,
    category: String,
    description: String,
    price: Number,
    image: String
}));

// Add Coffee
app.post('/api/coffees', async (req, res) => {
    try {
        const item = new Coffee(req.body);
        await item.save();

        console.log('Added a new menu item:', item);

        res.status(201).send(item);
    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }
});
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    console.log('Request body:', req.body);

    console.log('Environment:', {
        MANAGER_USERNAME: process.env.MANAGER_USERNAME,
        MANAGER_PASSWORD: process.env.MANAGER_PASSWORD
    });

    console.log('Comparison:', {
        usernameMatches: username === process.env.MANAGER_USERNAME,
        passwordMatches: password === process.env.MANAGER_PASSWORD
    });

    if (
        username === process.env.MANAGER_USERNAME &&
        password === process.env.MANAGER_PASSWORD
    ) {
        return res.status(200).json({ success: true });
    }

    return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
    });
});
// Get All Coffees
app.get('/api/coffees', async (req, res) => {
    try {
        const menu = await Coffee.find();

        console.log('Fetched all menu items.');

        res.send(menu);
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
});

// Update Coffee
app.put('/api/coffees/:id', async (req, res) => {
    try {
        const updatedCoffee = await Coffee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.send(updatedCoffee);
    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }
});

// Delete Coffee
app.delete('/api/coffees/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
});
app.delete('/api/orders/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
});
// Create Order
app.post('/api/orders', async (req, res) => {
    try {
        const lastOrder = await Order.findOne()
            .sort({ orderNumber: -1 });

        const nextOrderNumber =
            lastOrder ? lastOrder.orderNumber + 1 : 1;

        const order = new Order({
            orderNumber: nextOrderNumber,
            customerName: req.body.customerName,
            contactNumber: req.body.contactNumber,
            items: req.body.items,
            total: req.body.total
        });

        await order.save();

        res.status(201).send(order);
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
});

// Get All Orders
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find()
            .sort({ orderNumber: -1 });

        res.send(orders);
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
});

// Update Order Status
app.put('/api/orders/:id/status', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        res.send(updatedOrder);
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
});


// // Start Server
app.listen(3000, () => {
    console.log('Coffee Shop API is running on port 3000');
});