const io = require('../index');

io.of('/chatbot').on('connection', socket=>{
    // console.log(socket);
        
        socket.on('sent', query=>{
            socket.emit('received',query);
            // console.log(message.receiver);
    })
})
