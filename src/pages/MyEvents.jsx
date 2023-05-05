import React , {useState} from "react";
import PropTypes from 'prop-types';
import { Tabs, Tab,  Grid, Typography,Box} from "@mui/material";
import { ActiveEvents } from '../components/ActiveEvents';
import { DraftEvents } from '../components/DraftEvents';


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
export const MyEvents = (props) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
        <Typography  variant="h3" align="top">
            Mis Eventos
        </Typography>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' , width: '100%'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Borrador" {...a11yProps(0)} />
                        <Tab label="Activos" {...a11yProps(1)} />
                        
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Grid container rowSpacing={3} columnSpacing={1}>
                        <DraftEvents 
                            setEventToEdit={props.setEventToEdit} 
                            setComponentToRenderize={props.setComponentToRenderize} >

                        </DraftEvents>
                </Grid>     
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ActiveEvents
                    setEventToEdit={props.setEventToEdit} 
                    setComponentToRenderize={props.setComponentToRenderize}>
                 </ActiveEvents>
            </TabPanel>
        </Box>
        </>
    );

};
