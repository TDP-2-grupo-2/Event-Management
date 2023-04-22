import React from "react";
import { useState, useEffect } from 'react';
import { Button,Grid, TextField} from "@mui/material";
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import { element } from "prop-types";


export const  Agenda = (props)  => {


    const handleHourChange=(e, index)=>{
        const {name, value} = e.target
        const list= [...props.agendaValues];
        list[index][name]= value;
        props.setAgendaValues(list);
    }

    const handleDescriptionChange=(e, index)=>{
        const {name, value}= e.target;
        const list= [...props.agendaValues];
        list[index][name]= value;
        props.setAgendaValues(list);
    
      }

      const handleremove = (e, index) => {
        console.log("entre a revove")
        console.log(index)
        console.log(props.agendaValues)
        const list=[...props.agendaValues];
        list.splice(index,1);
        console.log(list)
        props.setAgendaValues(list);
      }

      const handleAddingAgenda=(e, index)=>{ 
        console.log("entre a add")
        console.log(index)
        console.log(props.agendaValues)
        const list = [...props.agendaValues]
        list.splice(index, 0, { time:dayjs(props.agendaValues[index -1].time), description:''});
        props.setAgendaValues(list)
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
                                        minTime={ idx > 0 ? props.agendaValues[idx -1].time : props.start}
                                        maxTime={props.agendaValues.length >= 3 && idx !== (props.agendaValues.length -1) ? props.agendaValues[idx +1].time : props.end}
                                        onChange={e=>handleHourChange({ target: { value: dayjs(new Date(e.toISOString())), name: 'time' } },idx)}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={5}>
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
                                    onClick={e=>handleAddingAgenda(e, idx +1)}
                                    >
                                + 
                            </Button>
                        </Grid>
                        {
                            idx > 0 &&
                        <Grid item xs={2}>
                            <Button  sx={{ color: 'white', backgroundColor: 'rgba(112, 92, 156)', borderColor: 'purple' }}
                                    onClick={e=>handleremove(e, idx)}
                                    >
                                - 
                            </Button>
                        </Grid>  
                        }
                    </>
                )
                }) 
            }
        </Grid> 
    );
};
