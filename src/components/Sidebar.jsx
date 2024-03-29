import React , {useState} from 'react';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import {FaBeer, FaBars, FaDoorClosed} from 'react-icons/fa'
import {AiOutlineHome} from 'react-icons/ai'
import {BsGraphUp, BsGear}from 'react-icons/bs'
import {BiCalendarEvent} from 'react-icons/bi'
import {NavItem} from 'reactstrap';
import { NavLink} from 'react-router-dom';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Metrics } from '../pages/Metrics';
import { MyEvents } from '../pages/MyEvents';
import { CreateEvent } from '../pages/CreateEvent';
import { Button } from '@mui/material';
import {Avatar, CardHeader} from '@mui/material';
import { EditDraftEvent } from '../pages/EditEventDraft';
import {EditActiveEvent} from '../pages/EditActiveEvent';




const drawerWidth = 300;



const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );
  
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

export const Sidebar = () => {
    const[isOpen ,setIsOpen] = useState(false);
    const[event, setEvent] = useState(0);
    const[currentPageTitle ,setCurrentPageTitle] = useState('');
    const[componentToRender ,setComponentToRenderize] = useState(0);
    const theme = useTheme();
    const handleSidebarOpen = () => setIsOpen (!isOpen);
    const sidebarFontColor = 'white'// gris'rgba(141,155,180,255)';

    const menuItem = [
        {
            path: "/my-events",
            name: "Mis eventos",
            show: true,
            icon: <AiOutlineHome color={sidebarFontColor}/>,
        },
        {
            path: "/create-event",
            name: "Agregar Eventos",
            show: true,
            icon: <BiCalendarEvent color={sidebarFontColor}/>,
        },
        {
            path: "/metrics",
            name: "Métricas",
            show: true,
            icon: <BsGraphUp color={sidebarFontColor}/>,
        },
        {
            path: "/edit-draft-event",
            name: "Edit draft event",
            show: false,
        },
        {
            path:"/edit-active-event",
            name:"Edit active event",
            show: false,
        }
    ]
    const renderComponent = () => {
        return componentToRender
    }

    const handlePage = (index, item) => {
        setCurrentPageTitle(item.name)
        setComponentToRenderize(index)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <style>{'body { background-color: rgba(137,152,202,255); }'}</style>
            <CssBaseline />
            <AppBar elevation={0} position="fixed" open={isOpen} currentPageTitle={currentPageTitle}  style={{ background: 'transparent' }}>
                <Toolbar>
                    {!isOpen? <IconButton
                        color="rgba(137,152,202,255)"
                        aria-label="open drawer"
                        onClick={handleSidebarOpen}
                        edge="start"
                        sx={{ mr: 2, ...(isOpen && { display: 'none' }) }}>
                        <FaBars color={sidebarFontColor}/>
                    </IconButton> : <></>}
                    
                    <Typography variant="h6" noWrap component="div">
                        {currentPageTitle}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                width: drawerWidth,
                flexShrink: 0,
                    '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    background: 'rgba(112, 92, 156)'
                    },
                }}
                variant="persistent"
                anchor="left"
                open={isOpen}
                >
                <DrawerHeader>
                    <Typography variant="h6" noWrap component="div" align='center' color={sidebarFontColor}>
                        Administracion de eventos
                    </Typography>
                    <IconButton onClick={handleSidebarOpen}>
                        <FaBars color={sidebarFontColor}/>
                    </IconButton>    
                </DrawerHeader>
                <CardHeader 
                        avatar={
                            <Avatar
                            alt="Remy Sharp"
                            src={localStorage.getItem('picture')}
                            />
                        }
                        title={localStorage.getItem('username')}
                    />
                    
                   
               
                <Divider/>

                <List>
                {
                    menuItem.map((item, index)=>(
                        item.show? 
                        <NavItem>

                            <Button variant="text" key={index} className="link" onClick={(item) => {handlePage(index, item)}} style={{textTransform: 'none'}}>
                                <div className="icon" >{item.icon}</div>
                                <div style={{display: isOpen ? "block" : "none", color: sidebarFontColor}} className="link_text">{item.name}</div>
                            </Button>
                            
                        </NavItem>
                        : <div></div>
                    ))
                }
                </List>
            </Drawer>

            <Main open={isOpen} style={{background: 'rgba(137,152,202,255)'}} renderComponent={renderComponent}>
            <DrawerHeader/>
               {componentToRender == 0 ? <MyEvents setEventToEdit={setEvent} setComponentToRenderize={setComponentToRenderize}/>: <></>}
               {componentToRender == 1 ? <CreateEvent/>: <></>}
               {componentToRender == 2 ? <Metrics/>: <></>}  
               {componentToRender == 3 ? <EditDraftEvent eventToEdit={event}/>: <></>}         
               {componentToRender == 4 ? <EditActiveEvent eventToEdit={event}/>: <></>}     
            </Main>
        </Box>
    )
}




