function StatusBadge({ connected }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`
          h-3 w-3 rounded-full
          ${connected ? "bg-green-500" : "bg-yellow-500"}
        `}
      />

      <span className="text-white">
        {connected
          ? "Phone Connected"
          : "Waiting for Device"}
      </span>
    </div>
  );
}

export default StatusBadge;