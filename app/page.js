import XmlCompletion from '@/components/query';
import { parseString } from 'xml2js';

export default async function Home() {
  await getData(); 

  return (
    <div>
      <h1>Haltestelle: Zürich, Kantonsschule</h1>
      
    </div>
  );
}


async function getData() {
  try {

    // create query
    let date = new Date()
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

    const result = await response.text();
    parseString(result, function (err, res) {
      console.log(res);
    });



    //let estTimes = resXML.getElementsByTagName("trias:EstimatedTime");
    //let lineEls = resXML.getElementsByTagName("trias:PublishedLineName");
    //let destinations = resXML.getElementsByTagName("trias:DestinationText");
    /*
    const arrLength = estTimes.length;
    for (let i = 0; i < arrLength; i++){
      let estTime = Date.parse(estTimes[i].innerHTML);
      let diff = estTime - date;
      // wenn die Tram schon abgefahren sind, dann wird sie nicht berücksichtigt
      if (diff < 0) {
        continue;
      } 

      let sec = Math.floor(diff/1000)%60;
      let min = Math.floor(diff/1000/60)%60;
      
      // Anzeige mehr als 5 Min. weg && je nach sec die minuten-Anzeige plus 1
      if (min >= 6){
        continue;
      } 
        
      if (min == 5 && sec >= 30){
          min = String(min);
      } else if (sec >= 30){
          min = String(min + 1);
      } else if (sec < 30 && min == 0){
          continue;
      } else {
        min = String(min);
      }
      
      let destination = destinations[i].getElementsByTagName("trias:Text")[0].innerHTML;
      let lineNum = lineEls[i].getElementsByTagName("trias:Text")[0].innerHTML;
      let estTimeText = `<li>Die Tram ${lineNum} Richtung nach ${destination} fährt in ${min} Min. ab</li>`
     */
  } catch (error) {
    console.error("Error:", error);
  }
}
