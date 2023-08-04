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
  const occupations = useSelector((state) => state.censo.occupations);
  const persons = useSelector((state) => state.censo.persons);
  const occupationIds = persons
    .map((el) => el.ocupacion)
    .filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });
  const labels = occupations
    .filter((o) => occupationIds.includes(o.id))
    .map((o) => o.ocupacion);

  const counts = persons
    .map((el) => el.ocupacion)
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
              Gráfico de personas por ocupación
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
