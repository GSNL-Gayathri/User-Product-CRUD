const mongoose = require("mongoose");

if (process.env.MONGO_URL) {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;
