import React from "react"
import { GoogleLogin } from '@react-oauth/google';
import {Typography, Box, Grid} from "@mui/material";
import logo from "../images/logo.png"

export const Login = (props) => {

    const responseMessage = (response) => {
        console.log("respuesta de google")
        console.log(response);
      }
      
    const errorMessage = (error) => {
        console.log(error);
    };

    return(
        <Box  display="flex"
            justifyContent="center"
            alignContent="center"
            marginY="10vh"
            >
            <style>{'body { background-color: rgba(137,152,202,255); }'}</style>
            <Box sx={{
                    p: 1,
                    m: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "white",
                    borderRadius: 1,
                    width:"50%",
                    }} >
                <Grid container>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                        <img  src={logo} alt="Flowers in Chania">

                        </img>
 
                    </Grid>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                        <Typography  variant="h3" align="top">
                            Administracion de eventos
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                        <Typography  variant="h3" align="top">
                            Bienvenido
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                      
                        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />

                    </Grid>
                </Grid>
            </Box>
        </Box> 
    );

};