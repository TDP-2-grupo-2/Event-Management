import { Button, Grid, Typography, Box , Snackbar, Alert} from "@mui/material";
import React , {useState} from "react";
import dayjs from "dayjs";
import {getLatitudandlongitud} from '../components/MapView'
import { handleUploadFirebaseImage, deleteFirebaseImage } from '../common/FirebaseHandler';
import { DisplayImageLocation } from "../components/DisplayImageLocation";
import { GeneralEventInfo } from "../components/GeneralEventInfo";



export const CreateEvent = (props) => {
    const [open, setOpen] = useState(false)
    const [openSuccessDraftEvent, setOpenSuccessDraftEvent] = useState(false)
    const [eventName, setEventName] = useState("")
    const [eventDescription, setEventDescription] = useState("")
    const [eventStartTime, setEventStartTime] = useState(dayjs('2022-04-17T15:30'))
    const [eventEndTime, setEventEndTime] = useState(dayjs('2022-04-17T17:30'))
    const [eventLocation, setEventLocation] = useState("")
    const [eventDate, setEventDate] = useState(dayjs(Date.now()))
    const [eventCapacity, setEventCapcity] = useState(0)
    const [eventType, setEventType] = useState("")
    const [fileInputShow, setFileInputShow] = useState("");
    const [eventLocationDescription, setEventLocationDescription] = useState("")
    const [agendaValues, setAgendaValues]= useState([{horario:dayjs(eventStartTime), descripcion:''}]);
    
    const [photosNamesHashed, setPhotosNamesHashed] = useState([]);
    const [eventPhotosUpload, setEventPhotosUpload] = useState([]);
    const [locationToMap, setLocationToMap] = useState([])
    const [pregunta1, setPregunta1] = useState("")
    const [pregunta2, setPregunta2] = useState("")
    const [pregunta3, setPregunta3] = useState("")
    const [file, setFile] = useState("")
    
    
    const APIURL = 'https://event-service-solfonte.cloud.okteto.net'

    const onSubmitDraftEvent = async (event) => {
        const month = eventDate.$M  +  1
        const eventDateFormat =  eventDate.$y + "-" + month  + "-" + eventDate.$D
        let eventStartTimeFormat = eventStartTime.$H + ":" + eventStartTime.$m 
        let eventEndTimeFormat = eventEndTime.$H + ":" + eventEndTime.$m 
        let eventPosition = [0,0]
        if (eventLocation != ""){
            eventPosition = await getLatitudandlongitud(eventLocation)
        }
        console.log(eventPosition)
        let photosNames = await handleUploadPhotos();
        let eventAgenda = getAgenda();
        let eventFaqs = getFaqs();
        let token = localStorage.getItem("token")
        console.log("info token")
        console.log(token)
        const paramsUpload = {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: eventName,
                ownerName: localStorage.getItem("username"),
                description: eventDescription,
                location: eventLocation,
                locationDescription: eventLocationDescription,
                capacity: eventCapacity,
                dateEvent: eventDateFormat,
                eventType: eventType,
                tags: ["tag"],
                agenda: eventAgenda,
                latitud: eventPosition[1], 
                longitud: eventPosition[0], 
                start: eventStartTimeFormat,
                end: eventEndTimeFormat,
                photos: photosNames,
                faqs: eventFaqs, 
            })
        };
        const url = `${APIURL}/organizers/draft_events`;
        const response = await fetch(
            url,
            paramsUpload
        );
        const jsonResponse = await response.json();
        console.log("ver respuesta")
        console.log(response.status)
        if (response.status === 200){
            console.log(jsonResponse.status_code)
            if(!jsonResponse.status_code){
                setOpenSuccessDraftEvent(true)
               
            }else{
                console.log("hay error")
                // mostrar mensaje de error 
            }

        }

    }
 
    const onSubmitEvent = async (event) => {
        
        const month = eventDate.$M  +  1
        const eventDateFormat =  eventDate.$y + "-" + month  + "-" + eventDate.$D
        let eventStartTimeFormat = eventStartTime.$H + ":" + eventStartTime.$m 
        let eventEndTimeFormat = eventEndTime.$H + ":" + eventEndTime.$m 
        let eventPosition = await getLatitudandlongitud(eventLocation)
        let photosNames = await handleUploadPhotos();
        let eventAgenda = getAgenda();
        let eventFaqs = getFaqs();

        const paramsUpload = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: eventName,
                owner: localStorage.getItem('username'), // Como no hay login esto tiene q ir harcodeado por ahora (no hay usuario)
                description: eventDescription,
                location: eventLocation,
                locationDescription: eventLocationDescription,
                capacity: eventCapacity,
                dateEvent: eventDateFormat,
                eventType: eventType,
                tags: ["tag"],
                agenda: eventAgenda,
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
        console.log("ver respuesta")
        console.log(response.status)
        if (response.status === 201){
            console.log(jsonResponse.status_code)
            if(!jsonResponse.status_code){
                setOpen(true)
               
            }else{
                console.log("hay error")
                // mostrar mensaje de error 
            }

        }
    }

    const handleClose = () => {
        setOpen(false);
        setOpenSuccessDraftEvent(false);
    };

    const getAgenda = () => {
        const agendaItenirary = []
        console.log("get agendaaa")
        for (let i = 0; i < agendaValues.length; i++){ 
            let time_agenda

            if (agendaValues[i].horario.$m.toString().length == 1){
                console.log("entre")
                time_agenda = agendaValues[i].horario.$H + ":" + agendaValues[i].horario.$m + '0'
                console.log(time_agenda)
            }else{
                time_agenda = agendaValues[i].horario.$H + ":" + agendaValues[i].horario.$m
                console.log(time_agenda)
            }
            
            agendaItenirary.push({'horario': time_agenda, 'descripcion': agendaValues[i].descripcion})
        }
        console.log(agendaItenirary)
        return agendaItenirary
    }

    const getFaqs = () =>{
        const faqs =   [{'pregunta': '¿Hasta que hora puede ingresarse al evento?', 'respuesta': pregunta1},
                        {'pregunta': '¿Se suspende el evento por lluvia?', 'respuesta': pregunta2},
                        {'pregunta': '¿Se puede ingresar con comida?', 'respuesta': pregunta3},]
        return faqs
    }

    // function handleUploadOfFile (event)  {
    //     setFileInputShow(event.target.value);
    //     setEventPhotosUpload(event.target.files)
    //     let url = URL.createObjectURL(event.target.files[0]);
    //     setFile(url)
    // }

    const handleUploadPhotos = async () => {
        const hashedNames = [];
        for ( let i=0; i<eventPhotosUpload.length; i++){
            hashedNames.push(await handleUploadFirebaseImage(eventPhotosUpload[i].name, eventPhotosUpload[i]));
        }
        setPhotosNamesHashed(hashedNames);
        return hashedNames;
    }

    return (
        <div className="CreateEvent" style={{background: "rgba(137,152,202,255)"}}>
            <Typography  variant="h3" align="top">
                Agregar evento
            </Typography>
            <Box display="flex"
                justifyContent="space-between"
                alignItems="center">
            
                <DisplayImageLocation
                    file={file}
                    setFile={setFile}
                    fileInputShow={fileInputShow}
                    setFileInputShow={setFileInputShow}
                    setEventPhotosUpload={setEventPhotosUpload}
                    setLocationToMap={setLocationToMap}
                    eventLocation={eventLocation}
                    setEventLocation={setEventLocation}
                    eventLocationDescription={eventLocationDescription}
                    setEventLocationDescription={setEventLocationDescription}
                    locationToMap={locationToMap}
                >

                </DisplayImageLocation>
                <Grid container rowSpacing={3} columnSpacing={1}>
                    <Grid item xs={12}>
                        <GeneralEventInfo
                            eventName={eventName}
                            setEventName={setEventName}
                            eventDescription={eventDescription}
                            setEventDescription={setEventDescription}
                            eventDate={eventDate}
                            setEventDate={setEventDate}
                            eventStartTime={eventStartTime}
                            setEventStartTime={setEventStartTime}
                            eventEndTime={eventEndTime}
                            setEventEndTime={setEventEndTime}
                            eventCapacity={eventCapacity}
                            setEventCapcity={setEventCapcity}
                            eventType={eventType}
                            setEventType={setEventType}
                            pregunta1={pregunta1}
                            pregunta2={pregunta2}
                            pregunta3={pregunta3}
                            setPregunta1={setPregunta1}
                            setPregunta2={setPregunta2}
                            setPregunta3={setPregunta3}
                            agendaValues={agendaValues}
                            setAgendaValues={setAgendaValues}
                        
                        >
                        </GeneralEventInfo>
                    </Grid>
                    <Grid item xs={6} style={{display: "flex", justifyContent:"center"}}>
                        <div style={{backgroundColor: 'rgba(112, 92, 156)'}}>
                            <Button variant="contained" 
                                    sx={{ color: 'white', backgroundColor: 'rgba(112, 92, 156)', borderColor: 'purple' }}
                                    onClick={onSubmitDraftEvent}
                                    > Guardar Borrador
                            </Button>
                        </div>
                        <Snackbar open={openSuccessDraftEvent} autoHideDuration={6000} onClose={handleClose} 
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center"
                                }}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                El evento a sido guardado como borrador exitosamente
                            </Alert>
                        </Snackbar>


                    </Grid>
                    <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{backgroundColor: 'rgba(112, 92, 156)'}}>
                            <Button variant="contained" 
                                sx={{ color: 'white', backgroundColor: 'rgba(112, 92, 156)', borderColor: 'purple' }}
                                onClick={onSubmitEvent}
                                        >+ Publicar Evento
                            </Button>
                        </div>
                                
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} 
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center"
                                }}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                    El evento a sido creado exitosamente
                            </Alert>
                        </Snackbar>
                    </Grid>
                </Grid> 
      </Box>
                
        </div>

    );
   
    
}
