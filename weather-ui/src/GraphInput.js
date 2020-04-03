import React from 'react';
import { render } from 'react-dom';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import CanvasJSReact from './canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dateFormat = require('dateformat');
var dataPoints1 = [];
var dataPoints2 = [];
var date = [];
var updateInterval = 2000;
//initial values
var yValue1 = 408;
var yValue2 = 350;
var yForma = "#";
var sufix = ""
var times = 0;
class GraphInput extends  React.Component{
    constructor() {
        super();
        this.updateChart = this.updateChart.bind(this);
    }
    componentDidMount(){
        this.updateChart(20);
        setInterval(this.updateChart, updateInterval);
    }
    toggleDataSeries(e) {
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        this.chart.render();
    }
    updateChart() {
        this.chart.options.data = [];
        let len = this.props.citis5Days.length;
        date = [];
        yForma = "";
        if(this.props.param==="Pressure"){
            yForma = "#";
            this.chart.options.axisY.suffix =" mab";
        }
        if(this.props.param==="Humidity"){
            yForma = "#";
            this.chart.options.axisY.suffix = " %";
        }
        if(this.props.param==="Temperature"){
            yForma =  "#";
            this.chart.options.axisY.suffix = '\u2103';
        }
        if(this.props.param==="Wind"){
            yForma =  "#,#";
            this.chart.options.axisY.suffix = " m/s"
        }
        for (var i = 0; i < len; i++) {
            let pom =
                {
                    type: "spline",
                    xValueFormatString:"DDDD HH:00",
                    yValueFormatString: yForma,
                    showInLegend: true,
                    name: this.props.citis5Days[i].name,
                    dataPoints: []
                };
            console.log(pom)
            let pomvalues = [];
            let len2 = this.props.citis5Days[i].weather.length;
            times = 0;
            for (let j = 0; j < len2; j++){
                if((this.props.citis5Days[i].weather[j].i)%(this.props.hours/3)===0 && this.props.citis5Days[i].weather[j].i<(this.props.days*8)){
                    let yValue = 0;
                    if(this.props.param==="Pressure"){
                        yValue = this.props.citis5Days[i].weather[j].pressure;
                    }
                    else if(this.props.param==="Humidity"){
                        yValue = this.props.citis5Days[i].weather[j].humidity;
                    }
                    else if(this.props.param==="Temperature"){
                        yValue =  this.props.citis5Days[i].weather[j].temp- 273.15;
                    }
                    else if(this.props.param==="Wind"){
                        yValue = this.props.citis5Days[i].weather[j].wind;
                    }
                    pomvalues.push({
                        x:  new Date(this.props.citis5Days[i].weather[j].time),
                        y: yValue
                    });
                    times++;
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
            title: {
            },
            axisX: {
                valueFormatString: "DDDD HH"
            },
            axisY:{
                suffix:sufix,
                includeZero: false
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor:"pointer",
                verticalAlign: "top",
                fontSize: 18,
                fontColor: "dimGrey",
                itemclick : this.toggleDataSeries
            },
            data: [

            ]
        }
        return (
            <div>
                <CanvasJSChart options = {options}
                               onRef={ref => this.chart = ref}
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>)

    };
}
export default GraphInput;