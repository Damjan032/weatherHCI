import React from 'react';
import '../App.css';
import axios from 'axios';
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
class CityInput extends React.Component {
    constructor(props) {
        super(props);
        this.city = "";
    };

    handleChange(event) {
        this.city = event.target.value.trim();


    };


    addCity = () => {

        axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + this.city + "&appid=6c4b3a3b02a04f0626ff97606e9453fd")
            .then(res => {
                this.props.toggleOverlay(res);
            }).catch((response) => {
            document.getElementById("cityInput").value = "";
            if (this.city === '') {
                confirmAlert({
                    title: "\uD83D\uDEC8 Empty",
                    message: "Please enter the name of the city.",
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
                    title: "\u2716 Couldn't found",
                    message: "Sorry, we couldn't found the " + this.city +".",
                    buttons: [
                        {
                            label: 'OK',
                            onClick: () => {
                            }
                        }
                    ]
                });
            }

        });
    };

    render() {
        return (
            <div className="d-flex justify-content-center">
                <div className="form-group mx-sm-3 mb-2">
                    <label htmlFor="inputPassword2" className="sr-only">e.g. "Beograd"</label>
                    <input id="cityInput" type="text" className="form-control" placeholder='e.g. "Beograd"'
                           onKeyUp={this.handleChange.bind(this)}/>
                </div>

                <button className="btn btn-primary mb-2" onClick={this.addCity}>Add city</button>

            </div>

        );
    }
}

export default CityInput;