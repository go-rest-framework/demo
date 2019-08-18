import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MyEditor from '../components/editor/Editor.js';
import ColorEditor from '../components/editor/demo/Color.js';
import ConvertEditor from '../components/editor/demo/Convert.js';
import EntityEditor from '../components/editor/demo/Entity.js';
import LinkEditor from '../components/editor/demo/Link.js';
import PlainTextEditor from '../components/editor/demo/PlainText.js';
import RichEditor from '../components/editor/demo/Rich.js';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    buttonsWrap: {
        textAlign: 'right',
        margin: '1em 0',
    },
    form: {
        padding: '2em',
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Form(props) {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        status: '',
        name: 'hai',
    });


    function handleChange(event) {
        setValues(oldValues => ({
            oldValues,
            [event.target.name]: event.target.value,
        }));
    }

    return (
        <div>
            <div className={classes.buttonsWrap}>
                <Button variant="outlined" color="primary" onClick={props.handleClickOpen}>
                    <AddIcon />
                    Add New Element
                </Button>
            </div>
            <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Add New Element
                        </Typography>
                        <Button color="inherit" onClick={props.handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <form className={classes.form} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                name="title"
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="urld"
                                label="Urld"
                                id="urld"
                            />
                            <FormControl fullWidth>
                                <InputLabel htmlFor="status-helper">Status</InputLabel>
                                <Select
                                    value={values.status}
                                    onChange={handleChange}
                                    input={<Input name="status" id="status-helper" />}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Draft</MenuItem>
                                    <MenuItem value={20}>Public</MenuItem>
                                </Select>
                                <FormHelperText>Some important helper text</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <MyEditor />
                        </Grid>
                    </Grid>
                </form>
            </Dialog>
        </div>
    );
}
