import Card from "../shared/Card";

export default function QRPanel({ children }) {
  return (
    <Card className="p-8">
      <h2 className="text-white text-2xl font-semibold mb-6">
        Connect Device
      </h2>

      <div className="flex justify-center">
        {children}
      </div>

      <p className="text-slate-400 text-center mt-5">
        Scan with your phone
      </p>
    </Card>
  );
}