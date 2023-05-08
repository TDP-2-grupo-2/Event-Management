import { Button, Grid, Typography, Box , Snackbar, Alert} from "@mui/material";
import React , {useState} from "react";
import dayjs from "dayjs";
import {getLatitudandlongitud} from '../components/MapView'
import { handleUploadFirebaseImage, deleteFirebaseImage } from '../common/FirebaseHandler';
import { DisplayImageLocation } from "../components/DisplayImageLocation";
import { GeneralEventInfo } from "../components/GeneralEventInfo";
import {Notification} from '../components/Notification'


export const EditDraftEvent = (props) => {
    console.log("entre a edit eventDRaft")
    console.log(props)
    console.log(props.eventToEdit)
    console.log(Object.keys(props.eventToEdit));
    console.log(props.eventToEdit.start)
    const [notifyModify, setNotifyModify] = useState({isOpen: false, message: '', type: ''})
    const [notifyPublish, setNotifyPublish] = useState({isOpen: false, message:'', type:''})
 
    const [eventName, setEventName] = useState(props.eventToEdit.name)
    const [eventDescription, setEventDescription] = useState(props.eventToEdit.description)
    const [eventStartTime, setEventStartTime] = useState(dayjs(props.eventToEdit.start, "HH:mm:ss"))
    const [eventEndTime, setEventEndTime] = useState(dayjs(props.eventToEdit.end, "HH:mm:ss"))
    const [eventLocation, setEventLocation] = useState(props.eventToEdit.location)
    const [eventDate, setEventDate] = useState(dayjs(props.eventToEdit.dateEvent))
    const [eventCapacity, setEventCapcity] = useState(props.eventToEdit.capacity)
    const [eventType, setEventType] = useState(props.eventToEdit.eventType)
    const [fileInputShow, setFileInputShow] = useState("");
    const [eventLocationDescription, setEventLocationDescription] = useState(props.eventToEdit.locationDescription)
    const [agendaValues, setAgendaValues]= useState(props.eventToEdit.agenda);
    
    const [photosNamesHashed, setPhotosNamesHashed] = useState([]);
    const [eventPhotosUpload, setEventPhotosUpload] = useState([]);
    const [locationToMap, setLocationToMap] = useState([props.eventToEdit.latitud, props.eventToEdit.longitud])
    const [pregunta1, setPregunta1] = useState(props.eventToEdit.faqs[0]['respuesta'])
    const [pregunta2, setPregunta2] = useState(props.eventToEdit.faqs[1]['respuesta'])
    const [pregunta3, setPregunta3] = useState(props.eventToEdit.faqs[2]['respuesta'])
    const [file, setFile] = useState(props.eventToEdit.image)

    
    const APIURL = 'https://event-service-solfonte.cloud.okteto.net'

    const onSubmitSaveDraftEvent = async (event) => {
        console.log("ENTREEEE")
        const month = eventDate.$M  +  1
        const eventDateFormat =  eventDate.$y + "-" + month  + "-" + eventDate.$D
        let eventStartTimeFormat = eventStartTime.$H + ":" + eventStartTime.$m  + ":00"
        let eventEndTimeFormat = eventEndTime.$H + ":" + eventEndTime.$m  + ":00"
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
            method: "PATCH",
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
        console.log("ESTOY ACA LA PUTA MADRE")
        console.log(paramsUpload)
        console.log("id del evento")
        console.log(props.eventToEdit['_id'])
        const id = props.eventToEdit['_id']['$oid']
        const url = `${APIURL}/organizers/draft_events/${id}`;
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
                setNotifyModify({
                    isOpen: true,
                    message: 'Evento ha sido modificado exitosamente',
                    type: 'success'
                })
               
            }else{
                console.log("hay error")
                setNotifyModify({
                    isOpen: true,
                    message: 'Error al modidificar el evento. Intente mas tarde',
                    type: 'error'
                }) 
            }

        }

    }

    const allFieldsAreNotFill = () => {
        if (eventName == "" || eventDescription == "" || eventLocation == ""){
            return true
        } else {
            return false
        }
    }
 
    const onPublishEvent = async (event) => {
        
        if (allFieldsAreNotFill()){
            setNotifyPublish({
                isOpen: true,
                message: 'Por favor carga todos los campos antes de publicar',
                type: 'error'
            })
        } else {
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
            console.log(paramsUpload)
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
                    setNotifyPublish({
                        isOpen: true,
                        message: 'Evento ha sido publicado exitosamente',
                        type: 'success'
                    })
                
                }else{
                    console.log("hay error")
                    setNotifyPublish({
                        isOpen: true,
                        message: 'Error al publicar el evento',
                        type: 'error'
                    })
                }

            } else {
                setNotifyPublish({
                    isOpen: true,
                    message: 'Evento ha sido publicado exitosamente',
                    type: 'success'
                })
            
            }
        }
    }

    const getAgenda = () => {
        console.log(agendaValues)
        const agendaItenirary = []
        
        for (let i = 0; i < agendaValues.length; i++){ 
            let time_agenda = agendaValues[i].horario
            if (typeof agendaValues[i].horario !== "string"){
                if (agendaValues[i].horario.$m.toString().length == 1){
                    console.log("entre")
                    time_agenda = agendaValues[i].horario.$H + ":" + agendaValues[i].horario.$m + '0' + ":00"
                    console.log(time_agenda)
                }else{
                    time_agenda = agendaValues[i].horario.$H + ":" + agendaValues[i].horario.$m + ":00"
                    console.log(time_agenda)
                }
            }
            agendaItenirary.push({'horario': time_agenda, 'descripcion': agendaValues[i].descripcion})
        }
        return agendaItenirary
    }

    const getFaqs = () =>{
        const faqs =   [{'pregunta': '¿Hasta que hora puede ingresarse al evento?', 'respuesta': pregunta1},
                        {'pregunta': '¿Se suspende el evento por lluvia?', 'respuesta': pregunta2},
                        {'pregunta': '¿Se puede ingresar con comida?', 'respuesta': pregunta3},]
        return faqs
    }


    const handleUploadPhotos = async () => {
        if (eventPhotosUpload.length == 0){
            return props.eventToEdit.photos
        }
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
                            disable={false}
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
                                    onClick={onSubmitSaveDraftEvent}
                                    > Modificar Borrador
                            </Button>
                        </div>
                        <Notification
                            notify={notifyModify}
                            setNotify={setNotifyModify}/>   
                        


                    </Grid>
                    <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{backgroundColor: 'rgba(112, 92, 156)'}}>
                            <Button variant="contained" 
                                sx={{ color: 'white', backgroundColor: 'rgba(112, 92, 156)', borderColor: 'purple' }}
                                onClick={onPublishEvent}
                                        >+ Publicar Evento
                            </Button>
                        </div>
                          
                       
                        <Notification
                            notify={notifyPublish}
                            setNotify={setNotifyPublish}/>
                        
                    </Grid>
                </Grid> 
      </Box>
                
        </div>

    ); 
}
   
    

