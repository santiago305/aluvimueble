import { Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { GeoData, ViewListProps } from "@/types/view"
import { useEffect, useState } from "react"
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "#2662D9",
    },
    safari: {
      label: "Safari",
      color: "#E23670",
    },
    firefox: {
      label: "Firefox",
      color: "#E88C30",
    },
    edge: {
      label: "Edge",
      color: "#AF57DB",
    },
    other: {
      label: "Other",
      color: "#2EB88A",
    },
  } satisfies ChartConfig

export function TableDepartmentsGeneral({ views }:ViewListProps) {

  const [geoDataList, setGeoDataList] = useState<GeoData[]>([]);

  useEffect(() => {
    const fetchGeoData = async () => {
      const uniqueIps = Array.from(new Set(views.map(view => view.ip)));
      const geoDataPromises = uniqueIps.map(async ip => {
        const response = await fetch(`https://freeip2geo.net/api?ip=${ip}`);
        const data = await response.json();
        return { ip, ...data };
      });
      const results = await Promise.all(geoDataPromises);
      setGeoDataList(results);
    };

    fetchGeoData();
  }, [views]);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Departamentos donde nos ven más</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey="visitors" />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
            {geoDataList.map((geo, index) => (
              <li key={index}>
                IP: {geo.ip} - País: {geo.country_name} - Región: {geo.region_name} - Ciudad: {geo.city}
              </li>
            ))}
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
