import socket from "../services/socket";

function ClipboardSync({ room }) {
  const sendClipboard = async () => {
    try {
      console.log(navigator.clipboard);
      const text = await navigator.clipboard.readText();

      socket.emit("clipboard-sync", {
        room,
        text,
      });

      alert("Clipboard Sent");
    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={sendClipboard}>Send Clipboard</button>;
}

export default ClipboardSync;
