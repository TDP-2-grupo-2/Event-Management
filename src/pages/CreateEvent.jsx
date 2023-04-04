import { Paper, Grid, Typography, TextField } from "@mui/material";
import React , {useState, useEffect } from "react";



const initialValues = {
    eventName: "",
    description: "",
}

export const CreateEvent = () => {
    console.log("entreeeee")
    const [values, setValues] =useState(initialValues)
  

    return (
        <div className="CreateEvent">
            <Typography gutterBottom variant="h3" align="center">
                Create Event
            </Typography>
            
            <Grid container spacing={8}  >
                    <Grid  item xs={12}>
                        <TextField label="Nombre Evento" 
                        placeholder="Ingresa el nombre del evento" 
                        variant="outlined" 
                        value= {values.eventName}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Descripcion" 
                                    placeholder="Ingresa la descripcion del evento" 
                                    variant="outlined"  
                                    value={values.description}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Descripcion" 
                                    placeholder="Ingresa la descripcion del evento" 
                                    variant="outlined"  
                                    value={values.description}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Descripcion" 
                                    placeholder="Ingresa la descripcion del evento" 
                                    variant="outlined"  
                                    value={values.description}/>
                    </Grid>
            </Grid>
                
        </div>

    );
   
    
};
