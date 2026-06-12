import { useEffect, useState } from "react";
import socket from "../services/socket";
import ProgressBar from "./ProgressBar";
import DropZone from "./DropZone";

function FileTransfer({ room }) {
  const [transfers, setTransfers] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  const uploadSingleFile = (file) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();

      formData.append("file", file);

      const xhr = new XMLHttpRequest();

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded * 100) / event.total);

          setProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);

          socket.emit("file-uploaded", {
            room,
            filename: data.filename,
            originalName: data.originalName,
          });

          setTransfers((prev) => [
            {
              name: data.originalName,
              status: "Sent",
              size: file.size,
              time: Date.now(),
            },
            ...prev,
          ]);

          resolve();
        } else {
          reject();
        }
      };

      xhr.onerror = reject;

      xhr.open("POST", `/upload`);

      xhr.send(formData);
    });
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;

    setUploading(true);

    try {
      for (const file of files) {
        await uploadSingleFile(file);
      }

      setMessage("✓ Files sent successfully");

      setFiles([]);
    } catch {
      setMessage("✗ Upload failed");
    }

    setUploading(false);
  };

  return (
    <div className="mt-6">
      <h3 className="text-white text-xl font-semibold mb-4">File Transfer</h3>

      <div className="space-y-4">
        <DropZone
          onFileSelect={(selectedFiles) =>
            setFiles((prev) => {
              const allFiles = [...prev, ...selectedFiles];

              return allFiles.filter(
                (file, index, self) =>
                  index ===
                  self.findIndex(
                    (f) => f.name === file.name && f.size === file.size,
                  ),
              );
            })
          }
        />

        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="
          rounded-xl
          bg-white/5
          border border-white/10
          p-3
        "
              >
                <p className="text-white">{file.name}</p>

                <p className="text-slate-400 text-sm">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ))}
          </div>
        )}

        {message && (
          <div
            className="
            rounded-xl
            border
            border-white/10
            bg-white/5
            p-3
          "
          >
            <p className="text-slate-200">{message}</p>
          </div>
        )}

        <button
          onClick={uploadFiles}
          disabled={files.length === 0 || uploading}
          className="
            px-6
            py-3
            rounded-xl
            bg-emerald-600
            hover:bg-emerald-500
            disabled:opacity-50
            disabled:cursor-not-allowed
            text-white
            font-medium
            transition
          "
        >
          {uploading
            ? "Uploading..."
            : `Upload ${files.length || ""} File${files.length === 1 ? "" : "s"}`}
        </button>

        {transfers.length > 0 && (
          <div className="space-y-3 mt-6">
            <h4 className="text-white font-semibold">Recent Transfers</h4>

            {transfers.map((transfer, index) => (
              <div
                key={index}
                className="
          rounded-xl
          border
          border-white/10
          bg-white/5
          p-4
        "
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">{transfer.name}</p>

                    <p className="text-slate-400 text-sm">
                      {(transfer.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <div className="text-emerald-400">✓ {transfer.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {uploading && <ProgressBar progress={progress} label="Uploading" />}
      </div>
    </div>
  );
}

export default FileTransfer;
