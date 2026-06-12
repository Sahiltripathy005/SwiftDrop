export default function Card({ children, className = "" }) {
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
      {children}
    </div>
  );
}
