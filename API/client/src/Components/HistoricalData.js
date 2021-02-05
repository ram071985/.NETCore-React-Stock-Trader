import React, { Component } from "react";
import Chart from "chart.js";

class HistoricalData extends Component {
  constructor() {
    super();
    this.state = {};
  }
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: ["Jan", "Feb", "March"],
        datasets: [
          {
            label: "Sales",
            data: [86, 67, 91],
          },
        ],
      },
      options: {
        //Customize chart options
      },
    });
  }
  render() {
    return (
      <div className="container-fluid d-block container user-container">
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default HistoricalData;
