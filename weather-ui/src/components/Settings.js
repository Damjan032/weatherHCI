import React from 'react';

function Settings(props) {
    // eslint-disable-next-line no-useless-constructor
    const changeNumberOfDays = (event) => {
        props.setNum(event.target.value)
    };

    const changeNumberOfHours = (event) => {
        props.setHours(event.target.value)
    };

    const dropDownClickedTemp = () => {
        props.setParam("Temperature");
    };

    const dropDownClickedHumidity = () => {
        props.setParam("Humidity");
    };

    const dropDownClickedPressure = () => {
        props.setParam("Pressure");
    };

    const dropDownClickedWind = () => {
        props.setParam("Wind");
    };

    return (
        <div className="modal-dialog" role="document">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLongTitle">Settings</h3>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <table>
                            <thead>
                            </thead>
                            <tbody>
                            <tr key={"2"}>
                                <td className="text-primary text-left">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of days
                                    prediction: {props.numDays}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </td>
                                <td>
                                    <input defaultValue="3" onChange={changeNumberOfDays} min="1" max="5" step="1"
                                           type="range" className="custom-range" id="customRange1"/>
                                </td>
                            </tr>
                            <tr key={"1"}>
                                <td className="text-primary text-center float-left">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number of
                                    hours: {props.numHours}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </td>
                                <td>
                                    <input onChange={changeNumberOfHours} defaultValue="6" max="12" min="3" step="3"
                                           type="range" className="custom-range" id="customRange1"/>
                                </td>
                            </tr>
                            <tr key={"3"}>
                                <td className="text-primary text-center align-center">
                                    &nbsp;&nbsp;Graph display
                                    parameter:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </td>
                                <td>
                                    <div className="dropdown">
                                        <button className="btn btn-outline-primary dropdown-toggle" type="button"
                                                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                            {props.param}
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                            <a onClick={dropDownClickedTemp} className="dropdown-item scrollto"
                                               href="#">Temperature</a>
                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                            <a onClick={dropDownClickedHumidity} className="dropdown-item scrollto"
                                               href="#">Humidity</a>
                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                            <a onClick={dropDownClickedPressure} className="dropdown-item scrollto"
                                               href="#">Pressure</a>
                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                            <a onClick={dropDownClickedWind} className="dropdown-item scrollto"
                                               href="#">Wind</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Done</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;