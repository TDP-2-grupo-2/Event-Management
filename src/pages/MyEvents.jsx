import React from "react";
import {Typography, Grid, CircularProgress } from "@mui/material";
import {Event} from '../components/Event'

import { getFirebaseImage } from '../common/FirebaseHandler';
import { useEffect, useState } from 'react';

export const MyEvents = () => {
    console.log("entreeeee a mis eventos")
    const APIURL = 'https://event-service-solfonte.cloud.okteto.net'

    const [ events, setEvents ] = useState ( [] );
    const [ loading, setLoading ] = useState( true );
    const [ urlsImages, setUrlsImages ] = useState( [] );

    function getMonth (eventDate) {
      
        let eventDateAux = new Date(eventDate);
        let month = eventDateAux.toLocaleString('default', { month: 'short' }).toUpperCase();
        return month
    }
    function getNumber(eventDate) {
        let date = new Date(eventDate);
        let number = date.getDate();
        return number
    }

    async function getImagesFromFireBase( eventsVar ){
      
        const urlsArray = [];
        console.log(eventsVar[0])
        for ( let i=0; i < eventsVar[0].length ; i++ ){
            eventsVar[0][i].month = getMonth(eventsVar[0][i].dateEvent)
            eventsVar[0][i].day = getNumber(eventsVar[0][i].dateEvent)
            const arrayURLS = [];
            
            for ( let j=0; j < eventsVar[0][i].photos.length ; j++ ){
               
                const url = await getFirebaseImage( 
                    `files/${eventsVar[0][i].photos[j]}`
                );
                arrayURLS.push(url);
            }
            urlsArray.push(arrayURLS);
            console.log(urlsArray)
        }
        setUrlsImages( urlsArray );
        setLoading( false );
        setEvents(eventsVar[0]);
     
    }

    async function getOrganizerEvents(){
        const paramsUpload = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const url = `${APIURL}/events/?owner=Jorge%20Perez`;
        const response = await fetch(
            url,
            paramsUpload
        );
        const jsonResponse = await response.json();

        if (response.status === 200){
            if(!jsonResponse.status_code){
                const arrayProps = [];
                const keys = Object.keys(jsonResponse);
                for ( let i=0; i<keys.length; i++){
                    arrayProps.push(jsonResponse[keys[i]]);
                }
                await getImagesFromFireBase(arrayProps);
            }
        }     
    }


    useEffect( () => {
        getOrganizerEvents();
    }, []);
    
    return (
        !loading ? 
        <div className="CreateEvent" style={{background: "rgba(137,152,202,255)"}}>
            
        <Typography  variant="h3" align="top">
            Mis Eventos
        </Typography>
        
        <Grid container spacing={5}>
            {events.length > 0 ? 
                    events.map( (prop, idx) => {
                        return (
                            <Grid style={{"marginTop":"2rem"}} item xs={4}>
                                <Event
                                    name={prop.name} 
                                    description={prop.description} 
                                    type={prop.eventType}
                                    month={prop.month} 
                                    day={prop.day}
                                    image={ urlsImages.length > 0 ? urlsImages[idx][0] : []}
                                />
                            </Grid>
                        )
            }) : 
            <Grid style={{marginTop:"3rem", textAlign:"center"}} item xs={12}>
                <h4>You have no events uploaded yet.</h4>
            </Grid>
        }
        </Grid>
        
        </div>
        : <CircularProgress 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          margin: 'auto',
          width: '10vw'
        }}
      />
    );
};
