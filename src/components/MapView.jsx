import { Box } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react'
import {Marker} from "react-map-gl";
import ReactMapGl from "react-map-gl";
import {RiMapPin2Line} from "react-icons/ri"
import 'mapbox-gl/dist/mapbox-gl.css'
import pin from "./pin.png"

const MAP_BOX_TOKEN = "pk.eyJ1IjoibXNvbGZvbnRlbmxhIiwiYSI6ImNsZzU1ejB6ajAwNm8zZm84c3A4dmFuanAifQ.cP-PsP-a_uVUtABlT0bHmA"
const BUENOS_AIRES_POSITION = [-58.3837591, -34.6037345]


export const MapView = (props) => {
    //const [address, setAddress] = useState(props.address);
    const [address, setAddress] = useState('montevideo 1372, caba, argentina');
    const mapRef = useRef();
    const [mapView, setMapView] = useState({
      longitude: BUENOS_AIRES_POSITION[0],
      latitude: BUENOS_AIRES_POSITION[1],
      zoom: 12
      })
    
    
    const findPlace = async () => {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=${MAP_BOX_TOKEN}`
      const response = await fetch(url);

      const jsonResponse = await response.json();
      const newView = jsonResponse.features[0].center
      console.log(newView)
      setMapView({...mapView, longitude: newView[0], latitude: newView[1]})
      console.log("cambio")
    }
    

   return (
    <div>
    <ReactMapGl
        initialViewState={mapView}
        style={{width: '40vw', height: '50vh'}}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAP_BOX_TOKEN}
      >

    <Marker latitude={-34.6037345} longitude={-58.3837591} anchor='bottom'>
      <img src={pin} width={50}/>
    </Marker>
        
    </ReactMapGl>
      
    </div>
        
   )
}