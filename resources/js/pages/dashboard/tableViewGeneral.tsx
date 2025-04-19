import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ViewListProps } from "@/types/view";
const chartData = [
  
  { date: "2024-04-02", desktop: 97, mobile: 180, tablet: 500 },
  { date: "2024-04-03", desktop: 167, mobile: 120, tablet: 500 },
  { date: "2024-04-04", desktop: 242, mobile: 260, tablet: 500 },
  { date: "2024-04-05", desktop: 373, mobile: 290, tablet: 500 },
  { date: "2024-04-06", desktop: 301, mobile: 340, tablet: 500 },
  { date: "2024-04-07", desktop: 245, mobile: 180, tablet: 500 },
  { date: "2024-04-08", desktop: 409, mobile: 320, tablet: 500 },
  { date: "2024-04-09", desktop: 59, mobile: 110, tablet: 500 },
]

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "#2EB88A",
  },
  tablet: {
    label: "Tablet",
    color: "#255ED1",
  },
  mobile: {
    label: "Mobile",
    color: "#E82020",
  },
} satisfies ChartConfig

export default function TabletViewGeneral({ views }: ViewListProps) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop")
  
  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      tablet:  chartData.reduce((acc, curr) => acc + curr.tablet, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Visitas a la pagina</CardTitle>
          <CardDescription>
            personas que visitan nuestra pagina
          </CardDescription>
        </div>
        <div className="flex">
          {["desktop", "tablet", "mobile"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
