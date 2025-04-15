"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartContainer,
} from "@/components/ui/chart";

const chartConfig = {
  assignedCount: {
    label: "Assigned",
    color: "hsl(var(--chart-1))",
  },
  completedCount: {
    label: "Completed",
    color: "hsl(var(--chart-2))",
  },
};

export default function DailyTaskChart({ data }) {
  return (
    <Card className="rounded-md bg-sidebar">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Task-Completion Stats</CardTitle>
          <CardDescription>Showing task-completion stats</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ResponsiveContainer width="100%" height={250}>
          <ChartContainer config={chartConfig}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="fillAssigned" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={chartConfig.assignedCount.color}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartConfig.assignedCount.color}
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={chartConfig.completedCount.color}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartConfig.completedCount.color}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="_id"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="assignedCount"
                type="monotone"
                fill="url(#fillAssigned)"
                stroke={chartConfig.assignedCount.color}
                stackId="a"
              />
              <Area
                dataKey="completedCount"
                type="monotone"
                fill="url(#fillCompleted)"
                stroke={chartConfig.completedCount.color}
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
