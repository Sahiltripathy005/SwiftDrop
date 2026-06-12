import { io } from "socket.io-client";


const socket = io({
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
});

socket.on("connect", () => {
    console.log("CONNECTED:", socket.id);
});

socket.on("disconnect", (reason) => {
    console.log(
        "Disconnected:",
        socket.id,
        reason
    );
});

export default socket;