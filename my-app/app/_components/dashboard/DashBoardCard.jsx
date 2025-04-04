import { CheckCircle } from "lucide-react";

function DashBoardCard({ value, label, status }) {
  return (
    <div className="rounded-xl bg-[#161618] p-6 border border-gray-700 relative overflow-hidden">
      <p className="text-gray-400 text-sm">{label}</p>
      <h1 className="text-5xl font-bold text-white">{value}</h1>
      <p className="text-green-500 text-sm flex items-center gap-1">
        {status} <CheckCircle size={16} />
      </p>
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-green-500 rounded-full"></div>
    </div>
  );
}

export default DashBoardCard;
