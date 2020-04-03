import React, { useState } from 'react';
import './App.css';

function DeleteButton(props){
    const sendRemoveSignal = () =>
        props.lisener(props.name);


        return(
            <button type="submit" className="close" onClick={() => { sendRemoveSignal() }} aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        );

}

class MoreInfo extends React.Component{
    constructor(props) {
        console.log("NOVIIIIIIIIIIIIIIIII")

        super(props);
        this.state={
            city : this.props.city,
            info5Days: this.props.info5Days,
            numberDays: this.props.numberDays,
            numberHours: this.props.numberHours,
            table : []
        };
        this.tableData=[]
    }

    shouldComponentUpdate(nextProps) {

        if(nextProps.city === this.state.city){
            console.log(nextProps);

            // eslint-disable-next-line react/no-direct-mutation-state
            this.state = nextProps;
            this.pera();
            return true;
        }
        return false;

    }

    pera (){;
         console.log(this.state);
         this.tableData=[];
         this.state.info5Days.map(cityP =>{
             if(cityP.name===this.state.city.name){
                 cityP.weather.map(w =>{
                     if((w.i-1)%(this.state.numberHours/3)===0 && w.i<(this.state.numberDays*8)){
                         let pom = false;
                         this.tableData.map(tP => {
                             if (tP.time === w.time){
                                 pom=true;
                             }
                         });
                         if(pom===false)
                            this.tableData = [...this.tableData, w];
                     }
                 })
             }
         })
         console.log("TA NIJE VALJDA ODJE" + this.tableData.length)

    }


    render() {



        return (
            <div className="modal-dialog modal-lg">

                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLongTitle">&nbsp;&nbsp;
                            <img float="left" src={"https://www.countryflags.io/"+this.state.city.country+"/shiny/64.png"} alt={this.state.city.name}/>
                            &nbsp;&nbsp;&nbsp;{this.state.city.name}{console.log("MAJKU TI JEBEM" + this.state.city.name)},  {this.state.city.country}</h3>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <table id="tableid" className="table table-hover">
                            <thead >
                            <tr>
                                <th onClick={this.pera} scope="col">Time</th>
                                <th scope="col">Temp</th>
                                <th scope="col">Weather</th>
                                <th scope="col">Pressure</th>
                                <th scope="col">Humidity</th>
                                <th scope="col">Windx</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.tableData.map(moment => (
                                <tr key={moment.time}>
                                    <td class="text-secondary">&nbsp;&nbsp;
                                        {moment.time.substring(8, 10)+"."+ moment.time.substring(5, 7)+". "+ moment.time.substring(11, moment.time.length-3)}
                                    </td>

                                    <td className="">{Math.round(moment.temp - 273.15)} &#176;C</td>
                                    <td className=""><img height="32" width="32" alt={" "} src={"http://openweathermap.org/img/wn/"+ moment.weather.icon+"@2x.png"}/>  {moment.weather.main}</td>
                                    <td className="">{moment.pressure} mbar</td>
                                    <td className="">{moment.humidity} %</td>
                                    <td className="">{moment.wind} m/s</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>


                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        );
    }

}

function TableInput(props) {
    // eslint-disable-next-line no-useless-constructor

    return (
        <div>
            <table className="table table-hover">
                <thead >
                <tr>
                    <th scope="col">City</th>
                    <th scope="col">Current temp</th>
                    <th scope="col">Weather</th>
                    <th scope="col">Wind</th>
                    <th scope="col">Today max</th>
                    <th scope="col">Today min</th>
                    <th scope="col">Pressure</th>
                    <th scope="col">Humidity</th>
                    <th scope="col">More</th>
                </tr>
                </thead>
                <tbody>
                {props.cities.map(city => (
                    <tr key={city.name}>
                        <td>&nbsp;&nbsp;
                            <div className="float-left">
                            <DeleteButton lisener={props.lisener} name={city.name}/>&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;<img float="left" src={"https://www.countryflags.io/"+city.country+"/shiny/32.png"} alt={city.name}/>&nbsp;&nbsp;&nbsp;{city.name},  {city.country}
                            </div>
                        </td>
                        <td>{Math.round(city.main.temp - 273.15)} &#176;C</td>
                        <td><img height="32" width="32" alt={" "} src={"http://openweathermap.org/img/wn/"+ city.weather.icon+"@2x.png"}/>  {city.weather.main}</td>
                        <td>{city.wind.speed} m/s</td>
                        <td>{Math.round(city.main.temp_max - 273.15)} &#176;C</td>
                        <td>{Math.round(city.main.temp_min - 273.15)} &#176;C</td>
                        <td>{city.main.pressure} mbar{console.log( props.city5Days)}</td>
                        <td>{city.main.humidity} %</td>
                        <td>
                            <button  value={city.name} type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target={"."+city.name.split(" ").join("")}>More info</button>
                            <div className={"modal fade "+city.name.split(" ").join("")} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                <MoreInfo city={city} numberHours={props.numHou} numberDays = {props.numDays} info5Days={props.city5Days}/>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>

    );

}

export default TableInput;