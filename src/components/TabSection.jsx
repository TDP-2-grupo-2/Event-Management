import React , {useState} from "react";
import PropTypes from 'prop-types';
import { Tabs, Tab,  Grid, Typography, TextField, Box} from "@mui/material";
import {Agenda } from './Agenda'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
export const TabSection = (props) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const addVariableMofify = (attribute, attributeChange) => {
        console.log("entre a guardar variable")
        let aux = props.modifyVariables;
        aux[attribute] = attributeChange
        props.setModifyVariables(aux)
        console.log(props.modifyVariables)
    }

    return (
        <>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' , width: '100%'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Preguntas Frecuentes" {...a11yProps(0)} />
                        <Tab label="Agenda" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Grid container rowSpacing={3} columnSpacing={1}>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <div>
                            <h3>Preguntas Frecuentes</h3>
                            <br/>
                        </div>
                    </Grid>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <div>
                            <h4>¿Hasta que hora puede ingresarse al evento?</h4>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <TextField 
                            placeholder="Respuesta 1" 
                            required
                            value={props.pregunta1}
                            fullWidth
                            size="small"
                            onChange = {(event) => {props.setPregunta1(event.target.value); addVariableMofify("pregunta1", event.target.value)}}
                        />
                    </Grid>
                    <Grid item xs={12}  style={{ display: "flex", justifyContent: "flex-start" }}>
                        <div>
                            <br/>
                            <h4>¿Se suspende el evento por lluvia?</h4>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <TextField 
                            required
                            placeholder="Respuesta 2"
                            value={props.pregunta2} 
                            fullWidth
                            size="small"
                            onChange = {(event) => {props.setPregunta2(event.target.value); addVariableMofify("pregunta2", event.target.value)}}
                        />
                    </Grid>
                    <Grid item xs={12}  style={{ display: "flex", justifyContent: "flex-start" }}>
                        <div>
                            <br/>
                            <h4>¿Se puede acceder con comida?</h4>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <TextField 
                            placeholder="Respuesta 3"
                            required
                            value={props.pregunta3} 
                            fullWidth
                            size="small"
                            onChange = {(event) => {props.setPregunta3(event.target.value);  addVariableMofify("pregunta3", event.target.value)}}
                        />
                    </Grid>
                </Grid>     
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Agenda start={props.eventStartTime}
                            end={props.eventEndTime}
                            agendaValues={props.agendaValues}
                            modifyVariables={props.modifyVariables}
                            setModifyVariables={props.setModifyVariables}
                            setAgendaValues={props.setAgendaValues}>
                            
                </Agenda>
            </TabPanel>
        </Box>
        </>
    );

};