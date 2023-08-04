import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Graph = () => {
  const data = {
    labels: ["remain", "last"],
    datasets: [
      {
        label: "dias",
        data: [3, 5],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="box-4">
      <div className="content-box">
        <h2>
          <font style={{ verticalAlign: "inherit" }}>
            <font style={{ verticalAlign: "inherit" }}>
              Tiempo restante para que finalice el censo:
            </font>
          </font>
        </h2>
        <div className="chart-form">
          <Doughnut data={data} />
        </div>
      </div>
    </div>
  );
};

export default Graph;
