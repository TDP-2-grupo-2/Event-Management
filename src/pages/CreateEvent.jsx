import { Paper, Grid, Typography, TextField, Box , MenuItem, Input} from "@mui/material";
import React , {useState, useEffect } from "react";
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


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
    const [fileInputShow, setFileInputShow] = useState("");
   
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
                    <Grid container>
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
                        />
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
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <TextField label="Nombre Evento" 
                        placeholder="Ingresa el nombre del evento" 
                        />
                    </Grid>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <TextField label="Descripcion" 
                                    placeholder="Ingresa la descripcion del evento"  
                                    multiline
                                    rows={2} 
                                    />
                    </Grid>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <div>
                            <h3>Detalles del evento</h3>
                        </div>
                    </Grid>

                    <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopTimePicker label= "Hora inicio" defaultValue={dayjs('2022-04-17T15:30')} />
                        </LocalizationProvider>

                    </Grid>
                    <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopTimePicker label="Hora fin" defaultValue={dayjs('2022-04-17T15:30')} />
                        </LocalizationProvider>

                    </Grid>
                    <Grid item xs={6}  style={{ display: "flex", justifyContent: "flex-start" }}>
                        <TextField
                            label="Capacidad"
                            type="number"
                            InputProps={{
                                inputProps: { min: 0 }
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Fecha" defaultValue={dayjs('2022-04-17')} />
                        </LocalizationProvider>

                    </Grid>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <TextField
                            select
                            label="Tipo de Evento"
                            defaultValue="Concierto"
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

            </Grid>
        </Box>
      </Box>
                
        </div>

    );
   
    
};
