import TextShare from "./TextShare";
import FileTransfer from "./FileTransfer";

function SendPanel({ room }) {
  return (
    <div
      className="
        bg-white/5
        border border-white/10
        backdrop-blur-xl
        rounded-3xl
        p-6
      "
    >
      <h2 className="text-white text-2xl font-semibold mb-6">
        Send
      </h2>

      <div>
        <h3 className="text-white font-medium mb-3">
          Text
        </h3>

        <TextShare room={room} />
      </div>

      <div className="mt-8">
        <h3 className="text-white font-medium mb-3">
          Files
        </h3>

        <FileTransfer room={room} />
      </div>
    </div>
  );
}

export default SendPanel;