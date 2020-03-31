import React from 'react';
import './App.css';

class CityInput extends React.Component {

    constructor(props) {
        super(props);
        this.city = "";
    };

    handleChange(event) {
        this.city = event.target.value;
        console.log(this.city);
    };


    addCity() {
        console.log(this.city);

    };
    render() {
        return (
            <div class="d-flex justify-content-center">


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