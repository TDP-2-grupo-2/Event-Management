import React from "react";
import { useState, useEffect } from 'react';
import { Button,Grid, TextField} from "@mui/material";
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";


export const  Agenda = (props)  => {
    const [actualTimeValue, setActualValue] = useState(dayjs(props.start))

    const handleHourChange=(e, index)=>{
        console.log(props.agendaValues)
        const {name, value} = e.target
        setActualValue(value)
        const list= [...props.agendaValues];
        list[index][name]= value;
        props.setAgendaValues(list);
    }

    const handleDescriptionChange=(e, index)=>{
        console.log(props.agendaValues)
        const {name, value}= e.target;
        const list= [...props.agendaValues];
        list[index][name]= value;
        props.setAgendaValues(list);
    
      }

      const handleremove= index=>{
        const list=[...props.agendaValues];
        list.splice(index,1);
        props.setAgendaValues(list);
      }

      const handleAddingAgenda=()=>{ 
        props.setAgendaValues([...props.agendaValues,{ time:dayjs(actualTimeValue), description:''}])
      }


    return (
        <Grid container spacing={3}>
            {props.agendaValues.map( (prop, idx) => {
                return (
                    <>
                        <Grid item xs={3}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopTimePicker                      
                                        value={prop.time}
                                        name="time"
                                        minTime={props.start}
                                        maxTime={props.end}
                                        onChange={e=>handleHourChange({ target: { value: dayjs(new Date(e.toISOString())), name: 'time' } },idx)}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField    
                                    placeholder="Descripcion"  
                                    name="description"
                                    onChange={e=>handleDescriptionChange({ target: { value: e.target.value, name: 'description' } },idx)}
                                    fullWidth
                                    value={prop.description}
                            />
                        </Grid> 
                        <Grid item xs={2}>
                            <Button  sx={{ color: 'white', backgroundColor: 'rgba(112, 92, 156)', borderColor: 'purple' }}
                                    onClick={handleAddingAgenda}
                                    >
                                + 
                            </Button>
                        </Grid> 
                    </>
                )
                }) 
            }
        </Grid> 
    );
};
