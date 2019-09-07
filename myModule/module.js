const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const assert = require('assert');

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
    var d = new Date()
    var hour = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();

    var time = "[" + hour + ":" + min + ":" + sec + "]";
    return time;
}

module.exports.connDb = function(){
    MongoClient.connect('mongodb://127.0.0.1:27017/myDB', (err, db) => {
    assert.equal(null, err)
    console.log("Connected successfully to server")
    db.close()
    })
}