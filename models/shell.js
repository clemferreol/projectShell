var express = require('express');
var app = express();
const exec = require('child_process').exec;
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(express.static(__dirname + '/views'))

io.on('connection', function (socket) {
    socket.on('command', function (data) {
        exec(data , function(error, stdout, stderr) {
            if (error) {
                console.error(`exec error: ${error}`);
            }
            socket.emit('output', `${stdout}`);
        });

    })
})

server.listen(3000);
