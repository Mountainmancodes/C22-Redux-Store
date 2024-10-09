const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern-shopping')
  .then(() => {
    console.log('🌍 Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

module.exports = mongoose.connection;