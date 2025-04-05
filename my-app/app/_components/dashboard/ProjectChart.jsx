"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  completed: {
    label: "completed", // Chrome
    color: "green",
  },
  inProgress: {
    label: "In Progress",
    color: "hsl(var(--chart-1))", // Safari
  },
  cancelled: {
    label: "Cancelled",
    color: "red",
  },
};

export default function ProjectChart({ data }) {
  const chartData = [
    {
      status: "Completed",
      value: data.completed,
      fill: chartConfig.completed.color,
    },
    {
      status: "In Progress",
      value: data.active,
      fill: chartConfig.inProgress.color,
    },
    {
      status: "Cancelled",
      value: data.inactive,
      fill: chartConfig.cancelled.color,
    },
  ];

  const totalValue = data.completed + data.active + data.inactive;

  return (
    <div className="flex flex-col border h-full rounded-md p-6 bg-muted/50">
      <div className="pb-2">
        <h2 className="text-lg font-semibold">Project Stats</h2>
        <p className="text-gray-400">Here&apos;s Your Project Stats</p>
      </div>
      <div className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="status"
              innerRadius={87}
              strokeWidth={5}
              fill={({ payload }) => payload.fill}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalValue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Projects
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
      <div className="flex mx-auto text-xs items-center gap-4">
        <div className="flex items-center gap-1 ">
          <span className="w-2 h-2 bg-green-500 rounded-sm"></span>Completed
        </div>
        <div className="flex items-center gap-1 ">
          <span className="w-2 h-2 bg-chart-1 rounded-sm"></span>Active
        </div>
        <div className="flex items-center gap-1 ">
          <span className="w-2 h-2 bg-red-500 rounded-sm"></span>Inactive
        </div>
      </div>
    </div>
  );
}
