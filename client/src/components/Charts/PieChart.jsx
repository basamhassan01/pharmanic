import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';

ChartJS.register(
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

export const PieGraph = () => {
  const prescription = [30, 25, 19];

  const data = {
    labels: ["Antibiotics", "Painkillers", "Antivirals"],
    datasets: [
      {
        label: "Sales Revenue",
        data: prescription,
        borderColor: "white",
        backgroundColor: [
            "rgba(255, 99, 132, 0.6)",  
            "rgba(54, 162, 235, 0.6)",  
            "rgba(255, 206, 86, 0.6)", 
            "rgba(75, 192, 192, 0.6)"    
        ],
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom', 
        align: 'center', 
      },
      title: {
        text: 'Prescription Destribution by Category',
        display: true,
        padding: {
          top: 20,
          bottom: 20,
        }
      },
    },
  };

  return <Pie data={data} options={options} />;
};
