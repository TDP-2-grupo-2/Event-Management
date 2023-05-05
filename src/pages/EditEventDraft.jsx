import { Button, Grid, Typography, TextField, Box , MenuItem, Input, Snackbar, Alert} from "@mui/material";
import React , {useState} from "react";
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {MapView, getLatitudandlongitud} from '../components/MapView'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { handleUploadFirebaseImage, deleteFirebaseImage } from '../common/FirebaseHandler';
import { TabSection } from "../components/TabSection";
import { async } from "q";


export const EditDraftEvent = (props) => {
   
       return (
        <div> Holaaaaaa esta mierda no anda</div>

    );
   
    
}
