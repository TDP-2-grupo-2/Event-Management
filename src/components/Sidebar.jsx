import React , {useState} from 'react';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import {FaBeer, FaBars} from 'react-icons/fa'
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
    const[currentPageTitle ,setCurrentPageTitle] = useState('');
    const[componentToRender ,setComponentToRenderize] = useState(0);
    const theme = useTheme();
    const handleSidebarOpen = () => setIsOpen (!isOpen);
    const sidebarFontColor = 'white'// gris'rgba(141,155,180,255)';

    const menuItem = [
        {
            path: "/my-events",
            name: "Mis eventos",
            icon: <AiOutlineHome color={sidebarFontColor}/>,
        },
        {
            path: "/create-event",
            name: "Agregar Eventos",
            icon: <BiCalendarEvent color={sidebarFontColor}/>,
        },
        {
            path: "/metrics",
            name: "Métricas",
            icon: <BsGraphUp color={sidebarFontColor}/>,
        },
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
                    <IconButton
                        color="rgba(137,152,202,255)"
                        aria-label="open drawer"
                        onClick={handleSidebarOpen}
                        edge="start"
                        sx={{ mr: 2, ...(isOpen && { display: 'none' }) }}>
                        <FaBars color={sidebarFontColor}/>
                    </IconButton>
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
                            src="data:image/png;base64,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"
                            />
                        }
                        title='Jorge Perez'
                    />
                    
                   
               
                <Divider/>

                <List>
                {
                    menuItem.map((item, index)=>(
                        <NavItem>
                            <Button variant="text" key={index} className="link" onClick={(item) => {handlePage(index, item)}} style={{textTransform: 'none'}}>
                                <div className="icon" >{item.icon}</div>
                                <div style={{display: isOpen ? "block" : "none", color: sidebarFontColor}} className="link_text">{item.name}</div>
                            </Button>
                        </NavItem>
                    ))
                }
                </List>
            </Drawer>

            <Main open={isOpen} style={{background: 'rgba(137,152,202,255)'}} renderComponent={renderComponent}>
            <DrawerHeader/>
               {componentToRender == 0 ? <MyEvents/>: <></>}
               {componentToRender == 1 ? <CreateEvent/>: <></>}
               {componentToRender == 2 ? <Metrics/>: <></>}            
            </Main>
        </Box>
    )
}




