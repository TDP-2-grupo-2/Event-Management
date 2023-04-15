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

    async function getImagesFromFireBase( eventsVar ){
        console.log("estoy en setetar imagens y eventos")
        console.log(eventsVar)
        const urlsArray = [];
        console.log(eventsVar[0].name)
        for ( let i=0; i < eventsVar[0].length ; i++ ){
            console.log("entre al for")
            const arrayURLS = [];
            
            for ( let j=0; j < eventsVar[0][i].photos.length ; j++ ){
                console.log("entre al for de imagenes")
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
        console.log(events.length)
    }

    async function getOrganizerEvents(){
        const paramsUpload = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const url = `${APIURL}/events/`;
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
        console.log("cant de events ", events.length);
        getOrganizerEvents();
        console.log("cant de events ", events.length);
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
                                    type={prop.type} 
                                    month='DIC'
                                    date='21'
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
