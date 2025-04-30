
import SosGetResult from "osh-js/source/core/datasource/sos/SosGetResult.datasource";
import DataSynchronizer from 'osh-js/source/core/timesync/DataSynchronizer';
import { Mode } from "osh-js/source/core/datasource/Mode";
import {EventType} from 'osh-js/source/core/event/EventType';
import React, { useEffect, useState } from "react";
import DisplayCircle from "./DisplayCircle"


export default function SosApiRealTime(props) {
    const [ isObstruction, setIsObstruction ] = useState (false)

    const apiInfoObj = {
            api: "SOS API",
            apiData: "Real Time"
        }

    // GET DATA USING SWE API
    useEffect(()=>{
        // Create a WS Connection
        let MyDataSource = new SosGetResult("KY032",{
            protocol: "ws",
            service: "SOS",
            endpointUrl: `${props.server}/sos`,
            offeringID: `[URN]${props.SerialNumber}`,
            observedProperty: props.OutputFieldDefinition,
            startTime: props.timeStart,
            endTime: props.timeEnd,
            mode: Mode.REAL_TIME
        });

        // Subscribe to the connection and
        MyDataSource.subscribe((message) => {
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