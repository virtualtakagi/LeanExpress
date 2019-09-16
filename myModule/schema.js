var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// スキーマの定義
const logSchema = mongoose.Schema({
    room: { type: Number, required: true },
    name: { type: String, required: true },
    msg: { type: String, required: true },
    state: { type: String, required: true },
    classify: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatLog', logSchema);