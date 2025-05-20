//pagina
import React, { useEffect, useState } from "react";
import ChartCard from "../components/graphics/ChartCard";
import {
  fetchPieData,
  fetchBarData,
  fetchLineData,
} from "../services/chartService";
import { PieDataItem, BarDataItem, LineDataItem } from "../types/chartType";

const Dashboard = () => {
  const [pieData, setPieData] = useState<{
    neighborhoods: string[];
    percentages: number[];
  }>({ neighborhoods: [], percentages: [] });
  const [barData, setBarData] = useState<{
    categories: string[];
    units: number[];
  }>({ categories: [], units: [] });
  const [lineData, setLineData] = useState<{
    month: string[];
    orders: number[];
  }>({ month: [], orders: [] });

  useEffect(() => {
    const loadData = async () => {
      try {
        const pie: PieDataItem[] = await fetchPieData();
        const bar: BarDataItem[] = await fetchBarData();
        const line: LineDataItem[] = await fetchLineData();

        setPieData({
          neighborhoods: pie.map((p) => p.neighborhood),
          percentages: pie.map((p) => p.percentage),
        });

        setBarData({
          categories: bar.map((b) => b.product),
          units: bar.map((b) => b.units),
        });

        setLineData({
          month: line.map((l) => l.month),
          orders: line.map((l) => l.orders),
        });
      } catch (error) {
        console.error("Error cargando datos de los gráficos", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <ChartCard
        title="Pedidos por Barrio"
        type="pie"
        series={pieData.percentages}
        options={{
          labels: pieData.neighborhoods, // ✅ nombre correcto para ApexCharts
          legend: { position: "bottom" },
        }}
      />

      <ChartCard
        title="Ventas por Producto"
        type="bar"
        series={[{ name: "Ventas", data: barData.units }]} // Usa units no percentages
        options={{
          chart: { id: "ventas-producto" },
          xaxis: { categories: barData.categories },
        }}
      />

      <ChartCard
        title="Pedidos Mensuales"
        type="line"
        series={[{ name: "Pedidos", data: lineData.orders }]} // orders no percentages
        options={{
          chart: { id: "pedidos-mensuales" },
          xaxis: { categories: lineData.month }, // month no categories
        }}
      />
    </div>
  );
};

export default Dashboard;
