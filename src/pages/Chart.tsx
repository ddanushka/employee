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
    datasets: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const employees = await API.getEmployees();
      const years: { [key: string]: number } = {};
      pastYears(10).forEach((y) => {
        years[y] = 0;
      })
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
            backgroundColor: "#bfebc5",
            borderColor: "#00ad18",
            borderWidth: 1
          }
        ]
      });
    };
    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Emplyee growth over the years',
      },
    },
  };

  const pastYears = (back: number) => {
    const year = new Date().getFullYear();
    return Array.from({ length: back }, (v, i) => year - back + i + 1);
  }

  return (
    <div>
      <h2>Employee Join Year Chart</h2>
      <Bar data={chartData} options={options} height={90} />
    </div>
  );
};

export default Chart;
