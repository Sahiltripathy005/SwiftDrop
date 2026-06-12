export default function Button({
  children,
  onClick,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`
        rounded-2xl
        px-5
        py-3
        font-medium
        bg-indigo-600
        hover:bg-indigo-500
        transition-all
        duration-200
        text-white
        ${className}
      `}
    >
      {children}
    </button>
  );
}