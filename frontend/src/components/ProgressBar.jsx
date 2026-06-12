function ProgressBar({ progress, label = "Uploading" }) {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <span className="text-slate-300 text-sm">{label}</span>

        <span className="text-white font-medium">{progress}%</span>
      </div>

      <div
        className="
        h-3
        w-full
        rounded-full
        bg-white/10
        overflow-hidden
      "
      >
        <div
          className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-indigo-500
            to-cyan-400
            transition-all
            duration-300
          "
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
