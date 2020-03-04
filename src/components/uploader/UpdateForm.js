import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Document Info</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        name="title"
                        label="Document Title"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Document Description"
                        type="text"
                        fullWidth
                    />
               </DialogContent>
               <DialogActions>
                   <Button onClick={props.handleClose} color="primary">
                       Cancel
                   </Button>
                   <Button onClick={props.handleClose} color="primary">
                       Subscribe
                   </Button>
               </DialogActions>
           </Dialog>
       </div>
    );
}
