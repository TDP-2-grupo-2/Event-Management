import {Snackbar, Alert} from "@mui/material";

export const Notification = (props) => {
    
    

    const handleClose = () => {

        props.setNotify({
            ...props.notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
            open={props.notify.isOpen}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
            }}>
            <Alert severity={props.notify.type} onClose={handleClose} sx={{ width: '100%' }}>
                {props.notify.message}
                
            </Alert>
        </Snackbar>
    )

}