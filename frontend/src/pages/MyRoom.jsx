import { useEffect, useState } from "react";

import socket from "../services/socket";
import PERSONAL_ROOM from "../utils/personalRoom";

import SendPanel from "../components/SendPanel";
import ReceivePanel from "../components/ReceivePanel";


function MyRoom() {
    const [connected, setConnected] = useState(false);
    const [receivedText, setReceivedText] = useState("");
    const [receivedFiles, setReceivedFiles] = useState([]);

    useEffect(() => {
        socket.on("room-status", ({ connected }) => {
            setConnected(connected);
        });

        socket.on("incoming-file", (fileData) => {
            setReceivedFiles((prev) => [
                fileData,
                ...prev,
            ]);
        });

        socket.on("receive-text", ({ text }) => {
            setReceivedText(text);
        });

        return () => {
            socket.off("room-status");
            socket.off("incoming-file");
            socket.off("receive-text");
        };
    }, []);

    useEffect(() => {
        const handleConnect = () => {
            socket.emit("join-room", {
                room: PERSONAL_ROOM,
                deviceName: "Laptop",
            });
        };

        handleConnect();

        socket.on("connect", handleConnect);

        return () => {
            socket.off("connect", handleConnect);
        };
    }, []);

    return (
        <div>
            <div
                className="
          bg-white/5
          border border-white/10
          backdrop-blur-xl
          rounded-3xl
          p-8
        "
            >
                <h2 className="text-white text-2xl font-semibold mb-6">
                    My Room
                </h2>

                <div className="flex items-center gap-4">
                    <div
                        className={`
              h-4
              w-4
              rounded-full
              ${connected ? "bg-green-500" : "bg-yellow-500"}
            `}
                    />

                    <span className="text-white text-lg">
                        {connected
                            ? "Phone Connected"
                            : "Waiting for Device"}
                    </span>
                </div>
            </div>

            {connected && (
                <div className="grid lg:grid-cols-2 gap-6 mt-6">
                    <SendPanel room={PERSONAL_ROOM} />

                    <ReceivePanel
                        receivedText={receivedText}
                        receivedFiles={receivedFiles}
                    />
                </div>
            )}
        </div>
    );
}

export default MyRoom;