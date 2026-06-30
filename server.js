require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// User Model
const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    password: String,
    role: String
}));


const Coffee = mongoose.model('Coffee', new mongoose.Schema({
    name: String,
    type: String,
    price: Number,
    size: String
}));


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

app.delete('/api/coffees/:id', async (req, res) => {
    try {
        await Coffee.findByIdAndDelete(req.params.id);

        res.status(204).send();
    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }
});


app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (!user) {
        return res.status(401).send({
            message: 'Invalid username or password'
        });
    }

    res.send({
        success: true,
        role: user.role
    });
});


app.listen(3000, () => {
    console.log('Coffee Shop API is running on port 3000');
});