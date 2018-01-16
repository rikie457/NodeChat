/**
 * Created by rikie on 16-1-2018.
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = 80;
app.use(express.static(__dirname + "/public"));
app.get('/', function(req, res){
    res.sendFile(__dirname + 'public/index.html');
});

io.on('connection', function(socket){
    console.log('Computer connected');

    socket.on('chat message', function(msg){
        io.emit('message', msg);
    });

    socket.on('disconnect', function(){
        console.log('Computer disconnected');
    });
});



http.listen(PORT, function(){
    console.log('Confiured for Port ' + PORT);
});

