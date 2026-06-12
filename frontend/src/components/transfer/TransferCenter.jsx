import Card from "../shared/Card";

export default function TransferCenter() {
  return (
    <Card className="p-8 mt-6">

      <h2 className="text-white text-2xl font-semibold mb-4">
        Transfers
      </h2>

      <div className="border border-dashed border-white/10 rounded-2xl p-12 text-center">

        <p className="text-slate-400">
          No active transfers
        </p>

      </div>

    </Card>
  );
}