import { Button, Grid, Typography, TextField, Box , MenuItem, Input, useStepContext} from "@mui/material";
import React , {useState, useEffect } from "react";
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {MapView, getLatitudandlongitud} from '../components/MapView'

import { handleUploadFirebaseImage, deleteFirebaseImage } from '../common/FirebaseHandler';


const eventypes = [
    {
      value: 'Concierto',
      label: 'Concierto',
    },
    {
      value: 'Teatro',
      label: 'Teatro',
    },
    {
      value: 'Cine',
      label: 'Cine',
    },
    {
      value: 'Show',
      label: 'Show',
    },
  ];

export const CreateEvent = (props) => {
    const [eventName, setEventName] = useState("")
    const [eventDescription, setEventDescription] = useState("")
    const [eventStartTime, setEventStartTime] = useState(dayjs('2022-04-17T15:30'))
    const [eventEndTime, setEventEndTime] = useState(dayjs('2022-04-17T15:30'))
    const [eventLocation, setEventLocation] = useState("")
    const [eventDate, setEventDate] = useState(dayjs(Date.now()))
    const [eventCapacity, setEventCapcity] = useState(0)
    const [eventType, setEventType] = useState("")
    const [fileInputShow, setFileInputShow] = useState("");
    const [eventLocationDescription, setEventLocationDescription] = useState("")
    const [photosNamesHashed, setPhotosNamesHashed] = useState([]);
    const [eventPhotosUpload, setEventPhotosUpload] = useState([]);
    const [locationToMap, setLocationToMap] = useState([])
    const [pregunta1, setPregunta1] = useState([])
    const [pregunta2, setPregunta2] = useState([])
    
    
    const navigate = useNavigate();

    const APIURL = 'https://event-service-solfonte.cloud.okteto.net'



    const onSubmitEvent = async (event) => {

        const month = eventDate.$M  +  1
        const eventDateFormat =  eventDate.$y + "-" + month  + "-" + eventDate.$D
        let eventStartTimeFormat = eventStartTime.$H + ":" + eventStartTime.$m 
        let eventEndTimeFormat = eventEndTime.$H + ":" + eventEndTime.$m 
        let eventPosition = await getLatitudandlongitud()
        let photosNames = await handleUploadPhotos();
        let eventFaqs = getFaqs();
        console.log(photosNames)
        const paramsUpload = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: eventName,
                owner: "pepe", // Como no hay login esto tiene q ir harcodeado por ahora (no hay usuario)
                description: eventDescription,
                location: eventLocation,
                locationDescription: eventLocationDescription,
                capacity: eventCapacity,
                dateEvent: eventDateFormat,
                eventType: eventType,
                tags: ["tag"],
                latitud: eventPosition[1], 
                longitud: eventPosition[0], 
                start: eventStartTimeFormat,
                end: eventEndTimeFormat,
                photos: photosNames,
                faqs: eventFaqs, 
            })
        };
        const url = `${APIURL}/events/`;
        const response = await fetch(
            url,
            paramsUpload
        );
        const jsonResponse = await response.json();
        if (response.status === 200){
            if(!jsonResponse.status_code){
                navigate('/');
                window.location.reload();
            }else{
                // mostrar mensaje de error 
            }

        }
    }

    const getFaqs = () =>{
        const faqs = {'¿Hasta que hora puede ingresarse al evento?': pregunta1, 
                    '¿Se suspende el evento por lluvia?': pregunta2};
        return faqs
    }
    const handleUploadPhotos = async () => {
        const hashedNames = [];
        console.log(eventPhotosUpload)
        console.log(eventPhotosUpload.length)
        for ( let i=0; i<eventPhotosUpload.length; i++){
            hashedNames.push(await handleUploadFirebaseImage(eventPhotosUpload[i].name, eventPhotosUpload[i]));
        }
        setPhotosNamesHashed(hashedNames);
        return hashedNames;
    }
    const mapPosition = [51.505, -0.09]
    return (
        <div className="CreateEvent" style={{background: "rgba(137,152,202,255)"}}>
            <Typography  variant="h3" align="top">
                Agregar evento
            </Typography>
            <Box display="flex"
                justifyContent="space-between"
                alignItems="center">
            <Box
                sx={{
                    p: 1,
                    m: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(137,152,202,255)",
                    borderRadius: 1,
                    width:"50%",
                    }} 
            >
            <Grid container rowSpacing={4}>
                <Grid item>
                    <Input
                        id="photosInput"
                        label="Upload Photos"
                        name="Upload Photos"
                        className={"inputStyle"}
                        value={fileInputShow}
                        inputProps = {{accept: "image/*", "multiple":false}}
                        type = "file"
                        style={{width:"100%", marginBottom: 10}}
                        onChange = {(event) => {setFileInputShow(event.target.value);setEventPhotosUpload(event.target.files)}}
                    />
                </Grid>
                <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start", direction: "row"}}>
                    <div>
                        <h3>Ubicacion</h3>
                    </div>
                    
                </Grid>
                
                <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-start" }}>
                    <TextField 
                    placeholder="Ingresa la ubicacion de evento"
                    value={eventLocation}
                    onChange = {(event) => setEventLocation(event.target.value)} 
                    />
                </Grid>
                <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-start" }}>
                    <TextField 
                        placeholder="Detalle la ubicación del evento"
                        value={eventLocationDescription}
                        onChange = {(event) => setEventLocationDescription(event.target.value)} 
                />                    
                </Grid>
                <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-start" }}>
                    <Button 
                        variant="contained"
                        onClick={() => setLocationToMap(eventLocation)}
                        sx={{ color: 'white', backgroundColor: 'rgba(112, 92, 156);', borderColor: 'purple' }}
                    >
                            Marcar en el mapa
                    </Button>
                </Grid>
                <Grid item  style={{ display: "flex", justifyContent: "center" }}>
                    <MapView location={locationToMap}/>
                </Grid>
                    
                    
                    </Grid>
                    
                
            </Box>
            <Box
                sx={{
                p: 1,
                m: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(137,152,202,255)",
                borderRadius: 1,
                width:"40%",
                }}
      >
            <Grid container rowSpacing={2} >
                    <Grid item xs={12} sm={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <TextField label="Nombre Evento" 
                        placeholder="Ingresa el nombre del evento" 
                        value={eventName}
                        onChange = {(event) => setEventName(event.target.value)}
                        fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <TextField label="Descripcion" 
                                    placeholder="Ingresa la descripción del evento"  
                                    multiline
                                    rows={1} 
                                    fullWidth
                                    value={eventDescription}
                                    onChange = {(event) => setEventDescription(event.target.value)}
                                    />
                    </Grid>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <div>
                            <h3>Detalles del evento</h3>
                        </div>
                    </Grid>

                    <Grid item xs={6} sm={6} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopTimePicker label= "Hora inicio" 
                                                value={eventStartTime || null}
                                                onChange={(event) => setEventStartTime(event)}
                                                />
                        </LocalizationProvider>

                    </Grid>
                    <Grid item xs={6} sm={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopTimePicker label="Hora fin" 
                                                value={eventEndTime || null}
                                                onChange={(event) => setEventEndTime(event)}
                                             />
                        </LocalizationProvider>

                    </Grid>
                    <Grid item xs={6}  style={{ display: "flex", justifyContent: "flex-start" }}>
                        <TextField
                            label="Capacidad"
                            type="number"
                            value={eventCapacity}
                            onChange = {(event) => setEventCapcity(event.target.value)}
                            InputProps={{
                                inputProps: { min: 0 }
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Fecha" 
                                        value={eventDate || null}
                                        minDate={dayjs(Date.now())}
                                        onChange={(event) => setEventDate(dayjs(new Date(event.toISOString())))}
                                         />
                        </LocalizationProvider>

                    </Grid>
                    <Grid item xs={12} sm={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <TextField
                            select
                            label="Tipo de Evento"
                            defaultValue="Concierto"
                            fullWidth
                            value={eventType}
                            onChange = {(event) => setEventType(event.target.value)}
                            >
                            {eventypes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <div>
                            <h3>Preguntas Frecuentes</h3>
                        </div>
                    </Grid>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <div>
                            <h4>¿Hasta que hora puede ingresarse al evento?</h4>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={8} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <TextField 
                        placeholder="Respuesta 1" 
                        value={pregunta1}
                        fullWidth
                        onChange = {(event) => setPregunta1(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}  style={{ display: "flex", justifyContent: "flex-start" }}>
                        <div>
                            <h4>¿Se suspende el evento por lluvia?</h4>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={8} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <TextField 
                        placeholder="Respuesta 2"
                        value={pregunta2} 
                        fullWidth
                        onChange = {(event) => setPregunta2(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                        <Button variant="contained" 
                                sx={{ color: 'white', backgroundColor: 'rgba(112, 92, 156);', borderColor: 'purple' }}
                                onClick={onSubmitEvent}
                                 >+ Crear Evento</Button>
                    </Grid>

            </Grid>
        </Box>
      </Box>
                
        </div>

    );
   
    
}
