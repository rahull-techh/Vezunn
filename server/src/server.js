const express = require('express');
const cors = require("cors");
const http = require("http");
require("dotenv").config();

const { Server } = require("socket.io");
const registerSocketHandlers = require("./socket");

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5000";

app.use(cors({
    origin: CLIENT_URL
}));

app.use(express.json());

const io = new Server(httpServer, {
    cors: {
        origin: CLIENT_URL,
        methods: ["GET", "POST"]
    }
});

app.get("/", (req, res) => {
    res.json({
        name: "Vezun signalling server",
        status: "running"
    });
});

registerSocketHandlers(io);

httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Vezun server started on ${PORT}`);
}); 