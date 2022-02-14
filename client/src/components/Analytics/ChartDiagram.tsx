import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  chartData: number[];
  labels: string[];
  title: string;
}

function ChartDiagram({ chartData, labels, title }: Props) {
  /* ----- CONSTANTS ----- */
  const colorsPalette = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(255, 159, 64, 0.5)',
    'rgba(200, 120, 10, 0.5)',
    'rgba(0, 120, 59, 0.5)',
    'rgba(184, 50, 29, 0.5)',
    'rgba(24, 25, 43, 0.5)',
    'rgba(255, 20, 130, 0.5)',
    'rgba(200, 130, 20, 0.5)',
    'rgba(150, 20, 1, 0.5)',
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        // label: '# of Votes',
        data: chartData,
        backgroundColor: colorsPalette.splice(0, chartData.length),
        borderColor: colorsPalette.splice(0, chartData.length),
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: true,
        labels: {
          color: 'darkGrey',
          font: {
            size: 8,
          },
        },
        title: {
          display: true,
          text: title,
          font: { size: 16, weight: 'bold' },
          color: 'whiteSmoke',
        },
      },
    },
  };

  return <Pie data={data} options={pieOptions} />;
}

export default ChartDiagram;
