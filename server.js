const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static('public'));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    
    // Broadcast to all clients that a user joined
    socket.broadcast.emit('user joined', {
        id: socket.id,
        message: 'A user has joined the chat'
    });
    
    // Listen for chat messages
    socket.on('chat message', (data) => {
        console.log('Message received:', data);
        
        // Broadcast message to all clients
        io.emit('chat message', {
            id: socket.id,
            message: data.message,
            timestamp: new Date().toLocaleTimeString()
        });
    });
    
    // Listen for typing events
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', {
            id: socket.id,
            isTyping: data.isTyping
        });
    });
    
    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        socket.broadcast.emit('user left', {
            id: socket.id,
            message: 'A user has left the chat'
        });
    });
    
   
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});