import React, { useState } from "react";
import {Card, CardContent, CardMedia, Typography, Box, Button, Dialog, 
    DialogContent, DialogContentText, DialogActions} from "@mui/material";
import { Notification } from "./Notification";
import { InfoPopUp } from "./InfoPopUp";
import alert from "../images/alert.png" 
import dayjs from "dayjs";

export const Event = (props) => {
    let [cancelDialagog, setCancelDialog] = useState(false)
    const [notifyCancel, setNotifyCancel] = useState({isOpen: false, message: '', type: ''})
    const [notifyPublish, setNotifyPublish] = useState({isOpen: false, message:'', type:''})

    const APIURL = 'https://event-service-solfonte.cloud.okteto.net'

    const allFieldsAreNotFill = () => {
        if (props.event.name == "" || props.event.description == "" || props.event.location == ""){
            return true
        } else {
            return false
        }
    }
    
    const handleCancel = () => {
        console.log("entre a handle")
        setCancelDialog(true)
    } 


    const handlePublish = async () => {
        console.log("entre")
        console.log(dayjs(Date.now()))
        console.log(dayjs(props.event.dateEvent))
        console.log(dayjs(Date.now()) > dayjs(props.event.dateEvent))
        if (allFieldsAreNotFill()){
            setNotifyPublish({
                isOpen: true,
                message: 'Por favor carga todos los campos antes de publicar',
                type: 'error'
            })
        
        } else if (dayjs(Date.now()) > dayjs(props.event.dateEvent)){
            setNotifyPublish({
                isOpen: true,
                message: 'Por favor publicar una fecha valida',
                type: 'error'
            })
        } else {
            
            console.log(typeof props.event)
            console.log(props.event)
            console.log(props.event)
            let token = localStorage.getItem("token")
            const paramsUpload = {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: props.event.name,
                    ownerName: localStorage.getItem('username'), // Como no hay login esto tiene q ir harcodeado por ahora (no hay usuario)
                    description: props.event.description,
                    location: props.event.location,
                    locationDescription: props.event.locationDescription,
                    capacity: props.event.capacity,
                    dateEvent: props.event.dateEvent,
                    eventType: props.event.eventType,
                    tags: ["tag"],
                    agenda: props.event.agenda,
                    latitud: props.event.latitud,
                    longitud: props.event.longitud,
                    start: props.event.start,
                    end: props.event.end,
                    photos: props.event.photos,
                    faqs: props.event.faqs, 
                    draftId: props.event["_id"]["$oid"]
                })
            };
            console.log(paramsUpload)
            const url = `${APIURL}/organizers/active_events`;
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
                    console.log("entreeeeee")
                    setNotifyPublish({
                        isOpen: true,
                        message: 'Evento ha sido publicado exitosamente',
                        type: 'success'
                    })
                    props.setChange("publicar")
                
                }else{
                    console.log("hay error")
                    setNotifyPublish({
                        isOpen: true,
                        message: 'Error al publicar el evento',
                        type: 'error'
                    })
                }

            } else {
                console.log("entreeee")
                setNotifyPublish({
                    isOpen: true,
                    message: 'Error al publicar evento',
                    type: 'error'
                })
            
            }
        }
    }

    const sendNotifications = async (event) => {
        console.log("entre a send notifications")
        const paramsUpload = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: "Se ha cancelado el evento.",
                modifications: {"status": "cancelled"},
                event_id: props.event["_id"]["$oid"],
                event_name: props.event.name
            })
        };
        const url = 'https://notifications-service-agustinaa235.cloud.okteto.net/notifications/modifications';
        const response = await fetch(
            url,
            paramsUpload
        );
        const jsonResponse = await response.json();
        console.log(response.status);
        if (response.status === 201){
            console.log(jsonResponse.status_code)
            if(!jsonResponse.status_code){
                console.log("se enviaron todos los mensajes")

            }
        }
        return response.status
    }

    const onCancelEvent = async () => {
        let token = localStorage.getItem("token")
        const paramsUpload = {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };
        const event_id = props.event["_id"]["$oid"]
        console.log(event_id)
        const url = `${APIURL}/organizers/canceled_events/${event_id}`;
        console.log(url)
        const response = await fetch(
            url,
            paramsUpload
        );
        let aux = await sendNotifications();
        console.log(aux)
        if (response.status === 200 && aux === 201){
            setNotifyCancel({isOpen:true, message:"El evento ha sido cancelado exitosamente", type:"success"})
            setCancelDialog(false);
            props.setChange("cancelar")
        }

    }

    const handleClose = () => {
        setCancelDialog(false);
      };
    

    const handleEdit = () =>{ 
    
        if (props.isDraft){
           
            props.event['image'] = props.image
            props.setEventToEdit(props.event)
            props.setComponentToRenderize(3)
        }else{

            props.event['image'] = props.image
            props.setEventToEdit(props.event)
            props.setComponentToRenderize(4)
        }
    }
    console.log(props.event)
    return(
        <>
            <Card sx={{ width: '25vw' , height: '25vw' ,borderRadius: '16px',}} style={{backgroundColor: '#705C9C'}}>
            <CardMedia
                component="img"
                sx={{ height: '10vw'}}
                image={props.image || "https://www.fml.com.mx/wp-content/uploads/2016/04/Race-Registration-Image-Not-Found.png"}
            />
            <Box display="flex"
                justifyContent="space-between"
                alignItems="center"
                >
                    
                <Box  sx={{
                        p: 1,
                        m: 3,
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: 'white',
                        borderRadius: 1,
                        width:"10%",
                        height: "50%",
                        }}>
                    <Box >
                    <CardContent  >
                    <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 1 }}>
                        {props.event.month}
                    </Typography>
                    <Typography variant="body2" color="text.primary" sx={{ flexShrink: 1 }}>
                        {props.event.day}
                    </Typography>
                    </CardContent>
                    </Box>
                </Box>
                <Box sx={{
                        p: 1,
                        m: 1,
                        display: "flex",
                        gap: 2,
                        bgcolor: '#705C9C',
                        borderRadius: 1,
                        width:"90%",
                        height: "10%"
                        }} >
                    
                    <CardContent>
                    <Typography variant="h5" component="div" color='white' wrap sx={{
                        '@media (min-width:600px)': {
                        fontSize: '130%',
                        },
                        '@media (min-width:900px)': {
                        fontSize:'115%',
                        },
                    }}>
                        {props.event.name || "Nombre del evento" }
                        <br />
                    </Typography>
                    <Typography variant="caption" color="white" wrap sx={{
                        '@media (min-width:600px)': {
                        fontSize: '130%',
                        },
                        '@media (min-width:900px)': {
                        fontSize:'60%',
                        },
                    }}>
                        <br />
                        {props.event.eventType || "TIPO DE EVENTO"}
                        <br />
                        {props.isSuspended &&   <div> <br /> Motivo: {props.event.suspendMotive} <br /> </div>}
                        {props.event.description || "Aqui iria la describcion del evento que usted creo"}
                    </Typography>
                    </CardContent>
                </Box>
                
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 15, pb: 15, columnGap:"50px", height:"30%"}}>
                {(props.isActive==true || props.isDraft==true) &&
                    <Button variant="contained" 
                            sx={{ color: 'rgba(112, 92, 156)', backgroundColor: 'white', borderColor: 'white' }}
                            size="small"
                            onClick={handleEdit}>Editar
                            
                    </Button>
                }
                
                {props.isActive == true &&
                    <Button variant="contained" 
                    sx={{ color: 'rgba(112, 92, 156)', backgroundColor: 'white', borderColor: 'white' }}
                    size="small"
                    onClick={handleCancel}> Cancelar
                    </Button>
                    
                }
                { props.isDraft == true &&
                    <div>
                        <Button variant="contained" 
                                sx={{ color: 'rgba(112, 92, 156)', backgroundColor: 'white', borderColor: 'white' }}
                                onClick={handlePublish}
                                size="small">Publicar
                        </Button>
                    </div>    
                }
                <InfoPopUp 
                    openDialog={cancelDialagog}
                    handleClose={handleClose}
                    text="¿Estás seguro de que querés cancelar este evento?Si cancelas el eventos, se le notificará a los usuarios que iban a asistir al mismo"
                    image={alert}
                    mainText="Warning"
                    onClick={onCancelEvent}
                />
                <Notification
                    notify={notifyCancel}
                    setNotify={setNotifyCancel}/>
                
                <Notification
                    notify={notifyPublish}
                    setNotify={setNotifyPublish}/>
                
                    

            </Box>
            
            </Card>
        </>
    )
}