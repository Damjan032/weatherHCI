import React from 'react';
import { render } from 'react-dom';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import App from "./App";



class GraphInput extends  React.Component{
    constructor(props) {
        super(props);
        this.state={
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
                categories:this.props.label
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
                    data: [13.9+this.props.days, 14.2, 15.7, 10.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                }]
        };
    }

    componentDidMount(){
        const chart = this.refs.chartComponent.chart;
    }

    shouldComponentUpdate(nextProps) {

        console.log("OVDE SAM RODE")

            console.log(nextProps);
            console.log(this.props)
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state = nextProps;
            return true;

    }

    render(){
            return(
    <div>
        <div>
            <HighchartsReact ref={"chartComponent"} highcharts={Highcharts} allowChartUpdate={true} options={this.state}/>
        </div>
        <p>OVDEEEEEEEEEEEE</p>
    </div>
    );
    }
};

export default GraphInput;