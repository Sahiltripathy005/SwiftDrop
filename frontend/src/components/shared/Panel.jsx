function Panel({ title, children, className = "" }) {
  return (
    <div
      className={`
        bg-white/5
        border border-white/10
        backdrop-blur-xl
        rounded-3xl
        p-6
        ${className}
      `}
    >
      {title && (
        <h2 className="text-white text-xl font-semibold mb-4">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}

export default Panel;