import moment from "moment";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import API from "../API";
import { Employee } from "../employee";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// import { dat } from "react-chartjs-2/dist/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const [chartData, setChartData] = useState<any>({
    labels: labels,
    datasets: [{
      label: 'Expenses by Month',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgb(153, 102, 255)'
      ],
      borderColor: [
        'rgb(153, 102, 255)'
      ],
      borderWidth: 1
    }]
  });

  useEffect(() => {
    const fetchData = async () => {
      const getEmployees = await API.getEmployees();
      setEmployees(getEmployees);

      // const chartData = createChartData(getEmployees);
      createChartData(getEmployees);
      // setChartData(chartData);
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
