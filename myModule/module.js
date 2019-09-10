const mongoose = require('mongoose');
var ChatLog = require('./schema')

module.exports.checkName = function(name){
    if((name === null) 
        || (name.length > 8)
        || (name.length <= 0)
        || (/^[^あ-ん0-9a-zA-Z_@\-]+$/.test(name))) return false;
    return true;
}

module.exports.checkRoom = function(room){
    return /^[1-3]{1}$/.test(room);
}

module.exports.checkInRoomMsg = function(room, name){
    var time = this.getNow();
    return time + " " + "Room No." + room + " > " + name + " さんが入室しました";
}

module.exports.checkLeaveRoomMsg = function(room, name){
    var time = this.getNow();
    return time + " " + "Room No." + room + " > " + name + " さんが退出しました";
}

module.exports.checkMsgLength = function(msg){
    if(msg.length > 0 && 140 >= msg.length){
        return true;
    }
    return false;
}

module.exports.checkMsgSpace = function(msg){
    if(/^( |　)+$/.test(msg)){
        return false;
    }
    return true;
}

module.exports.checkMsgString = function(msg){
    if(typeof msg !== 'string'){
        return false;
    }
    return true;
}

module.exports.checkRoomClients = function(inClientsNum){
    var maxClients = 1;

    if (inClientsNum > (maxClients + 1)){
         return false;
    }
    return true;
}

module.exports.getNow = function(){
    var dt = new Date()
    var hour = this.zeroPadding(dt.getHours(),2);
    var min = this.zeroPadding(dt.getMinutes(),2);
    var sec = this.zeroPadding(dt.getSeconds(),2);

    var time = "[" + hour + ":" + min + ":" + sec + "]";
    return time;
}

module.exports.getDateTime = function(){
    var dt = new Date();

    var year = dt.getFullYear();
    // 1月が0,12月が11のため
    var month = dt.getMonth() + 1;
    var date = dt.getDate();

    var hour = dt.getHours();
    var min = dt.getMinutes();
    var sec = dt.getSeconds();

    var dateTime = year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
    return dateTime;
}

module.exports.zeroPadding = function(num, length){
    return ('00' + num).slice(-length);
}

module.exports.insertDb = function(user){
    mongoose.connect('mongodb://localhost/chat', {useNewUrlParser: true});
    const db = mongoose.connection;
    
    db.on('error', console.error.bind(console, 'mongo connection error ctrl + c'));
    db.once('open', () => {
        console.log('connected');

        // // スキーマからモデルを作成
        // const ChatLog = mongoose.model('ChatLog', logSchema);

        // なにかいれてる
        const saveLog = new ChatLog({
            room: user.room,
            name: user.name,
            msg: user.msg,
            state: user.state,
            classify: user.classify,
            createdAt: user.dateTime
        });

        saveLog.save((err, logs) => {
            if (err) console.error(err);
            mongoose.disconnect();
            console.log(logs);
        });
    });

    db.on('close', function(){
        console.log('disconnected.');
    })
}