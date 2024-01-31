const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    city: String,
});
//create table
const User = mongoose.model('user', userSchema);

module.exports = User;