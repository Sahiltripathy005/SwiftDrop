import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

import socket from "./services/socket";
import { generateRoom } from "./utils/generateRoom";
import ClipboardSync from "./components/ClipboardSync";
import TextShare from "./components/TextShare";
import FileTransfer from "./components/FileTransfer";
import Background from "./components/layout/Background";

function App() {
  const [room] = useState(() => {
    let savedRoom = localStorage.getItem("swiftdrop-room");

    if (!savedRoom) {
      savedRoom = generateRoom();
      localStorage.setItem("swiftdrop-room", savedRoom);
    }

    return savedRoom;
  });
  const [connected, setConnected] = useState(false);
  const [ip, setIp] = useState("");
  const [transferActivity, setTransferActivity] = useState([]);

  useEffect(() => {
    fetch("/api/network-ip")
      .then((res) => res.json())
      .then((data) => {
        setIp(data.ip);
      });

    socket.on("device-connected", (data) => {
      console.log(data);
      setConnected(true);
    });

    socket.on("incoming-file", (fileData) => {
      setTransferActivity((prev) => [
        {
          type: "file",
          name: fileData.originalName,
          filename: fileData.filename,
          status: "Completed",
          direction: "incoming",
          time: Date.now(),
        },
        ...prev,
      ]);
    });

    socket.on("receive-text", ({ text }) => {
      setTransferActivity((prev) => [
        {
          type: "text",
          text,
          time: Date.now(),
        },
        ...prev,
      ]);
    });

    return () => {
      socket.off("device-connected");
      socket.off("incoming-file");
      socket.off("receive-text");
    };
  }, []);

  useEffect(() => {
    if (!room) return;

    const handleConnect = () => {
      console.log("Joining room:", room);

      socket.emit("join-room", {
        room,
        deviceName: "Laptop",
      });
    };

    handleConnect();

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [room]);

  const joinUrl = ip && room
    ? `http://${ip}:5000/join/${room}`
    : "";

  return (
    <>
      <Background />

      <div className="min-h-screen px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-6xl font-bold text-white">SwiftDrop</h1>

            <p className="text-slate-400 mt-3">
              Fast local file sharing over your local network
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* QR CARD */}

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
                Connect Device
              </h2>

              <div className="flex justify-center">
                {room && <QRCodeCanvas value={joinUrl} size={250} />}
              </div>

              <p className="text-slate-400 text-center mt-5">
                Scan with your phone
              </p>
            </div>

            {/* DEVICE CARD */}

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
                Device Status
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
                  {connected ? "Phone Connected" : "Waiting for Device"}
                </span>
              </div>

              <div className="mt-6">
                <p className="text-slate-400">Room</p>

                <p className="text-white font-mono">{room}</p>
                <button
                  onClick={async () => {
                    if (!window.confirm("Stop SwiftDrop?")) return;

                    await fetch("/shutdown", {
                      method: "POST",
                    });
                  }}
                  className="
    mt-6
    px-4
    py-2
    rounded-xl
    bg-red-600
    hover:bg-red-500
    text-white
  "
                >
                  Stop Server
                </button>
              </div>
            </div>
          </div>

          {connected && (
            <div
              className="
            mt-6
            bg-white/5
            border border-white/10
            backdrop-blur-xl
            rounded-3xl
            p-8
          "
            >
              <h2 className="text-white text-2xl font-semibold mb-6">Share</h2>

              <TextShare room={room} />

              <div className="mt-8">
                <FileTransfer room={room} />
                {transferActivity.length > 0 && (
                  <div className="mt-6 bg-white/5 border border-white/10 rounded-3xl p-6">
                    <h2 className="text-white text-xl font-semibold mb-4">
                      Transfer Activity
                    </h2>

                    {transferActivity.map((item, index) => (
                      <div
                        key={index}
                        className="
      border
      border-white/10
      rounded-xl
      p-4
      bg-white/5
      mb-3
    "
                      >
                        {item.type === "text" ? (
                          <>
                            <p className="text-slate-400 mb-2">
                              ↓ Text Received
                            </p>

                            <div className="bg-black/20 rounded-lg p-3 text-white break-words">
                              {item.text}
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="text-white font-medium mb-3">
                              ↓ {item.name}
                            </p>

                            <div className="flex gap-2">
                              <button
                                className="bg-indigo-600 px-4 py-2 rounded-lg text-white"
                                onClick={() =>
                                  window.open(`/uploads/${item.filename}`, "_blank")
                                }
                              >
                                Open
                              </button>

                              <button
                                className="bg-emerald-600 px-4 py-2 rounded-lg text-white"
                                onClick={() =>
                                  (window.location.href = `/download/${item.filename}`)
                                }
                              >
                                Download
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

    </>
  );
}

export default App;
