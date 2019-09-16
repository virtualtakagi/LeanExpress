const chai = require('chai');
const testFunc = require('../myModule/module');

// Mochaの規則に従ってテストを実装
describe('UnitTest', function(){

    it('nameが"test"でtrue', function(){
        chai.assert.isOk(testFunc.checkName("test"));
    });

    it('nameが"たかぎ"でtrue', function(){
        chai.assert.isOk(testFunc.checkName("たかぎ"));
    });

    it('nameが全角8文字でtrue', function(){
        chai.assert.isOk(testFunc.checkName("ああああああああ"));
    });

    it('nameが全角1文字でtrue', function(){
        chai.assert.isOk(testFunc.checkName("あ"));
    });

    it('nameが16文字でtrue', function(){
        chai.assert.isOk(testFunc.checkName("12345678"));
    });

    it('nameが0文字でfalse', function(){
        chai.assert.isNotOk(testFunc.checkName(""));
    });

    it('nameが9文字でfalse', function(){
        chai.assert.isFalse(testFunc.checkName("123456789"));
    });

    it('nameが全角9文字でfalse', function(){
        chai.assert.isNotOk(testFunc.checkName("あああああああああ"));
    });

    it('nameに-を含めてtrue', function(){
        chai.assert.isOk(testFunc.checkName("A---Z"));
    });

    it('nameに_を含めてtrue', function(){
        chai.assert.isOk(testFunc.checkName("A_Z"));
    });

    it('nameがnullでfalse', function(){
        chai.assert.isNotOk(testFunc.checkName(null));
    });

    it('room名が0でfalse', function(){
        chai.assert.isNotOk(testFunc.checkRoom(0));
    });

    it('room名が1でtrue', function(){
        chai.assert.isOk(testFunc.checkRoom(1));
    });

    it('room名が3でtrue', function(){
        chai.assert.isOk(testFunc.checkRoom(3));
    });

    it('room名が4でfalse', function(){
        chai.assert.isNotOk(testFunc.checkRoom(4));
    });

    it('room名が1桁以上の場合false', function(){
        chai.assert.isNotOk(testFunc.checkRoom(12));
    });

    it('room名が英数字以外の場合false', function(){
        chai.assert.isNotOk(testFunc.checkRoom("aaaa"));
    });

    it('room名が小数点の場合false', function(){
        chai.assert.isNotOk(testFunc.checkRoom(1.45));
    });

    // it('ユーザーが入室した時のメッセージのフォーマット', function(){
    //     chai.assert.match(testFunc.checkInRoomMsg("123","user_456"), /Room No.[0-9]{1,4} > user_[0-9]{1,4} さんが入室しました/);
    // });

    // it('ユーザーが退出した時のメッセージのフォーマット', function(){
    //     chai.assert.match(testFunc.checkLeaveRoomMsg("123","user_456"), /Room No.[0-9]{1,4} > user_[0-9]{1,4} さんが退出しました/);
    // });

    it('メッセージが1文字以上140文字以下でtrue', function(){
        chai.assert.isOk(testFunc.checkMsgLength("test message"));
    });

    it('メッセージが1文字でtrue', function(){
        chai.assert.isOk(testFunc.checkMsgLength("0"));
    });

    // 140文字
    it('メッセージが140文字でtrue', function(){
        chai.assert.isOk(testFunc.checkMsgLength("11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"));
    });

    // 139文字
    it('メッセージが139文字でtrue', function(){
        chai.assert.isOk(testFunc.checkMsgLength("111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"));
    });

    //141文字
    it('メッセージが141文字でfalse', function(){
        chai.assert.isNotOk(testFunc.checkMsgLength("111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"));
    });

    // 0文字
    it('メッセージが0文字でfalse', function(){
        chai.assert.isNotOk(testFunc.checkMsgLength(""));
    });

    // 半角空白文字
    it('メッセージが半角空白だけでfalse', function(){
        chai.assert.isNotOk(testFunc.checkMsgSpace(" "));
    });

    // 全角空白文字
    it('メッセージが全角空白だけでfalse', function(){
        chai.assert.isNotOk(testFunc.checkMsgSpace("　"));
    });

    // 混合空白
    it('メッセージが半角空白と全角空白だけでfalse', function(){
        chai.assert.isNotOk(testFunc.checkMsgSpace("       　"));
    });

    // メッセージがstring型でtrue
    it('メッセージがstring型でtrue', function(){
        chai.assert.isOk(testFunc.checkMsgString("test message"));
    });

    // メッセージがArray型でfalse
    it('メッセージがArray型でfalse', function(){
        var array = new Array;
        chai.assert.isNotOk(testFunc.checkMsgString(array));
    });

    it('roomの人数が3人でfalse', function(){
        chai.assert.isNotOk(testFunc.checkRoomClients(3));
    });

    it('roomの人数が2人でtrue', function(){
        chai.assert.isOk(testFunc.checkRoomClients(2));
    });

    it('現在時刻の表示', function(){
        chai.assert.isOk(testFunc.getNow());
        console.log(testFunc.getNow());
    });

});