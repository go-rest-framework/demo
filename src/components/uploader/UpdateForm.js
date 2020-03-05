import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {

    var handleChangeTitle = event => {
        props.setUpdatedItemTitle(event.target.value);
    }

    var handleChangeDescription = event => {
        props.setUpdatedItemDescription(event.target.value);
    }

    function handleSave(e) {
        e.preventDefault();
        var data = {
            title: props.title,
            description: props.description,
        };
        fetch('/api/attachments/' + props.id, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.token
            },
            credentials: "same-origin"
        }).then(function(response) {
            if (response.status === 200) {
                response.json().then(function(res) {
                    if (res.errors != null) {
                        for (var one of res.errors) {
                            console.log(one);
                            setFormdataerrs({
                                [one.item]: one.msg,
                            });
                            if (one.item == 'json') {
                                alert(one.msg);
                            }
                        }
                    } else {
                        props.handleClose();
                    }
                });
            } else if (response.status === 401) {
                sessionStorage.clear();
                location.reload();
            } else {
                //TODO dont work!!!
                alert(response.text());
            }
        }, function(error) {
            alert(error.message); //=> String
        });
    }

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Document Info</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={props.title}
                        onChange={handleChangeTitle}
                        margin="dense"
                        id="title"
                        name="title"
                        label="Document Title"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        value={props.description}
                        onChange={handleChangeDescription}
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
                   <Button onClick={handleSave} color="primary">
                       Save
                   </Button>
               </DialogActions>
           </Dialog>
       </div>
    );
}
