const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./Models/User'); 

const app = express();

app.use(cors());

app.use(express.json());


mongoose.connect('mongodb+srv://Ahmed:Aoao0101@charmcart.dfzw2xe.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.post('/userregistration', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
