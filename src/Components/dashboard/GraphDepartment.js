import React from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Graph = () => {
  const departments = useSelector((state) => state.censo.departments);
  const persons = useSelector((state) => state.censo.persons);
  const departmentIds = persons
    .map((el) => el.departamento)
    .filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });

  const labels = departments
    .filter((o) => departmentIds.includes(o.id))
    .map((o) => o.nombre);

  const counts = persons
    .map((el) => el.departamento)
    .reduce((obj, value) => {
      if (value in obj) {
        obj[value]++;
      } else {
        obj[value] = 1;
      }
      return obj;
    }, {});

  // Get the count values as an array
  const countValues = Object.values(counts);
  const data = {
    labels,
    datasets: [
      {
        label: "personas",
        data: countValues,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div className="box-4">
      <div className="content-box">
        <h2>
          <font style={{ verticalAlign: "inherit" }}>
            <font style={{ verticalAlign: "inherit" }}>
              Gráfico de personas por departamento
            </font>
          </font>
        </h2>
        <div className="chart-form">
          <Bar data={data} />
        </div>
      </div>
    </div>
  );
};

export default Graph;
