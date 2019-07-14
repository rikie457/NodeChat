/**
 * Created by rikie on 16-1-2018.
 */


const express = require('express');

const Room  = require("./public/models/room");

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
let connections = 0;
let rooms = [];

const PORT = 80;
app.use(express.static(__dirname + "/public"));
app.get('/', function (req, res) {
    res.sendFile(__dirname + 'public/index.html');
});

io.on('connection', function (socket) {
    connections++;
    console.log(connections + ' Computer(s) connected');

    if (rooms.length === 0) {
        io.emit("createroom");
    }
    socket.on("createroomname", function (msg) {
        var room = new Room(rooms.length + 1, msg);
        rooms.push(room);
        io.emit("succesfullroomcreated", room);
    });

    socket.on('chatmessage', function (msg) {
        console.log(msg);
        io.emit('message', msg);
    });

    socket.on('disconnect', function () {
        connections--;
        console.log('Computer disconnected ' + connections + " Remaining");
    });
});


http.listen(PORT, function () {
    console.log('Configured for Port ' + PORT);
});

