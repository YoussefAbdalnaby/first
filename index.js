const express=require("express")
const app=express()
const http = require("http");

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");

const database=require("./database/database.js")
const bookRoute=require("./routes/bookRoute.js")
const userRoute=require("./routes/userRoute.js")
const imageRoute=require("./routes/imageRoute.js")
const productRoute=require("./routes/productRoute.js")
const moiveRoute=require("./routes/moiveRoute.js")
require("dotenv").config()


app.use(express.json())


database.connectToDatabase()

app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
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

app.use("/api/books",bookRoute)
app.use("/api/users",userRoute)
app.use("/api/images",imageRoute)
app.use("/api/products",productRoute)
app.use("/api/moives",moiveRoute)






server.listen(3000,()=>{   
    console.log("listening on port 3000")
}   )
