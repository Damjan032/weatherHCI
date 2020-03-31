import React from 'react';
import './App.css';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
class CityInput extends React.Component {
    addToast;
    constructor(props) {
        super(props);
        this.city = "";
    };

    handleChange(event) {
        this.city = event.target.value;
        console.log(this.city);
        this.props.toggleOverlay("eveeeeee");
    };


    addCity = () => {
        this.addToast = useToasts()
        console.log("api.openweathermap.org/data/2.5/forecast?q="+this.city +"&appid=6c4b3a3b02a04f0626ff97606e9453fd");

        axios.get("https://api.openweathermap.org/data/2.5/forecast?q="+this.city +"&appid=6c4b3a3b02a04f0626ff97606e9453fd")
            .then(res => {
                console.log("Urosao zahtev")
            }).catch((response) => this.addToast(response, { appearance: 'error' }));
    };
    render() {
        return (
            <div className="d-flex justify-content-center">


                    <div className="form-group mx-sm-3 mb-2">
                        <label htmlFor="inputPassword2" className="sr-only">e.g. "Beograd"</label>
                        <input type="text" className="form-control" placeholder='e.g. "Beograd"' onKeyUp={this.handleChange.bind(this)}/>
                    </div>

                    <button className="btn btn-primary mb-2" onClick={this.addCity}>Add city</button>

            </div>

        );
    }
}

export default CityInput;