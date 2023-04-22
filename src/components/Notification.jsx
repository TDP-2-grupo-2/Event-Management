import { Snackbar } from "@material-ui/core";
import { useState } from "react";
import { Alert } from "@material-ui/lab";


export const Notification = (props) => {
    const {notify, setNotify} = props;
    console.log(notify)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
        open={notify.isOpen}
        autoHideDuration={3000}
        onClose={handleClose}>
            <Alert severity={notify.type}
            onClose={handleClose}>
                {notify.message}
                
            </Alert>
        </Snackbar>
    )

}