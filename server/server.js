const io = require('socket.io')(80);

io.on('connection', socket => {
    io.emit('this', {will: 'be received by everyone'});

    socket.on('private message', (from, msg) =>{
        console.log('I received a private message from ', from, 'saying ', msg);
    });

    socket.on('disconnect', function() {
        io.emit('user disconnected');
    });
})