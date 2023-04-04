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
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';




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
    const theme = useTheme();
    const handleSidebarOpen = () => setIsOpen (!isOpen);
    const sidebarFontColor = 'white'// gris'rgba(141,155,180,255)';


    const menuItem = [
        {
            path: "/my-events",
            name: "Mis eventos",
            description: "Mis eventos",
            icon: <AiOutlineHome color={sidebarFontColor}/>
        },
        {
            path: "/create-event",
            name: "Agregar Eventos",
            description: "Crear evento",
            icon: <BiCalendarEvent color={sidebarFontColor}/>
        },
        {
            path: "/metrics",
            name: "Metricas",
            description: "Metricas",
            icon: <BsGraphUp color={sidebarFontColor}/>
        },
    ]

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
                <Divider/>

                <List>
                {
                    menuItem.map((item, index)=>(
                        <NavItem>
                            <NavLink to={item.path} key={index} className="link" onClick={() => {setCurrentPageTitle(item.name)}}>
                                <div className="icon" >{item.icon}</div>
                                <div style={{display: isOpen ? "block" : "none", color: sidebarFontColor}} className="link_text">{item.description}</div>
                            </NavLink>
                        </NavItem>
                    ))
                }
                </List>
            </Drawer>

            <Main open={isOpen} style={{bakcground: 'rgba(137,152,202,255)'}}>
            <DrawerHeader/>
            <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
            </Main>
        </Box>
    )
}




