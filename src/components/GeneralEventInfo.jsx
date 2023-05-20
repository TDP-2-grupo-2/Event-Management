
import { Button, Grid, TextField, Box , MenuItem} from "@mui/material";
import React  from "react";
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TabSection } from "./TabSection";
import dayjs from "dayjs";

const eventypes = [
    {
        value: 'CONCIERTO',
        label: 'Concierto',
    },
    {
        value: 'TEATRO',
        label: 'Teatro',
    },
    {
        value: 'CINE',
        label: 'Cine',
    },
    {
        value: 'SHOW',
        label: 'Show',
    },
    {
        value: 'CONFERENCIA',
        label: 'Conferencia',
    },
    {
        value: 'OTRO',
        label: 'Otro',
    },
  ];

export const GeneralEventInfo = (props) => {
    console.log(props.disable)

    const addVariableMofify = (attribute, attributeChange) => {
        let aux = props.modifyVariables;
        aux[attribute] = attributeChange
        props.setModifyVariables(aux)
        console.log(props.modifyVariables)
    }


    return (

        <Box
                    sx={{
                    p: 1,
                    m: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(137,152,202,255)",
                    borderRadius: 1,
                    width:"90%",
                    }}
        >
                <Grid container rowSpacing={3} columnSpacing={1} >
                        <Grid item xs={12} sm={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                            <TextField label="Nombre Evento" 
                            required
                            disabled={props.disable}
                            placeholder="Ingresa el nombre del evento" 
                            value={props.eventName}
                            onChange = {(event) => props.setEventName(event.target.value)}
                            fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                            <TextField label="Descripcion" 
                                        required
                                        placeholder="Ingresa la descripción del evento"  
                                        multiline
                                        rows={1} 
                                        fullWidth
                                        value={props.eventDescription}
                                        onChange = {(event) => {props.setEventDescription(event.target.value); addVariableMofify('eventDescription', event)}}
                                        />
                        </Grid>
                        <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                            <div>
                                <h3>Detalles del evento</h3>
                            </div>
                        </Grid>

                        <Grid item xs={6}  style={{ display: "flex", justifyContent: "flex-start" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopTimePicker label= "Hora inicio"
                                                    
                                                    value={props.eventStartTime || null}
                                                    onChange={(event) => {props.setEventStartTime(event);  addVariableMofify('eventStartTime', event)}}
                                                    />
                            </LocalizationProvider>

                        </Grid>
                        <Grid item xs={6}  style={{ display: "flex", justifyContent: "flex-end" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopTimePicker label="Hora fin" 
                                                    value={props.eventEndTime || null}
                                                    onChange={(event) => {props.setEventEndTime(event);  addVariableMofify('eventEndTime', event)}}
                                                />
                            </LocalizationProvider>

                        </Grid>
                        <Grid item xs={6}   style={{ display: "flex", justifyContent: "flex-start" }}>
                            <TextField
                                label="Capacidad"
                                type="number"
                                disabled={props.disable}
                                value={props.eventCapacity}
                                required
                                onChange = {(event) => props.setEventCapcity(event.target.value)}
                                InputProps={{
                                    inputProps: { min: 0 }
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}  style={{ display: "flex", justifyContent: "flex-end" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label="Fecha" 
                                            value={props.eventDate || null}
                                            minDate={dayjs(Date.now())}
                                            onChange={(event) => {props.setEventDate(dayjs(new Date(event.toISOString()))); addVariableMofify('eventDate', dayjs(new Date(event.toISOString())))}}
                                            
                                            />
                            </LocalizationProvider>

                        </Grid>
                        <Grid item xs={12} sm={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                            <TextField
                                select
                                label="Tipo de Evento"
                                defaultValue="Concierto"
                                disabled={props.disabled}
                                fullWidth
                                required
                                size = 'small'
                                value={props.eventType}
                                onChange = {(event) => props.setEventType(event.target.value)}
                                >
                                {eventypes.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                                    <TabSection
                                            pregunta1={props.pregunta1}
                                            pregunta2={props.pregunta2}
                                            pregunta3={props.pregunta3}
                                            setPregunta1={props.setPregunta1}
                                            setPregunta2={props.setPregunta2}
                                            setPregunta3={props.setPregunta3}
                                            eventStartTime={props.eventStartTime}
                                            eventEndTime={props.eventEndTime}
                                            agendaValues={props.agendaValues}
                                            setAgendaValues={props.setAgendaValues}
                                    >

                                    </TabSection>
                        </Grid>
                    

                </Grid>
            </Box>
    );
}