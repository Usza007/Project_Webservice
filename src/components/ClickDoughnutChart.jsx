import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../styles/ClickDoughnutChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function ClickDoughnutChart({ clickSummary }) {
  const data = {
    labels: clickSummary.map((item) => item.name),
    datasets: [
      {
        label: 'จำนวนคลิก',
        data: clickSummary.map((item) => item.click_count),
        backgroundColor: [
            '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796',
            '#5a5c69', '#20c9a6', '#ff6384', '#6f42c1', '#fd7e14', '#17a2b8',
            '#6610f2', '#dc3545', '#007bff', '#ffc107', '#28a745', '#6c757d',
            '#343a40', '#00cec9', '#e17055', '#d63031', '#fdcb6e', '#00b894',
            '#0984e3', '#6c5ce7', '#fab1a0', '#ff7675', '#55efc4', '#81ecec'
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className='doughnut-chart-container'>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default ClickDoughnutChart;
