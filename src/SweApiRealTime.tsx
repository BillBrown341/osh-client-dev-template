
import SweApi from "osh-js/source/core/datasource/sweapi/SweApi.datasource";
import { Mode } from "osh-js/source/core/datasource/Mode";
import {EventType} from 'osh-js/source/core/event/EventType';
import React, { useEffect, useState } from "react";

import DisplayCircle from './DisplayCircle'

export default function SweApiRealTime(props: any) {
    // Create state variable to read sensor
    const [ isObstruction, setIsObstruction ] = useState (false)

    // Create an object containing strings to display in DisplayCircle component
    const apiInfoObj = {
                api: "SWE API",
                apiData: "Real Time"
            }


    // GET DATA USING SWE API
    useEffect(()=>{
        // Create a WS Connection
        let MyDataSource = new SweApi("KY032",{
            protocol: "ws",
            endpointUrl: `${props.server}/api`,
            resource: `/datastreams/${props.ObservableId}/observations`,
            startTime: props.timeStart,
            endTime: props.timeEnd,
            mode: Mode.REAL_TIME
        });


        // Subscribe to the connection and set state based on real time data source values
        MyDataSource.subscribe((message:any) => {
            let messageValues = message.values[0].data.ObstructionDetected
            setIsObstruction(messageValues)
        }, [EventType.DATA]);

        MyDataSource.connect();

    }, []);


    return (
        <div className="DisplayCardContainer" >
            <DisplayCircle isObstruction={isObstruction} apiInfoObj={apiInfoObj} />
        </div>

    );

};