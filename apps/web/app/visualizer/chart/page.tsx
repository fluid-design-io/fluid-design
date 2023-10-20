"use client";

import { Pi } from "lucide-react";
import React, { PureComponent, useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ScrollArea, ScrollBar } from "ui/components/ui/scroll-area";
import { cn } from "ui/lib/utils";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const OverView = () => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart width={350} height={350} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" className="stroke-border/30 text-xs" />
        <YAxis className="stroke-border/30 text-xs" />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background)/0.8)",
            borderRadius: "0.5rem",
            border: "1px solid hsl(var(--border))",
            backdropFilter: "blur(10px)",
            fontWeight: 600,
            boxShadow: "0 0 10px hsl(var(--primary-800)/0.2)",
          }}
          labelStyle={{
            color: "hsl(var(--foreground))",
            fontSize: "0.8rem",
          }}
          itemStyle={{
            color: "hsl(var(--foreground)/0.75)",
            fontSize: "0.8rem",
          }}
        />
        <Area
          type="monotone"
          dataKey="uv"
          stackId="1"
          stroke="hsl(var(--primary-700))"
          fill="hsl(var(--primary-700))"
          className="[&_*]:transition-colors"
        />
        <Area
          type="monotone"
          dataKey="pv"
          stackId="1"
          stroke="hsl(var(--secondary-700))"
          fill="hsl(var(--secondary-700))"
          className="[&_*]:transition-colors"
        />
        <Area
          type="monotone"
          dataKey="amt"
          stackId="1"
          stroke="hsl(var(--accent-700))"
          fill="hsl(var(--accent-700))"
          className="[&_*]:transition-colors"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const BreakDown = ({ title, unit, factor, seed }) => {
  const r = () => Math.random() * 90 * factor + 10;
  const [pieData, setPieData] = useState([
    { name: "Group A", value: 0 },
    { name: "Group B", value: 0 },
    { name: "Group C", value: 0 },
  ]);
  const FILLS = [
    [
      "hsl(var(--primary-400))",
      "hsl(var(--primary-600))",
      "hsl(var(--primary-800))",
    ],
    [
      "hsl(var(--secondary-400))",
      "hsl(var(--secondary-600))",
      "hsl(var(--secondary-800))",
    ],
    [
      "hsl(var(--accent-400))",
      "hsl(var(--accent-600))",
      "hsl(var(--accent-800))",
    ],
  ];
  const STOKES = [
    "hsl(var(--primary)/0.5)",
    "hsl(var(--secondary)/0.5)",
    "hsl(var(--acceny)/0.5)",
  ];
  const total = Math.round(pieData.reduce((acc, cur) => acc + cur.value, 0));
  useEffect(() => {
    setPieData([
      { name: "Group A", value: r() },
      { name: "Group B", value: r() },
      { name: "Group C", value: r() },
    ]);
  }, []);
  return (
    <div className="relative h-full w-full">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart className="w-[200px] md:w-[280px]" height={280}>
          <Pie
            data={pieData}
            cx="50%"
            cy={140}
            innerRadius={90}
            outerRadius={125}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                className="[&_*]:transition-colors"
                fill={FILLS[seed][index % FILLS.length]}
                stroke={STOKES[seed]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex translate-y-2 items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-2">
          <h2 className="text-2xl font-semibold leading-none tracking-tight">
            {total} {unit}
          </h2>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default function VisChart() {
  const cardStyle =
    "w-full flex flex-col items-center space-y-2 rounded-lg border border-border/50 p-4 transition-all hover:border-border hover:bg-muted/30 hover:shadow";
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-stretch space-y-4 px-4 py-8 sm:px-6 md:space-y-8 lg:px-8">
      <ScrollArea className="w-full">
        <div className="flex min-w-[60rem]">
          <div className={cn(cardStyle, "mr-4 md:mr-8")}>
            <BreakDown title="USA" unit="kg" factor={10} seed={0} />
          </div>
          <div className={cn(cardStyle, "mr-4 md:mr-8")}>
            <BreakDown title="China" unit="kg" factor={5} seed={1} />
          </div>
          <div className={cn(cardStyle)}>
            <BreakDown title="India" unit="kg" factor={2} seed={2} />
          </div>
        </div>
        <ScrollBar className="invisible md:visible" orientation="horizontal" />
      </ScrollArea>
      <div className={cardStyle}>
        <div className="flex w-full flex-col items-start justify-start space-y-1.5 p-6">
          <h2 className="text-2xl font-semibold leading-none tracking-tight">
            Emission Overview
          </h2>
          <p className="w-11/12 max-w-md text-sm text-muted-foreground sm:w-4/5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptate, quia, quos, natus voluptates quod quas quibusdam
            exercitationem voluptatum autem quae.
          </p>
        </div>
        <OverView />
      </div>
    </div>
  );
}
