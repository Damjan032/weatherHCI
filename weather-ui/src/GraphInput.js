import React from 'react';
import { render } from 'react-dom';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import App from "./App";



function GraphInput(props) {
    const options = {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Monthly Average Temperature'
        },
        subtitle: {
            text: 'Source: WorldClimate.com'
        },
        xAxis: {
            categories:["pon","pon","pon","pon","pon","pon","pon","pon","pon","pon","pon","pon"]
            //categories: props.timeList.splice(10,props.timeList.length - 10)
        },
        yAxis: {
            title: {
                text: 'Temperature'
            },
            labels: {
                formatter: function () {
                    return this.value + '°';
                }
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
            name: 'Tokyo',
            marker: {
                symbol: 'square'
            },
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2,26.5, 23.3, 18.3, 13.9, 9.6]

        }, {
            name: 'London',
            marker: {
                symbol: 'square'
            },
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        },
            {
                name: 'Cacak',
                marker: {
                    symbol: 'square'
                },
                data: [13.9, 14.2, 15.7, 10.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
    };
  return (
      <div>
          <div>
          <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
          <p>OVDEEEEEEEEEEEE</p>
      </div>
    );
}

export default GraphInput;