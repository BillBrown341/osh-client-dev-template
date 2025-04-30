
import SweApi from "osh-js/source/core/datasource/sweapi/SweApi.datasource";
import DataSynchronizer from 'osh-js/source/core/timesync/DataSynchronizer';
import { Mode } from "osh-js/source/core/datasource/Mode";
import {EventType} from 'osh-js/source/core/event/EventType';
import React, { useEffect, useState } from "react";

import DisplayCircle from './DisplayCircle';

export default function SweApiRealTime(props) {
    const [ isObstruction, setIsObstruction ] = useState (false)

    const apiInfoObj = {
                api: "SWE API",
                apiData: "Historical"
            }


    // GET DATA USING SWE API
    useEffect(()=>{
        // Create a WS Connection
        let MyDataSource = new SweApi("KY032",{
            protocol: "wss",
            endpointUrl: `${props.histServer}/api`,
            resource: `/datastreams/${props.HistObservableId}/observations`,
            startTime: props.timeStart,
            endTime: props.timeEnd,
            mode: Mode.REPLAY,
            tls:'secure'
        });


        // Subscribe to the connection and
        MyDataSource.subscribe((message) => {
            let messageValues = message.values[0].data.ObstructionDetected
            setIsObstruction(messageValues)

        }, [EventType.DATA]);

        // When using HISTORICAL DAT, create a TimeController
        let TimeController = new DataSynchronizer({
            replaySpeed:1,
            dataSources: [MyDataSource],
            startTime: props.timeStart
        })

        // Connect to the TimeController for Historical Data
        //MyDataSource.connect();
        TimeController.connect()

    }, []);


    return (
        <div className="DisplayCardContainer" >
            <DisplayCircle isObstruction={isObstruction} apiInfoObj={apiInfoObj} />
        </div>

    );

};