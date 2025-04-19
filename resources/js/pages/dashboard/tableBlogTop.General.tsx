import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { UrlGroup } from '@/types/view';

interface Props {
  topUrls: UrlGroup[];
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

function getCleanPath(fullUrl: string): string {
  try {
    const urlObj = new URL(fullUrl, 'https://placeholder.com');
    const segments = urlObj.pathname.split('/').filter(Boolean);
    if (segments.length === 0) return 'home';
    const lastSegment = segments[segments.length - 1];
    const word = lastSegment.split('-')[0]; // Solo la primera palabra
    return `/${word}`;
  } catch {
    return 'home'; // Si no es una URL válida
  }
}

export function TableBlogTopGeneral({ topUrls, filter }: Props) {
  const sortedUrls = [...topUrls]
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 5);

  const chartData = sortedUrls.map((url, index) => ({
    url: getCleanPath(url.route),
    visitors: url.visits,
    fill: getColorForIndex(index),
  }));

  const chartConfig: ChartConfig = {
    visitors: {
      label: 'Visitors',
    },
    ...chartData.reduce((config, item) => {
      config[item.url] = {
        label: item.url,
        color: item.fill,
      };
      return config;
    }, {} as ChartConfig),
  };

  const { subtitle, trend } = getPeriodDescription(filter);

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Top 5 URLs más vistas</CardTitle>
        <span className="text-muted-foreground text-sm">{subtitle}</span>
      </CardHeader>

      <CardContent>
        <ChartContainer 
        className="text-start"
        config={chartConfig}
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 0 }}
          >
            <YAxis
              dataKey="url"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={75}
              tickFormatter={(value) => {
                const label = String(chartConfig[value as keyof typeof chartConfig]?.label ?? value);
                return label.length > 10 ? label.slice(0, 10) + '…' : label;
              }}
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="visitors" layout="vertical" radius={5} />
          </BarChart>
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
