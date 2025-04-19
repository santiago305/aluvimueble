import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { BrowserGroup } from "@/types/view"

interface Props {
  browsers: BrowserGroup[];
  filter?: string;
}
function getPeriodDescription(filter: Props['filter']) {
  switch (filter) {
    case 'dias':
      return {
        subtitle: 'Últimos 60 días',
        trend: 'Incremento de visitas este mes',
      };
    case 'meses':
      return {
        subtitle: 'Últimos 30 meses',
        trend: 'Resumen del tráfico mensual',
      };
    case 'todo':
      return {
        subtitle: 'Visitas acumuladas del generales',
        trend: 'Datos históricos generales',
      };
    default:
      return {
        subtitle: 'Periodo no definido',
        trend: 'Sin datos comparativos',
      };
  }
}
function getColorForIndex(index: number): string {
  const hue = (index * 47) % 360;
  return `hsl(${hue}, 70%, 55%)`;
}
export function TableNavGeneral({ browsers, filter }: Props) {

  const chartData = browsers.map((browserData, index) => {
    const label = browserData.browser ?? 'Otro';
    return {
      label,
      visitors: browserData.visitors,
      fill: getColorForIndex(index),
    };
  });

  const totalVisitors = chartData.reduce((acc, curr) => acc + curr.visitors, 0);

  const chartConfig: ChartConfig = {
    visitors: {
      label: "Visitors",
    },
    ...chartData.reduce((config, item) => {
      config[item.label] = {
        label: item.label,
        color: item.fill,
      };
      return config;
    }, {} as ChartConfig),
  };

  const { subtitle, trend } = getPeriodDescription(filter);

  return (
    <Card className="h-full justify-center">
      <CardHeader className="items-center pb-0">
        <CardTitle>Navegadores</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
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
              dataKey="visitors"
              nameKey="label"
              innerRadius={60}
              strokeWidth={5}
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
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitantes
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {trend} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">{subtitle}</div>
      </CardFooter>
    </Card>
  );
}
