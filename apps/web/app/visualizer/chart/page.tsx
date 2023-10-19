"use client";

import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
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

export default function VisChart() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center space-y-2 rounded-lg border border-border/50 p-4 transition-all hover:border-border hover:bg-muted/30 hover:shadow">
        <div className="flex flex-col space-y-1.5 p-6">
          <h2 className="text-2xl font-semibold leading-none tracking-tight">
            Emission Overview
          </h2>
          <p className="text-sm text-muted-foreground">
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
