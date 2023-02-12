import moment from "moment";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import API from "../API";
import { Employee } from "../employee";

const Chart: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const getEmployees = await API.getEmployees();
      setEmployees(getEmployees);


      const chartData = createChartData(getEmployees);
      setChartData(chartData);
    };

    fetchData();

  }, []);

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

    return {
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
    };
  };

  return (
    <div>
      <h2>Employee Join Year Chart</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default Chart;