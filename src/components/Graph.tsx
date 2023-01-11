import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GraphProps {
  data: {
    filteredSevenday: any;
    filteredThirtyday: any;
  };
}

export function Graph({ data }: GraphProps) {
  const sevendayPrices = data.filteredSevenday.map((el) => {
    return { x: el.date, y: el.price };
  });
  const thirtydayPrices = data.filteredThirtyday.map((el) => {
    return { x: el.date, y: el.price };
  });

  const opt = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const cfg = {
    labels: [],
    datasets: [
      {
        label: 'Prices 7 days prior to the given date',
        data: sevendayPrices,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Prices 30 days prior to the given date',
        data: thirtydayPrices,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <div>{<Line options={opt} data={cfg} />}</div>;
}
