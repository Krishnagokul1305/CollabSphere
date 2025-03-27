function DashBoardCard({ data, label }) {
  return (
    <div className="rounded-xl bg-muted/50 p-6 space-y-2 border">
      <p className="text-gray-400 text-sm flex justify-between items-center">
        {label} <span className="text-gray-500 ">{data.icon}</span>
      </p>
      <h1 className="text-3xl font-bold">{data.value}</h1>
      <p className="text-green-500 text-sm">{data.change}</p>
    </div>
  );
}

export default DashBoardCard;
