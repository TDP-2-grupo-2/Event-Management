import { Box } from '@mui/material';
import React from 'react'
import {L, MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Map from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css'

const MAP_BOX_TOKEN = "pk.eyJ1IjoibXNvbGZvbnRlbmxhIiwiYSI6ImNsZzU1ejB6ajAwNm8zZm84c3A4dmFuanAifQ.cP-PsP-a_uVUtABlT0bHmA"
const BUENOS_AIRES_POSITION = [-58.3837591, -34.6037345]
export const MapView = (props) => {
    const {position} = props

   return (
    <Map
        initialViewState={{
        longitude: BUENOS_AIRES_POSITION[0],
        latitude: BUENOS_AIRES_POSITION[1],
        zoom: 10
        }}
        style={{width: '40vw', height: '50vh'}}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAP_BOX_TOKEN}
    />
        
  );
}