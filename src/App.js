//Initializing the neccesary variables
import "./App.css";
import io from 'socket.io-client';
import {useEffect, useState} from "react";
const socket = io.connect("http://localhost:3001");
var roomNum

//Initialzing the web applications
function App() {
    const [room, setRoom] = useState("")
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    const sendMessage = () => {
      socket.emit("send_message", {message, room})
      
    };

    //When the user wishes to join a room, this function sneds the request to the server
    const joinRoom = () => {
      if (room !== roomNum) {
        roomNum = room
        socket.emit("join_room", room)
      }
    }

    //When receiving data from the server
    useEffect(() => {
      socket.on("received_message", data => {
        setMessageReceived(data);
      })
      
    });

  //The frontend workflow is here (html)
  return (
    <div className="App">
      <grid>
        <div>
      <input placeholder ='Room number...' onChange={(event) => {
        setRoom(event.target.value);
      }}></input>
      <button onClick={joinRoom}>Join Room</button>
      </div>
      <br></br>
      <div>
      <input placeholder="Message..." onChange={(event) => {
        setMessage(event.target.value)
      }}>
      </input>
      <button onClick={sendMessage}>Send Message</button>
      </div>
      <h1>Message: </h1>
      {messageReceived}

      </grid>
    </div>
    
  )};

//Exporting the application
export default App;
