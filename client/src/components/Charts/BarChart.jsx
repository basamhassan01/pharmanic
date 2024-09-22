import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarGraph = () => {
  const salesRevenue = [36235, 34859, 37180, 37581, 35356, 38467];
  const profitPercentage = 0.2;
  const lossThreshold = 35000;
  const lossPercentage = 0.1;

  const profitData = salesRevenue.map((sales) => sales * profitPercentage);
  const lossData = salesRevenue.map((sales) =>
    sales < lossThreshold ? sales * lossPercentage : 0
  );

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales Revenue",
        data: salesRevenue,
        borderColor: "rgba(54, 162, 235, 0.6)",
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        fill: true,
      },
      {
        label: "Profit",
        data: profitData,
        borderColor: "rgba(75, 192, 192, 0.6)",
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        fill: true,
      },
      {
        label: "Loss",
        data: lossData,
        borderColor: "rgba(255, 99, 132, 0.6)",
        backgroundColor: "rgba(255, 99, 132, 0.6)",
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
        text: 'Prescription Sales Revenue',
        display: true,
        padding: {
          top: 20,
          bottom: 20,
        }
      },
    },
  };

  return <Bar data={data} options={options} />;
};