import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../services/socket";
import Card from "../components/shared/Card";
import FileTransfer from "../components/FileTransfer";
import TextShare from "../components/TextShare";

function Join() {
  const { room } = useParams();
  const [status, setStatus] = useState("Waiting...");
  const [receivedText, setReceivedText] = useState("");
  const [incomingFiles, setIncomingFiles] = useState([]);

  useEffect(() => {
    socket.emit("join-room", {
      room,
      deviceName: "Phone",
    });

    socket.on("receive-text", ({ text }) => {
      console.log("PHONE RECEIVED:", text);
      setReceivedText(text);
    });

    socket.on("incoming-file", (fileData) => {
      setIncomingFiles((prev) => [fileData, ...prev]);
    });

    socket.on("clipboard-received", ({ text }) => {
      setReceivedText(text);
    });

    return () => {
      socket.off("receive-text");
      socket.off("clipboard-received");
      socket.off("incoming-file");
    };
  }, [room]);

  useEffect(() => {
    if (!room) return;

    const handleConnect = () => {
      console.log("Phone rejoining:", room);

      socket.emit("join-room", {
        room,
        deviceName: "Phone",
      });
    };

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [room]);

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-white text-4xl font-bold text-center mb-2">
          SwiftDrop
        </h1>

        {!receivedText && incomingFiles.length === 0 && (
          <Card>
            <h2 className="text-white text-xl font-semibold mb-2">
              Ready to Receive
            </h2>

            <p className="text-slate-400">
              Files and text shared from your laptop will appear here.
            </p>
          </Card>
        )}

        {receivedText && (
          <Card className="mb-4">
            <h2 className="text-white text-xl font-semibold mb-4">
              Received Text
            </h2>

            <textarea
              rows="6"
              value={receivedText}
              readOnly
              onClick={(e) => {
                e.target.focus();
                e.target.select();
              }}
              className="
              w-full
              bg-black/30
              text-white
              rounded-xl
              p-3
              outline-none
            "
            />

            <p className="text-slate-400 text-sm mt-3">
              Tap to select all text
            </p>
          </Card>
        )}

        {incomingFiles.length > 0 && (
          <Card>
            <h2 className="text-white text-xl font-semibold mb-4">
              Received Files
            </h2>

            <div className="space-y-3">
              {incomingFiles.map((file, index) => (
                <div
                  key={index}
                  className="
            border
            border-white/10
            rounded-xl
            p-3
            bg-white/5
          "
                >
                  <p className="text-white mb-3">{file.originalName}</p>

                  <div className="flex gap-2">
                    <button
                      className="
                flex-1
                bg-indigo-600
                rounded-xl
                py-2
                text-white
              "
                      onClick={() =>
                        window.open(
                          `/uploads/${file.filename}`,
                          "_blank",
                        )
                      }
                    >
                      Open
                    </button>

                    <button
                      className="
                flex-1
                bg-emerald-600
                rounded-xl
                py-2
                text-white
              "
                      onClick={() =>
                        (window.location.href = `/download/${file.filename}`)
                      }
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        <Card className="mt-4">
          <h2 className="text-white text-xl font-semibold mb-4">
            Send Text
          </h2>

          <TextShare room={room} />
        </Card>

        <Card className="mt-4">
          <h2 className="text-white text-xl font-semibold mb-4">Send Files</h2>

          <FileTransfer room={room} />
        </Card>
      </div>
    </div>
  );
}

export default Join;
