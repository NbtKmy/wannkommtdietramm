# Wannkommtdietram

Wann kommt die Tram!
This app should show the time table for the tram...
Data source is:

- OpenTransportData (https://opentransportdata.swiss/de/dev-dashboard/)

Description about the API for departure time etc. is here: https://opentransportdata.swiss/de/cookbook/abfahrts-ankunftsanzeiger/

The ID of the tram stop "Zürch, Kantonsschule":  8591220

## Environmental variables
This app needs 2 env variables: 
 
 - API token for OpenTransportData
 - Username for OpenTransportData

 Theses variables should be defined as "API_KEY" and "USER" in ".env.local" file in the root. 



## daten durch xml2js

From the API, the result comes in xml format. So you have to handle xml.
With [xml2js](https://www.npmjs.com/package/xml2js) you can convert xml to json like this:
```
{
  'trias:Trias': {
    '$': {
      'xmlns:siri': 'http://www.siri.org.uk/siri',
      'xmlns:trias': 'http://www.vdv.de/trias',
      'xmlns:acsb': 'http://www.ifopt.org.uk/acsb',
      'xmlns:ifopt': 'http://www.ifopt.org.uk/ifopt',
      'xmlns:datex2': 'http://datex2.eu/schema/1_0/1_0',
      version: '1.1'
    },
    'trias:ServiceDelivery': [ [Object] ]
  }
}
```


trias:Trias > trias:ServiceDelivery > trias:DeliveryPayload > trias:StopEventResponse > trias:StopEventResult[0] > 
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

