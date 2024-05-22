import XmlCompletion from '@/components/query';
import { parseString } from 'xml2js';



function parseXml(xml) {
  return new Promise((resolve, reject) => {
      parseString(xml, (error, result) => {
          if (error) {
              reject(error);
          } else {
              resolve(result);
          }
      });
  });
}


export async function getStaticProps() {
  try {

    // create query
    let date = new Date();
    let dateIso = date.toISOString();

    const requestorname = process.env.USER;
    const stopid = "8591220"; // for the tram stop "Zürich, Kantonsschule"
    let queryXML = XmlCompletion(dateIso, requestorname, stopid);

    const API_KEY = process.env.API_KEY;
    const response = await fetch("https://api.opentransportdata.swiss/trias2020", {
      method: "POST", 
      headers: {
        "Content-Type": "text/xml",
        "accept": "text/xml",
        "authorization": API_KEY,
      },
      body: queryXML,
    });
    // get xml data
    const result = await response.text();
    // parse xml data and convert to json
    const json = await parseXml(result);
    const obj = JSON.parse(JSON.stringify(json));
   
    let stopRes = obj["trias:Trias"]["trias:ServiceDelivery"][0]["trias:DeliveryPayload"][0]["trias:StopEventResponse"][0]["trias:StopEventResult"];
    //console.log(stopRes);

    let departureTime, LineNum, LineDestination, realtimeFlag;
    let contents = [];
    stopRes.forEach(element => {

        let stopEvent = element["trias:StopEvent"][0];
        
        LineNum = stopEvent["trias:Service"][0]["trias:PublishedLineName"][0]["trias:Text"][0];
        LineDestination = stopEvent["trias:Service"][0]["trias:DestinationText"][0]["trias:Text"][0];
        
        if ("trias:EstimatedTime" in element) {
          departureTime = stopEvent["trias:ThisCall"][0]["trias:CallAtStop"][0]["trias:ServiceDeparture"][0]["trias:EstimatedTime"][0];
          realtimeFlag = true;
          
        } else {
          departureTime = stopEvent["trias:ThisCall"][0]["trias:CallAtStop"][0]["trias:ServiceDeparture"][0]["trias:TimetabledTime"][0];
          realtimeFlag = false;

        }

        let departureTime_dateObj = new Date(departureTime);
        let diff = departureTime_dateObj - date;
        if (diff <= 0){
           return;
        }

        let sec = Math.floor(diff/1000)%60;
        let min = Math.floor(diff/1000/60)%60;
      
        // Anzeige mehr als 5 Min. weg && je nach sec die minuten-Anzeige plus 1
        if (min >= 6){
          return;
        } 
          
        if (min == 5 && sec >= 30){
            min = String(min);
        } else if (sec >= 30){
            min = String(min + 1);
        } else if (sec < 30 && min == 0){
            return;
        } else {
          min = String(min);
        }

        let estTimeText = `Die Tram ${LineNum} Richtung nach ${LineDestination} fährt in ${min} Min. ab`
        // console.log(estTimeText);
        let item = {};
        item.id = departureTime;
        item.estTimeText = estTimeText;
        item.realtimeFlag = realtimeFlag;
        contents.push(item);
    });
    return { props: { contents },
            revalidate: 15,        
    };
    
  } catch (error) {
    console.error("Error:", error);
  }
}

