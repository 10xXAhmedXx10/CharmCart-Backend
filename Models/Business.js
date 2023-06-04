const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const businessSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  productType: String,
});

businessSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
