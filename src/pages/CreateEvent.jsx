import { Button, Grid, Typography, TextField, Box , MenuItem, Input} from "@mui/material";
import React , {useState, useEffect } from "react";
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {MapView} from '../components/MapView'
import moment from "moment";


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

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });


export const CreateEvent = (props) => {
    console.log("entreeeee")
    const [eventName, setEventName] = useState("")
    const [eventDescription, setEventDescription] = useState("")
    const [eventStartTime, setEventStartTime] = useState(dayjs('2022-04-17T15:30'))
    const [eventEndTime, setEventEndTime] = useState(dayjs('2022-04-17T15:30'))
    const [eventLocation, setEventLocation] = useState("")
    const [eventDate, setEventDate] = useState(dayjs(Date.now()))
    const [eventCapacity, setEventCapcity] = useState(0)
    const [eventType, setEventType] = useState("")
    const [fileInputShow, setFileInputShow] = useState("");
    const navigate = useNavigate();

    const APIURL = 'https://event-service-solfonte.cloud.okteto.net'

    const onSubmitEvent = async (event) => {
       
        console.log("entre a submit event ")
        console.log(eventName)
        console.log(eventDescription)
        console.log(eventCapacity)
        console.log(eventStartTime)
        console.log(eventType)
        console.log(eventLocation)
        console.log(eventEndTime)
        console.log(eventDate)
        let eventDateFormat = moment(eventDate).format('YYYY-MM-DD');
        let eventStartTimeFormat = eventStartTime.$H + ":" + eventStartTime.$m 
        let eventEndTimeFormat = eventEndTime.$H + ":" + eventEndTime.$m 
        console.log(eventDateFormat)
        console.log(eventStartTimeFormat)
        console.log(eventEndTimeFormat)
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
                locationDescription: "ejemplo", // falta agregar este campo
                capacity: eventCapacity,
                dateEvent: eventDateFormat,
                eventType: eventType,
                tags: ["tag"],
                latitud: 0.8, //falta
                longitud: 0.7, //falta
                start: eventStartTimeFormat,
                end: eventEndTimeFormat,
                //falta fotos (opcional)
                // falta faqs 
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
   
    return (
        <div className="CreateEvent" style={{background: "rgba(137,152,202,255)"}}>
            <Typography  variant="h3" align="top">
                Create Event
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
                    <Grid container rowSpacing={3}>
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
                                onChange = {(event) => {setFileInputShow(event.target.value);}}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <div>
                            <h3>Ubicacion</h3>
                        </div>
                    </Grid>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <TextField 
                        placeholder="Ingresa la ubicacion de evento"
                        value={eventLocation}
                        onChange = {(event) => setEventLocation(event.target.value)} 
                        />
                    </Grid>
                    <Grid item  style={{ display: "flex", justifyContent: "flex-start" }}>
                      
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
                                    placeholder="Ingresa la descripcion del evento"  
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
                                        value={eventDate}
                                        //minDate={dayjs()}
                                        onChange={(event) => setEventDate(event.format("YYYY-MM-DD"))}
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
                    <Grid item xs={12}  style={{ display: "flex", justifyContent: "flex-start" }}>
                        <div>
                            <h4>¿Hasta que hora puede ingresarse al evento?</h4>
                        </div>
                    </Grid>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <TextField 
                        placeholder="Respuesta 1" 
                        />
                    </Grid>
                    <Grid item xs={12}  style={{ display: "flex", justifyContent: "flex-start" }}>
                        <div>
                            <h4>¿Se suspende el evento por lluvia?</h4>
                        </div>
                    </Grid>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <TextField 
                        placeholder="Respuesta 2" 
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
