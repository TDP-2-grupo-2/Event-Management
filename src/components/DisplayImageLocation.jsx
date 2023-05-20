import React from "react";
import { Button, Grid, TextField, Box ,Input} from "@mui/material";
import {MapView, getLatitudandlongitud} from '../components/MapView'



export const DisplayImageLocation = (props) => {

    const addVariableMofify = (attribute, attributeChange) => {
        console.log("entre a guardar variable")
        let aux = props.modifyVariables;
        aux[attribute] = attributeChange
        props.setModifyVariables(aux)
        console.log(props.modifyVariables)
    }
    function handleUploadOfFile (event)  {
        props.setFileInputShow(event.target.value);
        props.setEventPhotosUpload(event.target.files)
        let url = URL.createObjectURL(event.target.files[0]);
        props.setFile(url)
        addVariableMofify("photo", url)
    }
    


    return(
        <Box
            sx={{
                p: 1,
                m: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(137,152,202,255)",
                borderRadius: 1,
                width:"70%",
                }} 
        >
            <Grid container rowSpacing={4} columnSpacing={2}>
                <Grid item xs={12}>
                    <Input
                        id="photosInput"
                        label="Upload Photos"
                        name="Upload Photos"
                        className={"inputStyle"}
                        value={props.fileInputShow}
                        inputProps = {{accept: "image/*", "multiple":false}}
                        type = "file"
                        style={{width:"100%", marginBottom: 10}}
                        onChange = {(event) => {handleUploadOfFile(event)}}
                    />
                </Grid>
                {
                    props.file.length > 0 &&            
                    <Grid item xs={6}>
                            <img
                                src={props.file}
                                alt={props.fileInputShow}
                                style={{width: 'auto', height: 'auto', maxWidth:'300px', maxHeight: '300px'}}
                            />
                    </Grid>
                }
                <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start", direction: "row"}}>
                    <div>
                        <h3>Ubicacion</h3>
                    </div>
                    
                </Grid>
                
                <Grid item xs={6}  style={{ display: "flex", justifyContent: "flex-start" }}>
                    <TextField 
                    fullWidth
                    required
                    placeholder="Ingresa la ubicacion de evento"
                    value={props.eventLocation}
                    onChange = {(event) => {props.setEventLocation(event.target.value); addVariableMofify("eventLocation", event.target.value)}} 
                    />
                </Grid>
                <Grid item xs={6}  style={{ display: "flex", justifyContent: "flex-start" }}>
                    <TextField 
                        fullWidth
                        placeholder="Detalle la ubicación del evento"
                        value={props.eventLocationDescription}
                        onChange = {(event) => {props.setEventLocationDescription(event.target.value); addVariableMofify("eventLocationDescription", event.target.value)}} 
                />                    
                </Grid>
                <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div style={  {backgroundColor: '#705C9C', }}>
                    <Button 
                        variant="contained"
                        onClick={() => props.setLocationToMap(props.eventLocation)}
                        sx={{ color: 'white', backgroundColor: '#705C9C', borderColor: 'purple' }}
                    >
                            Marcar en el mapa
                    </Button>
                    </div>
                    
                </Grid>
                <Grid item  style={{ display: "flex", justifyContent: "center" }}>
                    <MapView location={props.locationToMap}/>
                </Grid>
                    
                    
            </Grid>
                    
                
        </Box>
    );
}