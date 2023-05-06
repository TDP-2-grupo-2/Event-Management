import React from "react";
import {Card, CardContent, CardMedia, Typography, Box, Button, CardActions} from "@mui/material";


export const Event = (props) => {


    const handleEdit = () =>{ 

        console.log(props.event)
        props.event['image'] = props.image
        console.log(props.event["_id"]["$oid"])
        props.setEventToEdit(props.event)
        props.setComponentToRenderize(3)
    }

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
                        {props.event.type || "TIPO DE EVENTO"}
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
                    size="small"> Cancelar
                    </Button>
                }
                { props.isDraft == true &&
                    <Button variant="contained" 
                            sx={{ color: 'rgba(112, 92, 156)', backgroundColor: 'white', borderColor: 'white' }}
                            size="small">Publicar
                    </Button>
                }
            </Box>
            
            </Card>
        </>
    )
}