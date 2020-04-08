import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import LinkIcon from '@material-ui/icons/Link';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
    line: {
        display: 'block',
    },
    lineHidden: {
        display: 'none',
    }
});


export default function AttachForm(props) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [loadershow, setLoaderShow] = React.useState(false);
    const [loaded, setLoaded] = React.useState(0);

    const [url, setUrl] = React.useState('');
    const [urlType, setUrlType] = React.useState('');


    const confirmMedia = (e) => {
        e.preventDefault();
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            urlType,
            'IMMUTABLE', {
                src: url
            }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editorState, {
                currentContent: contentStateWithEntity
            }
        );
        onChange(
            AtomicBlockUtils.insertAtomicBlock(
                newEditorState,
                entityKey,
                ' '
            )
        );
        setShowURLInput(false);
        setUrl('');
        //focus();
    }

    const onURLChange = (e) => setUrl(e.target.value);

    const onURLInputKeyDown = (e) => {
        if (e.which === 13) {
            confirmMedia(e);
        }
    }

    const AttachmentHandler = (e) => {
        e.preventDefault();
        setOpen(true);
    };

    const handleClose = (e) => {
        e.preventDefault();
        setOpen(false);
    };

    return (
        <div>
            <Button
                size="small"
                onMouseDown={AttachmentHandler}
            >
                <LinkIcon />
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add/Update Link</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="url"
                        label=""
                        type="text"
                        fullWidth
                        onChange={onURLChange}
                        onKeyDown={onURLInputKeyDown}
                    />
                    <DialogContentText>
                        You can add a link to a website or media.
                        Also, the youtube links will be automatically converted.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmMedia} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <LinearProgress
                variant="determinate"
                value={loaded}
                className={(!loadershow) ? classes.lineHidden : classes.line}
            />
        </div>
    );
}
