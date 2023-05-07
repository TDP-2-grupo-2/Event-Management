import React, { useState } from "react";
import {Card, CardContent, CardMedia, Typography, Box, Button, Dialog, 
    DialogContent, DialogContentText, DialogActions, Alert, Snackbar} from "@mui/material";

import alert from "../images/alert.png" 

export const Event = (props) => {
    let [cancelDialagog, setCancelDialog] = useState(false)
    let [eventCancelSucces, setEventCancelSuccess] = useState(false)
    const APIURL = 'https://event-service-solfonte.cloud.okteto.net'

    

    const handleCancel = () => {
            console.log("entre a handle")
            setCancelDialog(true)
    } 

    const onCancelEvent = async () => {

        const paramsUpload = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const event_id = props.event["_id"]["$oid"]
        console.log(event_id)
        const url = `${APIURL}/events/cancel/${event_id}`;
        console.log(url)
        const response = await fetch(
            url,
            paramsUpload
        );
    
        if (response.status === 200){
            setEventCancelSuccess(true)
        }

    }

    const handleClose = () => {
        setCancelDialog(false);
      };
    
    const handleCloseCancel = () =>{
        setEventCancelSuccess(false)
    }
    const handleEdit = () =>{ 

        console.log(props.event)
        props.event['image'] = props.image
        console.log(props.event["_id"]["$oid"])
        props.setEventToEdit(props.event)
        props.setComponentToRenderize(3)
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
                        {props.event.description || "Aqui iria la describcion del evento que usted creo"}
                    </Typography>
                    </CardContent>
                </Box>
                
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 15, pb: 15, columnGap:"50px", height:"30%"}}>
                <Button variant="contained" 
                        sx={{ color: 'rgba(112, 92, 156)', backgroundColor: 'white', borderColor: 'white' }}
                        size="small"
                        onClick={handleEdit}>Editar
                        
                </Button>
                
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
                                size="small">Publicar
                        </Button>
                    </div>    
                }
                <Dialog
                            open={cancelDialagog}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            maxWidth="xs"
  
                        >
                          
                            <img
                                style={{ width: '5vw', height: '5vw' ,alignSelf: 'center' }}
                                src={alert}
                                class="center"
                                alt="image"
                                
                                />
                        
                             <Typography variant="h3" align="center" color="red">Warning</Typography>
                            
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description" style={{justifyContent:"center"}}>
                            ¿Estás seguro de que querés cancelar este evento?
                            Si cancelas el eventos, se le notificará a los usuarios que iban a asistir al mismo
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions  style={{ justifyContent: "space-between" }}>
                            <Button onClick={handleClose}>Cancelar</Button>
                            <Button onClick={onCancelEvent} autoFocus>
                                Aceptar
                            </Button>
                            </DialogActions>
                        </Dialog>
                        <Snackbar open={eventCancelSucces} autoHideDuration={6000} onClose={handleCloseCancel} 
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center"
                                }}>
                            <Alert onClose={handleCloseCancel} severity="success" sx={{ width: '100%' }}>
                                    El evento a sido cancelado exitosamente
                            </Alert>
                        </Snackbar>

            </Box>
            
            </Card>
        </>
    )
}