import {React} from "react"
import {Typography,Button, Dialog, DialogContent, DialogContentText, DialogActions} from "@mui/material";






export const InfoPopUp = (props) => {
    return (
        <Dialog 
                open={props.openDialog}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xs"
  
        >
                          
            <img
                style={{ width: '5vw', height: '5vw' ,alignSelf: 'center' }}
                src={props.image}
                class="center"
                alt="image"
                                
            />
                        
            <Typography variant="h3" align="center" color="red">{props.mainText}</Typography>
                            
            <DialogContent>
                <DialogContentText id="alert-dialog-description" style={{justifyContent:"center"}}>
                    {props.text}
                </DialogContentText>
            </DialogContent>
            <DialogActions  style={{ justifyContent: "space-between" }}>
                <Button onClick={props.handleClose}>Cancelar</Button>
                <Button onClick={props.onClick} autoFocus>
                        Aceptar
            </Button>
            </DialogActions>
        </Dialog>
    );
}