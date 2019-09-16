var socket = io();
var myName = "";
var inRoomClients = [];

// サーバーからconnectedを受信したら、入室するルームと名前を通知する
socket.on('inputRoom', function(){
    var room = 1;
    myName = prompt("input userName");
    if (myName !== null) myName.textContent;
    socket.emit('checkRoom', {room: room, name: myName});
});

// Room入室を許可されたらメッセージ欄を全削除
socket.on('allowEntry', function(){
    $('#message').children().remove();
})

// Roomが満員だったら
socket.on('overCapacity', function(){
    alert('overcapacity');
});

// 現在の接続種類の要求
setInterval(function(){
    if (socket.connected){
        socket.emit('method');
    };
}, 600000);

// 現在の接続種類の取得
socket.on('websocket', function(method){
    console.log('WebScoket: ' + method);
});

// 入力メッセージの送信処理
$('#send').on('click', function(e) {
    e.preventDefault();
    const msg = $('#form [name=text]').val();
    msg.textContent;
    socket.emit('chat', msg);
    $('#form [name=text]').val("");
});

// 切断処理
$('#disconnect').on('click', function(e) {
    socket.emit('mdisconnect');
    console.log('disconnet.');
})

// メッセージ出力処理
socket.on('chat', function(user){
    const dispMsg = document.createElement('li');
    const parent = document.getElementById("message");
    if (user.name === myName && user.classify === 'User') {
        dispMsg.setAttribute("id", "me");
    // Systemの発言
    } else if (user.classify === 'System'){
        dispMsg.setAttribute("id","system");
        // メンバー反映
        $('.clients').children().remove();
        for(var i = 0; i < user.pt.length; i++){
            $('.clients').append('<p>' + user.pt[i] + '</p>');
        }
    } else {
        // Systemまたは自分以外の発言
        dispMsg.setAttribute("id","msg");
    }
    // メッセージの表示
    dispMsg.textContent = user.msg;
    parent.insertBefore(dispMsg, parent.firstChild);
});