//Initializing variables, the app, and the server
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors");
app.use(cors());
const server = http.createServer(app);

//Defining server parameters
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }

})

//On User connect the server
io.on("connection", (socket) => {
    console.log('User Connected:', socket.id)
    
    //When the user joins the room, the server will keep track of what server they joined
    socket.on("join_room", room =>{
        socket.join(room);
        console.log(socket.id+" Joined room "+room);
    })

    //When the user sends a message to a room, it goes through the server here
    socket.on("send_message", data => {
        try{
            socket.to(data.room).emit("received_message", data.message);
            console.log(socket.id+" Sent "+data.message+" on room "+data.room)
        }
        catch{
            console.log("User has failed to indicate what room they want to join!")
        }
        

    });

});

//Starting the server
server.listen(3001, () =>{
    console.log("Server is running")
})