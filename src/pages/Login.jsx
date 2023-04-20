import React , {useState, useEffect} from "react"
import { GoogleLogin } from '@react-oauth/google';
import {Typography, Box, Grid} from "@mui/material";
import logo from "../images/logo.png"
import hand from "../images/hand.png"
import jwt_decode from "jwt-decode";


export const Login = (props) => {
    const APIURL = 'https://event-service-solfonte.cloud.okteto.net'

    const responseMessage = async (googleMessage) => {
        console.log("respuesta de google")
        console.log(googleMessage);
        let decoded = jwt_decode(googleMessage.credential);
 
        const userName = decoded.given_name + " " + decoded.family_name 
        const userEmail = decoded.email
        const picture = decoded.picture
        console.log(userName)
        console.log(userEmail)
        const paramsLogin = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userEmail,
                name: userName,
            })
        };
        const url = `${APIURL}/organizers/loginGoogle`;
        const response = await fetch(
            url,
            paramsLogin
        );
        const jsonResponse = await response.json();
        console.log(response)
        if (response.status === 200){
            console.log(jsonResponse)
            if(!jsonResponse.status_code){
                localStorage.setItem("sessionToken", true);
                localStorage.setItem("username", JSON.parse(paramsLogin.body).name);
                localStorage.setItem("user", {'username': JSON.parse(paramsLogin.body).name, 
                                                'token': jsonResponse,
                                                'picture': picture})
                window.dispatchEvent(new Event('storage')); 
                props.setAuthentification(true)

            }else{
                
            }
   
        }
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
                    bgcolor: "rgba(112, 92, 156)",
                    borderRadius: 1,
                    width:"50%",
                    }} >
                <Grid container  rowSpacing={4}>
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
                        <img  src={hand} alt="Flowers in Chania">

                        </img>
 
                    </Grid>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                      
                        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />

                    </Grid>
                </Grid>
            </Box>
        </Box> 
    );

};