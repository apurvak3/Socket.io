import express from "express";
import { Server } from "socket.io";
import cors from 'cors';
import { createServer } from 'http';

const port = 3000;
const app = express();
const server = createServer(app);

// Initialize the socket server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Frontend origin
        methods: ["GET", "POST"],        // Corrected the key to 'methods'
        credentials: true,               // Fixed typo to 'credentials'
    }
});

// Use CORS middleware for the express server
app.use(cors());

// Basic route to confirm the server is running
app.get("/", (req, res) => {
    res.send("Yep, the server is listening on port " + port);
});

// Start the HTTP server
server.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});

// Socket.io connection event
io.on("connect", (socket) => {
    console.log("User connected");
    console.log("ID: ", socket.id);

    // Emit a welcome message to the connected user
    socket.emit("welcome", `Welcome to the server, ${socket.id}`);
});
