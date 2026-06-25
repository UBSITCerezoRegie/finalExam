require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB Connection Error:', err));

const Coffee = mongoose.model('coffee', new mongoose.Schema({
    name: String,      
    type: String,       
    price: Number,     
    size: String        
}));


app.post('/api/coffee', async (req, res) => {
    try {
        const item = new Coffee(req.body);
        await item.save();
        res.status(201).send(item);
        console.log("Added a new menu item: ", item);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

app.get('/api/coffee', async (req, res) => {
    try {
        const menu = await Coffee.find();
        res.send(menu);
        console.log("Fetched all menu items.");
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

app.listen(3000, () => {
    console.log('Coffee Shop API is running on port 3000');
});
