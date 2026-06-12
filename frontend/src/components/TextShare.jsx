import { useState } from "react";
import socket from "../services/socket";

function TextShare({ room }) {
  const [text, setText] = useState("");

  const sendText = () => {
    if (!text.trim()) return;

    socket.emit("send-text", {
      room,
      text,
    });

    // Keep text after sending
  };

  const clearText = () => {
    setText("");
  };

  return (
    <div className="space-y-4">
      <textarea
        rows="6"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste text..."
        className="
          w-full
          rounded-2xl
          bg-black/30
          border
          border-white/10
          text-white
          p-4
          resize-none
          outline-none
          focus:border-indigo-500
        "
      />

      <div className="flex gap-3">
        <button
          onClick={sendText}
          className="
            px-6
            py-3
            rounded-xl
            bg-indigo-600
            hover:bg-indigo-500
            text-white
            font-medium
            transition
          "
        >
          Send Text
        </button>

        <button
          onClick={clearText}
          className="
            px-6
            py-3
            rounded-xl
            bg-white/10
            hover:bg-white/20
            text-white
            font-medium
            transition
          "
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default TextShare;