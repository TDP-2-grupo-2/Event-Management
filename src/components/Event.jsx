import React from "react";
import {Card, CardContent, CardMedia, Typography, Box} from "@mui/material";


export const Event = (props) => {
    return(
        <>
            <Card x={{ maxWidth: "100%", height:"100%"}} style={{backgroundColor: '#705C9C'}}>
            <CardMedia
                component="img"
                sx={{ height: 150}}
                image={props.image}
            />
            <Box display="flex"
                justifyContent="space-between"
                alignItems="center">
                <Box  sx={{
                        p: 1,
                        m: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: 'white',
                        borderRadius: 1,
                        width:"20%",
                        height: "20%",
                        }}>
                    <Box>
                    <CardContent >
                    <Typography variant="body2" color="text.secondary">
                        {props.month}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        {props.date}
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
                        width:"80%",
                        }} >
                    
                    <CardContent>
                    <Typography variant="h4" component="div" color='white'>
                        {props.name}
                        <br />
                    </Typography>
                    <Typography variant="body2" color="white">
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