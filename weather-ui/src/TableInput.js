import React from 'react';
import './App.css';

class TableInput extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
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
                {this.props.cities.map(city => (
                    <tr>
                        <td>{city.country}<img src={"https://www.countryflags.io/"+city.country+"/shiny/32.png"} alt={city.country}/></td>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                ))}
                </tbody>
            </table>

        );
    }
}

export default TableInput;