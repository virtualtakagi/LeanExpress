var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// スキーマの定義
const logSchema = mongoose.Schema({
    room: String,
    name: String,
    msg: String,
    state: String,
    classify: String,
    createdAt: Date
});

module.exports = mongoose.model('ChatLog', logSchema);