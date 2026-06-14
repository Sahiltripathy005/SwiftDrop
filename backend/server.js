const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");


const getLocalIP = require("./utils/getLocalIP");
const cors = require("cors");
const app = express();
const uploadRoute = require("./routes/upload");
const downloadRoute = require("./routes/download");
const cleanupUploads = require("./jobs/cleanupUploads");

app.use(cors());
app.use(express.json());
app.use("/upload", uploadRoute);
app.use("/download", downloadRoute);
app.use("/uploads", express.static("uploads"));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.get("/api/network-ip", (req, res) => {
    res.json({
        ip: getLocalIP(),
    });
});

io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    socket.on("join-room", ({ room, deviceName }) => {
        socket.data.room = room;

        socket.join(room);

        console.log(`${deviceName} joined room ${room}`);

        const roomSize =
            io.sockets.adapter.rooms.get(room)?.size || 0;

        io.to(room).emit("room-status", {
            connected: roomSize >= 2,
            count: roomSize,
        });
    });

    socket.on("clipboard-sync", ({ room, text }) => {
        socket.to(room).emit("clipboard-received", {
            text,
        });
    });

    socket.on("send-text", ({ room, text }) => {
        console.log(
            "TEXT:",
            socket.id,
            room,
            text
        );

        socket.to(room).emit("receive-text", {
            text,
        });
    });

    socket.on(
        "file-uploaded",
        ({ room, filename, originalName }) => {

            console.log(
                "FILE:",
                socket.id,
                room,
                originalName
            );

            socket.to(room).emit(
                "incoming-file",
                {
                    filename,
                    originalName,
                }
            );
        }
    );

    socket.on("disconnect", () => {
        console.log("Disconnected:", socket.id);

        const room = socket.data.room;

        if (!room) return;

        setTimeout(() => {
            const roomSize =
                io.sockets.adapter.rooms.get(room)?.size || 0;

            io.to(room).emit("room-status", {
                connected: roomSize >= 2,
                count: roomSize,
            });
        }, 100);
    });
});

cleanupUploads();

setInterval(
    cleanupUploads,
    30 * 60 * 1000
);

app.use(
    express.static(
        path.join(__dirname, "../frontend/dist")
    )
);

app.get(/.*/, (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../frontend/dist/index.html"
        )
    );
});

app.post("/shutdown", (req, res) => {
    res.json({
        success: true,
        message: "Shutting down..."
    });

    setTimeout(() => {
        process.exit(0);
    }, 1000);
});

server.listen(5000, () => {
    console.log("Server running on 5000");
});