import React from 'react';
import './App.css';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
class TableInput extends React.Component {
    constructor(props) {
        super(props);
    };

    handleChange(event) {
        this.city = event.target.value.trim();
        console.log(this.city);

    };


    addCity = () => {

        axios.get("https://api.openweathermap.org/data/2.5/weather?q="+this.city +"&appid=6c4b3a3b02a04f0626ff97606e9453fd")
            .then(res => {
                console.log("Urosao zahtev")
                this.props.toggleOverlay(res);
            }).catch((response) => {
            if (this.city === '') {
                confirmAlert({
                    title: "Empty",
                    message: "Please enter the name of the city",
                    buttons: [
                        {
                            label: 'OK',
                            onClick: () => {
                            }
                        }
                    ]
                });
            } else {

                confirmAlert({
                    title: "Not fount",
                    message: "Sorry, we can't found " + this.city,
                    buttons: [
                        {
                            label: 'OK',
                            onClick: () => {
                            }
                        }
                    ]
                });
            }

        } );
    };
    render() {
        return (
            <table className="table table-hover">
                <thead >
                <tr>
                    <th scope="col">City</th>
                    <th scope="col">Temp</th>
                    <th scope="col">Weather</th>
                    <th scope="col">Wind</th>
                    <th scope="col">Today max</th>
                    <th scope="col">Today min</th>
                    <th scope="col">Pressure</th>
                    <th scope="col">Clouds</th>
                </tr>
                </thead>
                <tbody>
                {this.props.citys.map(city => (
                    <tr>
                        <td><img src={"https://www.countryflags.io/"+city.country+"/shiny/32.png"}/></td>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                ))}
                <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </table>

        );
    }
}

export default TableInput;