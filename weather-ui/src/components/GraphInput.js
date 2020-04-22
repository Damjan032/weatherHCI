import React from 'react';
import CanvasJSReact from '../CanvasJS/canvasjs.react';

let CanvasJSChart = CanvasJSReact.CanvasJSChart;
let updateInterval = 2000;
let yForma = "#";
let sufix = "";

class GraphInput extends React.Component {
    constructor(props) {
        super(props);
        this.updateChart = this.updateChart.bind(this);
    }

    componentDidMount() {
        this.updateChart();
        setInterval(this.updateChart, updateInterval);
    }

    toggleDataSeries(e) {
        e.dataSeries.visible = !(typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible);
        this.chart.render();
    }

    updateChart() {
        let len5d = this.props.citis5Days.length;
        let numToRem = -1;
        for (let i = 0 ; i < len5d-1; i++){
            for(let j = i+1; j < len5d; j++)
            {
                if(this.props.citis5Days[i].name === this.props.citis5Days[j].name){
                    numToRem = j;
                }
            }
        }
        if(numToRem!==-1){
            this.props.citis5Days.splice(numToRem, 1)
        }

        if (this.props.days === "1") {
            this.chart.options.axisX.title = "Predictions in next 24h"
        } else {
            this.chart.options.axisX.title = "Predictions in next " + this.props.days + " days"
        }
        this.chart.options.data = [];
        let len = this.props.citis5Days.length;
        yForma = "";
        if (this.props.param === "Pressure") {
            yForma = "#";
            this.chart.options.axisY.suffix = " mab";
        }
        if (this.props.param === "Humidity") {
            yForma = "#";
            this.chart.options.axisY.suffix = " %";
        }
        if (this.props.param === "Temperature") {
            yForma = "#";
            this.chart.options.axisY.suffix = '\u2103';
        }
        if (this.props.param === "Wind") {
            yForma = "#,#";
            this.chart.options.axisY.suffix = " m/s"
        }
        for (var i = 0; i < len; i++) {
            let pom =
                {
                    type: "spline",
                    xValueFormatString: "DDDD HH:00",
                    yValueFormatString: yForma,
                    showInLegend: true,
                    name: this.props.citis5Days[i].name,
                    dataPoints: []
                };
            let pomvalues = [];
            let len2 = this.props.citis5Days[i].weather.length;
            for (let j = 0; j < len2; j++) {
                if ((this.props.citis5Days[i].weather[j].i) % (this.props.hours / 3) === 0 && this.props.citis5Days[i].weather[j].i < (this.props.days * 8)) {
                    let yValue = 0;
                    if (this.props.param === "Pressure") {
                        yValue = this.props.citis5Days[i].weather[j].pressure;
                    } else if (this.props.param === "Humidity") {
                        yValue = this.props.citis5Days[i].weather[j].humidity;
                    } else if (this.props.param === "Temperature") {
                        yValue = this.props.citis5Days[i].weather[j].temp - 273.15;
                    } else if (this.props.param === "Wind") {
                        yValue = this.props.citis5Days[i].weather[j].wind;
                    }
                    pomvalues.push({
                        x: new Date(this.props.citis5Days[i].weather[j].time),
                        y: yValue
                    });
                }
            }
            pom.dataPoints = pomvalues;
            this.chart.options.data.push(pom);
        }
        this.chart.render();
    }

    render() {
        const options = {
            zoomEnabled: true,
            theme: "light1",
            title: {},
            axisX: {
                valueFormatString: "DDDD HH:00"
            },
            axisY: {
                title: this.props.param,
                suffix: sufix,
                includeZero: false
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                verticalAlign: "top",
                fontSize: 18,
                fontColor: "dimGrey",
                itemclick: this.toggleDataSeries
            },
            data: []
        };
        return (
            <div>
                <CanvasJSChart options={options}
                               onRef={ref => this.chart = ref}
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>)

    };
}

export default GraphInput;