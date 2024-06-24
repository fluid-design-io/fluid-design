'use client'

import { useEffect, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { cn } from 'ui/lib/utils'

const data = [
  {
    amt: 2400,
    name: 'Page A',
    pv: 2400,
    uv: 4000,
  },
  {
    amt: 2210,
    name: 'Page B',
    pv: 1398,
    uv: 3000,
  },
  {
    amt: 2290,
    name: 'Page C',
    pv: 9800,
    uv: 2000,
  },
  {
    amt: 2000,
    name: 'Page D',
    pv: 3908,
    uv: 2780,
  },
  {
    amt: 2181,
    name: 'Page E',
    pv: 4800,
    uv: 1890,
  },
  {
    amt: 2500,
    name: 'Page F',
    pv: 3800,
    uv: 2390,
  },
  {
    amt: 2100,
    name: 'Page G',
    pv: 4300,
    uv: 3490,
  },
]

const OverView = () => {
  return (
    <ResponsiveContainer height={350} width="100%">
      <AreaChart data={data} height={350} width={350}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis className="stroke-border/30 text-xs" dataKey="name" />
        <YAxis className="stroke-border/30 text-xs" />
        <Tooltip
          contentStyle={{
            backdropFilter: 'blur(10px)',
            backgroundColor: 'hsl(var(--background)/0.8)',
            border: '1px solid hsl(var(--border))',
            borderRadius: '0.5rem',
            boxShadow: '0 0 10px hsl(var(--primary-800)/0.2)',
            fontWeight: 600,
          }}
          itemStyle={{
            color: 'hsl(var(--foreground)/0.75)',
            fontSize: '0.8rem',
          }}
          labelStyle={{
            color: 'hsl(var(--foreground))',
            fontSize: '0.8rem',
          }}
        />
        <Area
          className="[&_*]:transition-colors"
          dataKey="uv"
          fill="hsl(var(--accent-700))"
          stackId="1"
          stroke="hsl(var(--accent-700))"
          type="monotone"
        />
        <Area
          className="[&_*]:transition-colors"
          dataKey="pv"
          fill="hsl(var(--secondary-700))"
          stackId="1"
          stroke="hsl(var(--secondary-700))"
          type="monotone"
        />
        <Area
          className="[&_*]:transition-colors"
          dataKey="amt"
          fill="hsl(var(--primary-700))"
          stackId="1"
          stroke="hsl(var(--primary-700))"
          type="monotone"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

const BreakDown = ({ factor, seed, title, unit }) => {
  const r = () => Math.random() * 90 * factor + 10
  const [pieData, setPieData] = useState([
    { name: 'Group A', value: 0 },
    { name: 'Group B', value: 0 },
    { name: 'Group C', value: 0 },
  ])
  const FILLS = [
    ['hsl(var(--primary-400))', 'hsl(var(--primary-600))', 'hsl(var(--primary-800))'],
    ['hsl(var(--secondary-400))', 'hsl(var(--secondary-600))', 'hsl(var(--secondary-800))'],
    ['hsl(var(--accent-400))', 'hsl(var(--accent-600))', 'hsl(var(--accent-800))'],
  ]
  const STOKES = ['hsl(var(--primary)/0.5)', 'hsl(var(--secondary)/0.5)', 'hsl(var(--acceny)/0.5)']
  const total = Math.round(pieData.reduce((acc, cur) => acc + cur.value, 0))
  useEffect(() => {
    setPieData([
      { name: 'Group A', value: r() },
      { name: 'Group B', value: r() },
      { name: 'Group C', value: r() },
    ])
  }, [])
  return (
    <div className="relative h-full w-full">
      <ResponsiveContainer height={280} width="100%">
        <PieChart className="w-[200px] md:w-[280px]" height={280}>
          <Pie cx="50%" cy={140} data={pieData} dataKey="value" innerRadius={90} outerRadius={125} paddingAngle={5}>
            {data.map((entry, index) => (
              <Cell
                className="[&_*]:transition-colors"
                fill={FILLS[seed][index % FILLS.length]}
                key={`cell-${index}`}
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
  )
}

export default function VisChart() {
  const cardStyle =
    'w-full flex flex-col items-center space-y-2 rounded-lg border border-border/50 p-4 transition-all hover:border-border hover:bg-muted/30 hover:shadow'
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-stretch space-y-4 py-8 md:space-y-8">
      <div className="flex w-full snap-x flex-row overflow-y-hidden px-4 sm:px-6 lg:px-8 [&::-webkit-scrollbar]:[-webkit-appearance:none]">
        <div
          className={cn(
            cardStyle,
            'mr-4 w-11/12 min-w-[77vw] snap-start scroll-ml-4 sm:min-w-[320px] sm:scroll-ml-8 md:mr-8'
          )}
        >
          <BreakDown factor={10} seed={0} title="USA" unit="kg" />
        </div>
        <div
          className={cn(
            cardStyle,
            'mr-4 w-11/12 min-w-[77vw] snap-start scroll-ml-4 sm:min-w-[320px] sm:scroll-ml-8 md:mr-8'
          )}
        >
          <BreakDown factor={5} seed={1} title="China" unit="kg" />
        </div>
        <div className={cn(cardStyle, 'w-11/12 min-w-[77vw] snap-start scroll-ml-4 sm:min-w-[320px] sm:scroll-ml-8')}>
          <BreakDown factor={2} seed={2} title="India" unit="kg" />
        </div>
      </div>
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className={cn(cardStyle)}>
          <div className="flex w-full flex-col items-start justify-start space-y-1.5 p-6">
            <h2 className="text-2xl font-semibold leading-none tracking-tight">Emission Overview</h2>
            <p className="w-11/12 max-w-md text-sm text-muted-foreground sm:w-4/5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptate, quia, quos, natus voluptates
              quod quas quibusdam exercitationem voluptatum autem quae.
            </p>
          </div>
          <OverView />
        </div>
      </div>
    </div>
  )
}
