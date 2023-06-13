const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./Models/User'); 
const Item = require('./Models/Item');
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
    res.status(200).json({ message: "registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/businessregister', async (req, res) => {
  try {
    const { name, email, password, productType } = req.body;
    const business = new Business({ name, email, password, productType });
    await business.save();
    res.status(200).json({ message: "registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;


  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ alert: 'Invalid email or password.' });
  }


  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({ alert: 'Invalid email or password.' });
  }


  const token = jwt.sign({ _id: user._id }, 'your_secret_key');
  res.status(200).json({ token, name: user.name });
});

app.post('/businesslogin', async (req, res) => {
  const { email, password } = req.body;

 
  const business = await Business.findOne({ email });


  if (!business) {
    return res.status(400).json({ alert: 'Invalid email or password.' });
  }

  const validPassword = await bcrypt.compare(password, business.password);

 
  if (!validPassword) {
    return res.status(400).json({ alert: 'Invalid email or password.' });
  }

  
  const token = jwt.sign({ _id: business._id }, 'your_secret_key');
  res.status(200).json({ token, name: business.name });
});



app.post('/exercise', async (req, res) => {
  try {
      const { name, price, image, description } = req.body;
      
      const Item = require('./Models/Item'); 
      const newItem = new Item({
          name: name,
          price: price,
          image: image,
          description: description
      });
      
      await newItem.save();
      
      res.status(201).json({
          message: 'Item successfully created',
          item: newItem
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          message: 'didnt work'
      });
  }
});


app.get('/exercise', async (req, res) => {
  try {
      const Item = require('./Models/Item');
      
      const items = await Item.find({});
      
      res.status(200).json(items);
  } catch (error) {
      console.error(error);
      res.status(500).json({
          message: 'didnt work tru again'
      });
  }
});


app.delete('/exercise/:id', async (req, res) => {
  try {
      const itemId = req.params.id;
      await Item.findByIdAndDelete(itemId);
      res.status(200).json({ message: 'Item successfully deleted' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'ops item its not deleted try again' });
  }
});

app.put('/exercise/:id', async (req, res) => {
  try {
      const itemId = req.params.id;
      const { name, price, image, description } = req.body;

      const updatedItem = await Item.findByIdAndUpdate(itemId, { name, price, image, description }, { new: true });
      
      res.status(200).json({ message: 'Item successfully updated', item: updatedItem });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'here we go again ..still the item is not updating so try again' });
  }
});




const port = process.env.PORT || "8080";

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
