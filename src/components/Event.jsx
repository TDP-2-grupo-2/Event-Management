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
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: 'white',
                        borderRadius: 1,
                        width:"10%",
                        height: "50%",
                        }}>
                    <Box>
                    <CardContent  >
                    <Typography variant="body2" color="text.secondary">
                        {props.month}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        {props.day}
                    </Typography>
                    </CardContent>
                    </Box>
                </Box>
                <Box sx={{
                        p: 1,
                        m: 1,
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        bgcolor: '#705C9C',
                        borderRadius: 1,
                        width:"90%",
                        height: "10%"
                        }} >
                    
                    <CardContent>
                    <Typography variant="h5" component="div" color='white'>
                        {props.name}
                        <br />
                    </Typography>
                    <Typography variant="caption" color="white">
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