const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongo connection error ctrl + c'));
db.once('open', () => {
    console.log('connecting...');
});

const kittySchema = mongoose.Schema({
    name: String
  });
  
  const Kitten = mongoose.model('Kitten', kittySchema);
  
  const silence = new Kitten({ name: 'Silence' });
  console.log(silence.name);