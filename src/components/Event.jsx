import React from "react";
import {Card, CardContent, CardMedia, Typography, Box} from "@mui/material";


export const Event = (props) => {
   
    return(
        <>
            <Card sx={{ width: '25vw' , height: '25vw' ,borderRadius: '16px',}} style={{backgroundColor: '#705C9C'}}>
            <CardMedia
                component="img"
                sx={{ height: '10vw'}}
                image={props.image}
            />
            <Box display="flex"
                justifyContent="space-between"
                alignItems="center"
                >
                    
                <Box  sx={{
                        p: 1,
                        m: 3,
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: 'white',
                        borderRadius: 1,
                        width:"10%",
                        height: "50%",
                        }}>
                    <Box >
                    <CardContent  >
                    <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 1 }}>
                        {props.month}
                    </Typography>
                    <Typography variant="body2" color="text.primary" sx={{ flexShrink: 1 }}>
                        {props.day}
                    </Typography>
                    </CardContent>
                    </Box>
                </Box>
                <Box sx={{
                        p: 1,
                        m: 1,
                        display: "flex",
                        gap: 2,
                        bgcolor: '#705C9C',
                        borderRadius: 1,
                        width:"90%",
                        height: "10%"
                        }} >
                    
                    <CardContent>
                    <Typography variant="h5" component="div" color='white' wrap sx={{
                        '@media (min-width:600px)': {
                        fontSize: '130%',
                        },
                        '@media (min-width:900px)': {
                        fontSize:'115%',
                        },
                    }}>
                        {props.name}
                        <br />
                    </Typography>
                    <Typography variant="caption" color="white" wrap sx={{
                        '@media (min-width:600px)': {
                        fontSize: '130%',
                        },
                        '@media (min-width:900px)': {
                        fontSize:'60%',
                        },
                    }}>
                        <br />
                        {props.type}
                        <br />
                        {props.description}
                    </Typography>
                    </CardContent>
                </Box>
            </Box>
            
            </Card>
        </>
    )
}