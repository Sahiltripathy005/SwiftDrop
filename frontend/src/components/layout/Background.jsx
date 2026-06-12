export default function Background() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950" />

      <div className="absolute top-10 left-10 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
    </div>
  );
}