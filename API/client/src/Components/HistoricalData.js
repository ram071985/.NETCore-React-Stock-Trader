import React, { Component } from "react";
import Chart from "chart.js";

class HistoricalData extends Component {
  constructor() {
    super();
    this.state = {
      historyArray: []
    };
  }
  chartRef = React.createRef();

  componentDidMount() {
    this.sortHistoryArray();
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
            backgroundColor: 'white'
          },
        ],
      },
      options: {
        //Customize chart options
      },
    });
  }

  sortHistoryArray = () => {
    this.setState({
      historyArray: this.props.historyData
    })
  }
  render() {
    console.log(this.props.historyData)
    return (
      <div className="container-fluid history-container">
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default HistoricalData;
