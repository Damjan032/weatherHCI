import React, {useState} from 'react';



function MoreInfo(props) {
    let l = [5];
    const [tableData, setTableData] = useState(l)
    const dataForTable = () =>{
        let i = 0;
        setTableData(l);
        let incerementConst = props.numberHours/3;
        let m = props.info5Days.fullInfo.weather.length;
        let max = props.numberDays*8;
        console.log("Odavde" + incerementConst)
        console.log(max)
        let a = []
        for (i = 0; i < 50; i++) {
            if(i%incerementConst===0 && i<=max) {
                console.log(i);
                a = [...a,props.info5Days.fullInfo.weather[i]];
            }
        }
        console.log(a);
        setTableData([...tableData, a]);
        return a;

    }
    return (
        <div className="modal-dialog modal-lg">

            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title" id="exampleModalLongTitle">&nbsp;&nbsp;
                        <img float="left" src={"https://www.countryflags.io/"+props.info5Days.fullInfo.country+"/shiny/64.png"} alt={props.info5Days.fullInfo.name}/>
                        &nbsp;&nbsp;&nbsp;{props.info5Days.fullInfo.name},  {props.info5Days.fullInfo.country}</h3>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div className="modal-body">
                            <p key={tableData[0].temp}>A</p>

                <p onClick={dataForTable}>{props.info5Days.name} {props.numberDays} </p>


                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    );

}

export default MoreInfo;