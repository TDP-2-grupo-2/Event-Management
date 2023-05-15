import { Box } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react'
import {Marker} from "react-map-gl";
import ReactMapGl from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import pin from "./pin.png"

const MAP_BOX_TOKEN = "pk.eyJ1IjoibXNvbGZvbnRlbmxhIiwiYSI6ImNsZzU1ejB6ajAwNm8zZm84c3A4dmFuanAifQ.cP-PsP-a_uVUtABlT0bHmA"
const BUENOS_AIRES_POSITION = [-58.3837591, -34.6037345]

export const getLatitudandlongitud = async (location) => {
    if (location !== ''){
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(location)}.json?access_token=${MAP_BOX_TOKEN}`
      const response = await fetch(url);
      console.log(location);
      const jsonResponse = await response.json();
      const newView = jsonResponse.features[0].center;
      return newView;
    }
}

export const MapView = (props) => {
    let [viewPort, setViewPort] = useState({
      longitude: BUENOS_AIRES_POSITION[0],
      latitude: BUENOS_AIRES_POSITION[1],
      zoom: 12
      })
    
    
    const findPlace = async () => {
      console.log(props.location)
      console.log(props.location.lenght)
      console.log(typeof props.location)
      if (props.location !== '' || props.location.lenght != 2){
        console.log("entre")
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(props.location)}.json?access_token=${MAP_BOX_TOKEN}`
        const response = await fetch(url);
        const jsonResponse = await response.json();
        console.log(jsonResponse)
        const newView = jsonResponse.features[0].center
        setViewPort({...viewPort, longitude: newView[0], latitude: newView[1]})
        }
    }

      useEffect(() => {
        console.log("estoy en map view")
        console.log(props.location)
        findPlace();
        console.log(props.location)
      }, [props.location])
  

   return (
    <div>
    <ReactMapGl
        {...viewPort}
        initialViewState={viewPort}
        style={{width: '40vw', height: '50vh', overflow: "visible"}}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAP_BOX_TOKEN}
        onViewportChange={(viewport) => setViewPort(viewport)}
        key={props.location}
      >

    <Marker latitude={viewPort['latitude']} longitude={viewPort['longitude']} anchor='bottom'>
      <img src={pin} width={50}/>
    </Marker>
        
    </ReactMapGl>
      
    </div>
        
   )
}