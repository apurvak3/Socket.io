import React, { useEffect  } from "react";
import { io } from 'socket.io-client';
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";


const [message , setMessage] = useEffect(" ");


const App = () => {
  const socket = io("http://localhost:3000");

  const handleSubmit = (e) =>{
    e.preventDefault();
    socket.emit("message" , message);
    setMessage("");
  }

  useEffect(() => {
    // Handle the welcome event
    socket.on("connect", () => {
      console.log(`connected ${socket.id}`);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection Error: ", err);
    });

    // Custom debug event
    socket.on("debug", (message) => {
      console.log("Debug:", message);
    });
    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []); // Dependency array to ensure this effect runs once when the component mounts

  return (
  <Container maxWidth="sm">
  <Box sx={{ height: 500 }} />
  <Typography variant="h6" component="div" gutterBottom>
    {socketID}
  </Typography>

  <form onSubmit={joinRoomHandler}>
    <h5>Join Room</h5>
    <TextField
      value={roomName}
      onChange={(e) => setRoomName(e.target.value)}
      id="outlined-basic"
      label="Room Name"
      variant="outlined"
    />
    <Button type="submit" variant="contained" color="primary">
      Join
    </Button>
  </form>

  <form onSubmit={handleSubmit}>
    <TextField
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      id="outlined-basic"
      label="Message"
      variant="outlined"
    />
    <TextField
      value={room}
      onChange={(e) => setRoom(e.target.value)}
      id="outlined-basic"
      label="Room"
      variant="outlined"
    />
    <Button type="submit" variant="contained" color="primary">
      Send
    </Button>
  </form>

  <Stack>
    {messages.map((m, i) => (
      <Typography key={i} variant="h6" component="div" gutterBottom>
        {m}
      </Typography>
    ))}
  </Stack>
</Container>
  )};

export default App;
