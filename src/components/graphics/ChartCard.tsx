import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartCardProps {
  title: string;
  type: 'bar' | 'line' | 'pie' | 'area' | 'donut';
  series: any;
  options: any;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, type, series, options }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <ReactApexChart
        type={type}
        series={series}
        options={options}
        height={300}
      />
    </div>
  );
};

export default ChartCard;
