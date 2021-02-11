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
      closingDates.push(moment(item.date).format("l"));
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
                //  display: false,
                opacity: "0.8",
                color: "#bbbbbb",
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontSize: "10",
                fontColor: "white",
              },
              gridLines: {
                drawBorder: true,
                //display: false,
                color: "#bbbbbb",
              },
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
      <div>
        <h1 style={{ color: "white" }} className="text-center mt-3">
          {this.props.location.state.companyName}
        </h1>
        <h6 style={{ color: "#dadada" }} className="text-center mb-3">
          Closing Price Performance Over The Past Month
        </h6>
        <div className="container-fluid history-container">
          <canvas id="myChart" ref={this.chartRef} className="mb-3" />
        </div>
      </div>
    );
  }
}

export default HistoricalData;
