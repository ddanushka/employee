import moment from "moment";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import API from "../services/employees";
import { Employee } from "../interfaces/employee";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart: React.FC = () => {

  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [{}]
  });

  useEffect(() => {
    const fetchData = async () => {
      const getEmployees = await API.getEmployees();
      createChartData(getEmployees);
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const createChartData = (employees: Employee[]) => {
    const years: { [key: string]: number } = {};
    employees.forEach((employee: Employee) => {
      const year = moment(employee.joinedDate).year();
      if (!years[year]) {
        years[year] = 0;
      }

      years[year]++;
    });

    const labels = Object.keys(years);
    const data = Object.values(years);

    setChartData({
      labels,
      datasets: [
        {
          label: "Number of Employees",
          data,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1
        }
      ]
    });
  };

  return (
    <div>
      <h2>Employee Join Year Chart</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Chart;
