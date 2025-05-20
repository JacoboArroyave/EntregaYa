import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartCardProps {
  title: string;
  type: 'bar' | 'line' | 'pie';
  series: any;
  options: any;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, type, series, options }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md min-w-full min-h-[350px]">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <ReactApexChart
        key={JSON.stringify(series)}
        type={type}
        series={series}
        options={options}
        height={300}
        width="100%"
      />
    </div>
  );
};

export default ChartCard;
