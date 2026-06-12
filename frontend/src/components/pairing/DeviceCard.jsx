import Card from "../shared/Card";
import { Smartphone } from "lucide-react";

export default function DeviceCard() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className="bg-indigo-600 p-3 rounded-xl">
          <Smartphone color="white" />
        </div>

        <div>
          <h3 className="text-white font-semibold">Waiting...</h3>

          <p className="text-slate-400">No devices connected</p>
        </div>
      </div>
    </Card>
  );
}
