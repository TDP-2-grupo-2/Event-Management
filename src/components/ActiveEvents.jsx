import React from "react";
import {Typography, Grid, CircularProgress } from "@mui/material";
import {Event} from './Event'

import { getFirebaseImage } from '../common/FirebaseHandler';
import { useEffect, useState } from 'react';

export const ActiveEvents = (props) => {
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
        return number + 1
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

    async function getOrganizerEvents(user){
        const paramsUpload = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        };
        console.log(user)
        const url = `${APIURL}/events/?owner=${user}`;
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
        getOrganizerEvents(localStorage.getItem('username'));
    }, []);
    
    return (
        !loading ? 
        <div className="ActiveEvents" style={{background: "rgba(137,152,202,255)"}}>
            
        <Grid container spacing={5}>
            {events.length > 0 ? 
                    events.map( (event, idx) => {
                        return (
                            <Grid style={{"marginTop":"2rem"}} item xs={4}>
                                <Event
                                    isDraft={false}
                                    isActive={true}
                                    event={event}
                                    image={ urlsImages.length > 0 ? urlsImages[idx][0] : []}
                                    setEventToEdit={props.setEventToEdit}
                                    setComponentToRenderize={props.setComponentToRenderize}
                                />
                            </Grid>
                        )
            }) : 
            <Grid style={{marginTop:"3rem", textAlign:"center"}} item xs={12}>
                <h4>No cargaste ningun evento todavia.</h4>
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