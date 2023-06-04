const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./Models/User'); 
const bcrypt = require('bcryptjs');

const Business = require('./Models/Business');

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

app.post('/businessregister', async (req, res) => {
  try {
    const { name, email, password, productType } = req.body;
    const business = new Business({ name, email, password, productType });
    await business.save();
    res.status(200).json({ message: "Business registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;


  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password.' });
  }


  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid email or password.' });
  }


  const token = jwt.sign({ _id: user._id }, 'your_secret_key');
  res.status(200).json({ token });
});


const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
