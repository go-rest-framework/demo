import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {

    return (
        <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleDeleteAbort}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Confirm the inevitable deletion of the user?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
              {props.msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleDeleteAbort} color="primary">
            Disagree
          </Button>
          <Button onClick={props.handleDelete} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
}
