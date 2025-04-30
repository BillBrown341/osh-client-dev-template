
import SweApiRealTime from './SweApiRealTime'
import SosApiRealTime from './SosApiRealTime'
import SweApiReplay from './SweApiReplay'
import React from 'react'


export default function MyApp() {

    // COMMON API SENSOR VARIABLES
    const sensorApiVariables = {
        // COMMON VARIABLES
        server: "192.168.50.122:8181/sensorhub",
        histServer: "127.0.0.1:433/sensorhub",
        //timeStart:"2025-04-11T19:35:18.716Z",
        timeStart:"2025-04-17T13:25:30.453Z",
        timeEnd:"2026-04-11T19:35:18.716Z",
        //secure:true,

        // SWEAPI VARIABLES
        ObservableId:"fmdfhosfqcbcu",
        HistObservableId: "5h54ubs6q3tui",

        // SOS VARIABLES
        SerialNumber:"urn:ky032:is:cool",
        OutputFieldDefinition:"http://sensorml.com/ont/swe/property/obstruction"
    }

    return(
        <div className="DisplayContainer" >
        {/*
            <SweApiRealTime {...sensorApiVariables} />
            <SosApiRealTime {...sensorApiVariables} /> */}
            <SweApiReplay {...sensorApiVariables} />
        </div>
    )

};
