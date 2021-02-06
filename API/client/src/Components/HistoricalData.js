import React, { Component } from "react";
import Chart from "chart.js";

class HistoricalData extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  chartRef = React.createRef();

  componentDidMount() {
    let closingPrice = [];
    let closingDates = [];
    for (const item of this.props.location.state.historyData) {
      closingPrice.push(item.close);
      closingDates.push(item.date);
    }
    const myChartRef = this.chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: closingDates,
        datasets: [
          {
            label: "Sales",
            data: closingPrice,
            backgroundColor: "white",
          },
        ],
      },
      options: {
        //Customize chart options
      },
    });
    console.log(closingPrice)
  }

  sortHistoryArray = () => {
    
  };
  render() {
    return (
      <div className="container-fluid history-container">
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default HistoricalData;
