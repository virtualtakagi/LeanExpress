const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongo connection error ctrl + c'));
db.once('open', () => {
    console.log('connecting...');
});

const kittySchema = mongoose.Schema({
    name: String
});
  
// const Kitten = mongoose.model('Kitten', kittySchema);
  
// const silence = new Kitten({ name: 'Silence' });
// console.log(silence.name);

kittySchema.methods.speak = function() {
    const noName = "名前はまだ無い";
    const greeting = this.name ? "みゃ～の名前は " + this.name : noName;
    console.log(greeting);
}

kittySchema.methods.speak();

const Kitten = mongoose.model('Kitten', kittySchema);

const tama = new Kitten({
    name: 'Tama'
});

tama.speak();

tama.save((err, kittens) => {
    if (err) console.error(err);
    console.log(kittens);
});

Kitten.find((err, kittens) => {
    if (err) console.error(err);
    console.log(kittens);
    mongoose.disconnect();
});


db.on('close', function(){
    console.log('connection closed');
})