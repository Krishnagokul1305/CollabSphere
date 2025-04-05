const colorMap = {
  blue: "text-blue-500 from-blue-500",
  green: "text-green-500 from-green-500",
  orange: "text-orange-500 from-orange-500",
  red: "text-red-500 from-red-500",
};

function TaskStats({ data }) {
  return (
    <div className="relative overflow-hidden rounded-md bg-sidebar p-6 ring-1 ring-white/10">
      <div className="grid gap-y-2">
        <div className="flex items-center gap-x-2">
          <span className="text-sm font-medium text-gray-400">
            {data.label}
          </span>
        </div>

        <div className="text-3xl ms-5 font-semibold tracking-tight dark:text-white text-black">
          {data.value}
        </div>

        <div className={`flex items-center gap-x-1 `}>
          <span className="text-gray-400 text-sm">{data.description}</span>
          {"  "}
          {data.icon}
        </div>
      </div>

      <div
        className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${
          colorMap[data.color]
        } to-transparent transform rotate-[-2deg] origin-bottom-left`}
      />
    </div>
  );
}

export default TaskStats;
