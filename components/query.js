//let queryXML = `<?xml version="1.0" encoding="UTF-8"?>
//<Trias version="1.1" xmlns="http://www.vdv.de/trias" xmlns:siri="http://www.siri.org.uk/siri" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
//<ServiceRequest>
//    <siri:RequestTimestamp>${timestamp}</siri:RequestTimestamp>
//    <siri:RequestorRef>${requestorname}</siri:RequestorRef>
//    <RequestPayload>
//        <StopEventRequest>
//            <Location>
//                <LocationRef>
//                    <StopPointRef>${stopid}</StopPointRef>
//                </LocationRef>
//                <DepArrTime>${timestamp}8</DepArrTime>
//            </Location>
//            <Params>
//                <NumberOfResults>5</NumberOfResults>
//                <StopEventType>departure</StopEventType>
//                <IncludePreviousCalls>false</IncludePreviousCalls>
//                <IncludeOnwardCalls>false</IncludeOnwardCalls>
//                <IncludeRealtimeData>true</IncludeRealtimeData>
//            </Params>
//        </StopEventRequest>
//    </RequestPayload>
//</ServiceRequest>
//</Trias>`; 


export default function XmlCompletion(timestamp, requestorname, stopid){
    let queryXML = `<?xml version="1.0" encoding="UTF-8"?><Trias version="1.1" xmlns="http://www.vdv.de/trias" xmlns:siri="http://www.siri.org.uk/siri" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><ServiceRequest><siri:RequestTimestamp>${timestamp}</siri:RequestTimestamp><siri:RequestorRef>${requestorname}</siri:RequestorRef><RequestPayload><StopEventRequest><Location><LocationRef><StopPointRef>${stopid}</StopPointRef></LocationRef><DepArrTime>${timestamp}8</DepArrTime></Location><Params><NumberOfResults>5</NumberOfResults><StopEventType>departure</StopEventType><IncludePreviousCalls>false</IncludePreviousCalls><IncludeOnwardCalls>false</IncludeOnwardCalls><IncludeRealtimeData>true</IncludeRealtimeData></Params></StopEventRequest></RequestPayload></ServiceRequest></Trias>`;

    return queryXML;
}

