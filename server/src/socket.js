function registerSocketHandlers(io){
    io.on("connection", (socket) => {
        console.log(`Client connected on socket ${socket.id}`);

        socket.emit("server:ready", {
            message: "connected to Vezun Signalling server",
            socketId: socket.id
        });

        socket.on("disconnect", (reason) => {
            console.log(`Client disconnected ${socket.id}, reason`);
        });
    });
}

module.exports = registerSocketHandlers; 