function ReceivePanel({
  receivedText,
  receivedFiles,
}) {
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
        Received
      </h2>

      <div>
        <h3 className="text-white font-medium mb-3">
          Latest Text
        </h3>

        {receivedText ? (
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
        ) : (
          <div
            className="
              bg-black/20
              rounded-xl
              p-4
              text-slate-400
            "
          >
            No text received yet
          </div>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-white font-medium mb-3">
          Files
        </h3>

        {receivedFiles.length === 0 ? (
          <div
            className="
              bg-black/20
              rounded-xl
              p-4
              text-slate-400
            "
          >
            No files received yet
          </div>
        ) : (
          <div className="space-y-3">
            {receivedFiles.map((file, index) => (
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
                <p className="text-white mb-3">
                  {file.originalName}
                </p>

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
                        "_blank"
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
                      (window.location.href =
                        `/download/${file.filename}`)
                    }
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReceivePanel;