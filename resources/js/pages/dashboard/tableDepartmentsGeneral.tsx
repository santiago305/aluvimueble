import { Pie, PieChart } from "recharts"
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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { RegionGroup } from "@/types/view"
import { TrendingUp } from "lucide-react";

interface Props {
  regions: RegionGroup[];
  filter?: string;
}

function getColorForIndex(index: number): string {
  const hue = (index * 47) % 360;
  return `hsl(${hue}, 70%, 55%)`;
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

export function TableDepartmentsGeneral({ regions, filter }: Props) {
  const regionChartData = regions.map((region, index) => ({
    region: region.region ?? 'Desconocido',
    visitors: region.visitors,
    fill: getColorForIndex(index),
  }));

  const regionChartConfig = {
    visitors: { label: "Visitors" },
    ...regionChartData.reduce((config, item) => {
      config[item.region] = {
        label: item.region,
        color: item.fill,
      };
      return config;
    }, {} as ChartConfig),
  };
  const { subtitle, trend } = getPeriodDescription(filter);
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Departamentos donde nos ven</CardTitle>
        <CardDescription>
          {subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={regionChartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={regionChartData} dataKey="visitors" nameKey="region" />
            <ChartLegend
              content={<ChartLegendContent nameKey="region" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {trend} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">{subtitle}</div>
      </CardFooter>
    </Card>
  );
}
