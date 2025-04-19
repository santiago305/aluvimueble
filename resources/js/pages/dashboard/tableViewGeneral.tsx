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
import { DeviceDailyGroup } from "@/types/view";

interface props {
  deviceData: DeviceDailyGroup[];
}

export default function TabletViewGeneral({ deviceData }: props) {
  const chartData = React.useMemo(() => {
    return deviceData.map((entry) => ({
      date: entry.date,
      desktop: entry.desktop,
      mobile: entry.mobile,
      tablet: entry.tablet,
    }));
  }, [deviceData]);

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
  } satisfies ChartConfig;

  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("desktop");

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      tablet: chartData.reduce((acc, curr) => acc + curr.tablet, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    [chartData]
  );

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
        {Object.keys(chartConfig).filter((key): key is keyof typeof total => key in total).map((chart) => (
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
                {total[chart].toLocaleString()}
              </span>
            </button>
          ))}
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
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
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
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("es-ES", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                />
              }
            />
            <Bar
              dataKey={activeChart}
              fill={
                (activeChart !== "views"
                  ? chartConfig[activeChart].color
                  : "#000000")
              }
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
