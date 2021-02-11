import React, { Component } from "react";
import Chart from "chart.js";
import moment from "moment";
Chart.defaults.global.elements.line.tension = 0;

class HistoricalData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  chartRef = React.createRef();

  componentDidMount() {
    let closingPrice = [];
    let closingDates = [];
    for (const item of this.props.location.state.historyData) {
      closingPrice.push(item.close);
      closingDates.push(moment(item.date).format("MMM Do YY"));
    }
    const myChartRef = this.chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: "line",
      data: {
        fontColor: "white",
        labels: closingDates,
        datasets: [
          {
            label: "Daily Closing Price",
            data: closingPrice,
            fill: false,
            borderColor: "#dc3545",
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontColor: "white",
            color: "white",
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "white",
              },
              gridLines: {
                color: "#bbbbbb", 
              }
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: "white",
              },
              gridLines: {
                color: "#bbbbbb", 
              }
            },
          ],
        },
      },
    });
    console.log(closingPrice);
  }

  sortHistoryArray = () => {};
  render() {
    return (
      <div className="container-fluid history-container">
        <h1 style={{ color: "white" }} className="text-center">{this.props.location.state.companyName}</h1>
        <h4 style={{ color: "#dadada" }}className="text-center">Closing Price Performance Over The Past Month</h4>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default HistoricalData;
